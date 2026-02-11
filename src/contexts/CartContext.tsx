import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products } from '@/data/products';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Sync with Auth State
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCart(session.user.id);
      } else {
        setCartItems([]); // Clear cart on logout or no user
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCart(session.user.id);
      } else {
        setCartItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCart = async (userId: string) => {
    setIsLoading(true);
    try {
      // 1. Get active quote
      let { data: quote, error } = await supabase
        .from('quotes')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'draft') // Assuming 'draft' is the active status
        .maybeSingle();

      if (error) throw error;

      if (quote) {
        // 2. Get quote items
        const { data: items, error: itemsError } = await supabase
          .from('quote_items')
          .select('*')
          .eq('quote_id', quote.id);

        if (itemsError) throw itemsError;

        // 3. Map back to full Product objects
        const loadedItems: CartItem[] = (items || []).map(item => {
          const productDetails = products.find(p => p.id === item.product_id);
          if (!productDetails) return null; // Skip if product not found in static data
          return {
            ...productDetails,
            quantity: item.quantity || 1
          };
        }).filter((item): item is CartItem => item !== null);

        setCartItems(loadedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Fallback or silent fail?
    } finally {
      setIsLoading(false);
    }
  };

  const getOrCreateQuoteId = async (): Promise<string | null> => {
    if (!user) return null;

    // Check for existing draft
    const { data: existingQuote } = await supabase
      .from('quotes')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'draft')
      .maybeSingle();

    if (existingQuote) return existingQuote.id;

    // SELF-HEAL: Ensure profile exists before creating quote (Fixes FK error 23503)
    if (user) {
        const { error: profileError } = await (supabase as any)
            .from('profiles')
            .upsert({ id: user.id, email: user.email }, { onConflict: 'id' });
        
        if (profileError) {
             console.error("Failed to sync profile during quote creation:", profileError);
             // We continue anyway, hoping it might work or the error is unrelated
        }
    }

    // Create new draft
    const { data: newQuote, error } = await supabase
      .from('quotes')
      .insert({ user_id: user.id, status: 'draft', total_items: 0 })
      .select('id')
      .single();

    if (error) {
      console.error("Error creating quote:", error);
      toast.error("Failed to initialize quote cart.");
      return null;
    }
    return newQuote.id;
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      toast.error("Please login to add items to quote.");
      return;
    }

    try {
      const quoteId = await getOrCreateQuoteId();
      if (!quoteId) return;

      // Check if item exists in quote
      const existingItem = cartItems.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity
        const newQty = existingItem.quantity + quantity;
        const { error } = await supabase
          .from('quote_items')
          .update({ quantity: newQty })
          .eq('quote_id', quoteId)
          .eq('product_id', product.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('quote_items')
          .insert({
            quote_id: quoteId,
            product_id: product.id,
            product_name: product.name,
            quantity: quantity
          });

        if (error) throw error;
      }

      // Refresh Local State
      await fetchCart(user.id);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to update quote.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      const quoteId = await getOrCreateQuoteId();
      if (!quoteId) return;

      const { error } = await supabase
        .from('quote_items')
        .delete()
        .eq('quote_id', quoteId)
        .eq('product_id', productId);

      if (error) throw error;
      
      // Optimistic update
      setCartItems(prev => prev.filter(i => i.id !== productId));
      
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item.");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      const quoteId = await getOrCreateQuoteId();
      if (!quoteId) return;

      const { error } = await supabase
        .from('quote_items')
        .update({ quantity: quantity })
        .eq('quote_id', quoteId)
        .eq('product_id', productId);

      if (error) throw error;

      // Optimistic update
      setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
     if (!user) return;
     // Maybe verify if we want to delete the quote or just the items? 
     // For now, let's just delete items or set status to cancelled? 
     // Usually 'Clear Cart' means remove items.
     
     // Actually, let's just create a NEW quote or delete all items?
     // Deleting items is safer.
     try {
       const quoteId = await getOrCreateQuoteId();
       if (!quoteId) return;

       const { error } = await supabase
         .from('quote_items')
         .delete()
         .eq('quote_id', quoteId);

       if (error) throw error;
       setCartItems([]);
     } catch (error) {
       console.error("Error clearing cart:", error);
     }
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
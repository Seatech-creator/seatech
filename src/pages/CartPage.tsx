import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingBag, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, itemCount } = useCart();
  const navigate = useNavigate();

  const handleRequestQuote = async () => {
    // 1. Format the cart items into a readable string array for local storage fallback
    const quoteItems = cartItems.map(item => 
      `${item.name} (${item.model}) - Quantity: ${item.quantity}`
    );
    localStorage.setItem('quoteBin', JSON.stringify(quoteItems));

    // 2. CHECK IF LOGGED IN (Production Gate)
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // SCENARIO A: Not logged in -> Go to Auth
      toast.info("Please login to request a quote", {
        description: "You need an account to manage your bulk orders."
      });
      // We pass the return path so we can send them back here or to the application form after login
      navigate('/auth'); 
    } else {
      // SCENARIO B: Logged in -> Go to Quote Form
      navigate('/dealer-application');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 pt-32">
        <div className="flex items-center gap-3 mb-8">
           <div className="p-2 bg-blue-100 rounded-lg"><FileText className="h-6 w-6 text-blue-600" /></div>
           <h1 className="text-3xl font-bold text-slate-900">Quote Request Cart</h1>
        </div>
        
        {itemCount === 0 ? (
          <Card className="border border-slate-200 shadow-sm text-center py-24 bg-white">
            <CardContent>
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <ShoppingBag className="h-10 w-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your quote cart is empty</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Browse our catalogue and add items to request a bulk pricing quote for your organization.</p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/products">Browse Catalogue</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* --- Cart Items (Left) --- */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-slate-200 shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-4 flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-lg border border-slate-100 p-2 flex-shrink-0 flex items-center justify-center">
                       <Link to={`/products/${item.id}`}>
                        <img
                          src={item.images[0].thumbnail}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.brand}</div>
                      <Link to={`/products/${item.id}`} className="font-bold text-slate-900 hover:text-blue-600 text-lg leading-tight block mb-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-slate-500 font-mono">{item.model}</p>
                      
                      <div className="text-sm font-medium text-blue-600 mt-2 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" /> Price on Request
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-lg border border-slate-200 p-1">
                        <span className="text-xs font-bold text-slate-400 pl-2">QTY</span>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-16 h-8 border-none bg-white text-center font-bold focus-visible:ring-0"
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-2">
                        <span className="text-xs font-medium">Remove</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* --- Summary (Right) --- */}
            <div className="md:col-span-1">
              <Card className="border border-slate-200 shadow-lg sticky top-24 bg-white">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Quote Summary</h2>
                    <p className="text-sm text-slate-500">{itemCount} Items Selected</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      <strong>Note:</strong> Submitting this request will send your list to our sales team, who will prepare a formal GST-compliant quote including shipping.
                    </p>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold h-14 text-lg shadow-lg shadow-slate-200"
                    onClick={handleRequestQuote}
                  >
                    Request Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Building2, User, FileText, Receipt, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const formSchema = z.object({
  // Company Details
  companyName: z.string().trim().min(2, "Company name is required").max(100),
  address: z.string().trim().min(5, "Address is required").max(500),
  gstNumber: z.string().trim().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number format").optional().or(z.literal('')),
  
  // Contact Person
  contactName: z.string().trim().min(2, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  mobile: z.string().trim().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  
  // Requirements
  additionalRemarks: z.string().trim().max(1000).optional(),
});

const DealerApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, clearCart } = useCart();
  
  // Display text for the UI summary
  const [quoteListDisplay, setQuoteListDisplay] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      address: "",
      gstNumber: "",
      contactName: "",
      email: "",
      mobile: "",
      additionalRemarks: "",
    },
  });

  // 1. Fetch User Profile to Auto-Fill
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // FIX: Cast supabase to any to bypass strict type checking on the table
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(); 

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        const profile = data as any;

        if (profile) {
          form.reset({
            ...form.getValues(),
            companyName: profile.company_name || "",
            address: profile.address || "",
            contactName: profile.contact_person || "",
            email: user.email || "", 
            mobile: profile.phone || "",
            gstNumber: profile.gst_number || "",
          });
        } else {
             form.setValue('email', user.email || "");
        }
      }
    };
    fetchUserProfile();
  }, [form]);

  // 2. Load Quote Items for Display
  useEffect(() => {
    // Only use cartItems (fetched from DB by CartContext)
    // We ignore localStorage bin now as we want single source of truth
    let displayText = "";
    
    if (cartItems.length > 0) {
      const cartText = cartItems.map(item => `• ${item.quantity} x ${item.name}`).join('\n');
      displayText += cartText;
    } else {
      // Fallback only if cart is empty but bin exists (unlikely in new flow)
      const rawBin = localStorage.getItem('quoteBin');
      if (rawBin) {
         const quoteBin: string[] = JSON.parse(rawBin);
         displayText += quoteBin.join('\n');
      }
    }

    if (displayText) {
      setQuoteListDisplay(displayText);
    }
  }, [cartItems]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let userId = user?.id;

      if (!userId) {
        throw new Error("Please login to submit a quote.");
      }

      // A. Save/Update Profile
      const profileData = {
        id: userId,
        company_name: values.companyName,
        contact_person: values.contactName,
        email: values.email,
        phone: values.mobile,
        address: values.address,
        gst_number: values.gstNumber
      };
      
      const { error: profileError } = await (supabase as any)
        .from('profiles')
        .upsert(profileData);

      if (profileError) throw profileError;

      // B. Update ACTIVE Draft Quote to Pending
      // 1. Find the draft quote
      let { data: quote } = await (supabase as any)
        .from('quotes')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'draft')
        .maybeSingle();

      let quoteId = quote?.id;

      if (quoteId) {
        // Update existing draft
        const { error: updateError } = await (supabase as any)
          .from('quotes')
          .update({
             status: 'pending',
             total_items: cartItems.length,
             additional_remarks: values.additionalRemarks
          })
          .eq('id', quoteId);

        if (updateError) throw updateError;

      } else {
        // Fallback: If no draft exists (maybe items were from localStorage/Bin?), create new Pending quote
        // This handles the legacy localStorage case if CartContext failed
        const quotePayload = {
            user_id: userId,
            status: 'pending',
            total_items: cartItems.length || 1, // approximate
            additional_remarks: values.additionalRemarks
        };
        
        const { data: newQuote, error: insertError } = await (supabase as any)
            .from('quotes')
            .insert(quotePayload)
            .select()
            .single();
            
        if (insertError) throw insertError;
        quoteId = newQuote.id;

        // If we created a new quote, we might need to insert items if they aren't there?
        // If cartItems has items, we should insert them now.
        if (cartItems.length > 0) {
             const dbItems = cartItems.map(item => ({
                quote_id: quoteId,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity
             }));
             const { error: itemsError } = await (supabase as any)
               .from('quote_items')
               .insert(dbItems);
             if (itemsError) throw itemsError;
        }
      }

      toast.success("Quote Request Sent Successfully!", {
        description: `Reference ID: ${quoteId.slice(0, 8)}. We will contact you shortly.`, 
        duration: 5000,
      });

      // D. Cleanup
      localStorage.removeItem('quoteBin');
      clearCart(); // This will refresh context, and since draft is gone, it returns empty
      setQuoteListDisplay("");
      form.reset();

    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Submission Failed", {
        description: error.message || "There was an error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const clearQuoteList = () => {
    localStorage.removeItem('quoteBin');
    clearCart();
    setQuoteListDisplay("");
    toast.info("Quote list cleared.");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-20 mb-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Finalize Your Quote</h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Review your details below. We will generate a formal proforma invoice and contact you for shipping.
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: The Form (8 cols) */}
          <div className="md:col-span-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Organization Details */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                     <div className="bg-blue-50 p-2 rounded-lg"><Building2 className="h-6 w-6 text-blue-600" /></div>
                     <h2 className="text-xl font-bold text-slate-900">Billing Details</h2>
                  </div>
                  
                  <div className="grid gap-6">
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem><FormLabel className="text-slate-700 font-semibold">Company / Organization Name *</FormLabel><FormControl><Input className="h-12" placeholder="e.g. Ministry of Textiles / Seatech Pvt Ltd" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel className="text-slate-700 font-semibold">Billing Address *</FormLabel><FormControl><Textarea className="min-h-[80px]" placeholder="Enter complete billing address" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField control={form.control} name="gstNumber" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-700 font-semibold">GST Number (Optional)</FormLabel><FormControl><Input className="h-12 font-mono" placeholder="22AAAAA0000A1Z5" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                     <div className="bg-blue-50 p-2 rounded-lg"><User className="h-6 w-6 text-blue-600" /></div>
                     <h2 className="text-xl font-bold text-slate-900">Contact Person</h2>
                  </div>
                  
                  <div className="grid gap-6">
                      <FormField control={form.control} name="contactName" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-700 font-semibold">Full Name *</FormLabel><FormControl><Input className="h-12" placeholder="Enter your name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="mobile" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-700 font-semibold">Mobile Number *</FormLabel><FormControl><Input className="h-12" placeholder="10-digit mobile" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-700 font-semibold">Official Email *</FormLabel><FormControl><Input className="h-12" type="email" placeholder="name@organization.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                  </div>
                </div>
                
                {/* Additional Remarks */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
                   <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                     <div className="bg-blue-50 p-2 rounded-lg"><FileText className="h-6 w-6 text-blue-600" /></div>
                     <h2 className="text-xl font-bold text-slate-900">Additional Instructions</h2>
                  </div>
                  <FormField control={form.control} name="additionalRemarks" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Remarks</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" placeholder="Specific delivery instructions, customization requests, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="pt-4">
                  <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-slate-900 hover:bg-blue-700 text-white shadow-xl shadow-slate-200 rounded-xl font-bold transition-all hover:-translate-y-1" 
                      disabled={isSubmitting}
                  >
                      {isSubmitting ? (
                          <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processing Request...</span>
                      ) : (
                          <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Submit Quote Request</span>
                      )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* RIGHT COLUMN: The Summary (4 cols) */}
          <div className="md:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-32">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" /> Quote Summary
              </h3>
              
              <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100 max-h-[400px] overflow-y-auto">
                {quoteListDisplay ? (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-600 leading-relaxed">
                    {quoteListDisplay}
                  </pre>
                ) : (
                  <p className="text-sm text-slate-400 italic">No items added to quote yet.</p>
                )}
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Items</span>
                  <span className="font-bold text-slate-900">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Est. Response</span>
                  <span className="font-bold text-emerald-600">24 Hours</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
                onClick={clearQuoteList}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Clear List
              </Button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealerApplication;
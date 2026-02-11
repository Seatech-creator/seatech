import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Plus, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import AuthDialog from "@/components/AuthDialog";

// Get unique categories
const categories = Array.from(new Set(products.map((p) => p.category)));

interface RequestedItem {
  category: string;
  quantity: string;
}

interface TurnoverData {
  year: string;
  amount: string;
}

const RequestOEMAuthorization = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState<"L1" | "Bidding">("L1");
  
  // Common Fields
  const [dealerName, setDealerName] = useState(""); // Firm Name
  const [directorName, setDirectorName] = useState(""); // New Field
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gst, setGst] = useState("");
  
  // Item Addition Fields
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requestedItems, setRequestedItems] = useState<RequestedItem[]>([]);

  // Specific Fields
  const [turnover, setTurnover] = useState(""); // For L1
  const [biddingNumber, setBiddingNumber] = useState(""); // For Bidding
  
  // 3 Years Turnover State for Bidding
  const [turnoverYears, setTurnoverYears] = useState<TurnoverData[]>([
    { year: "", amount: "" },
    { year: "", amount: "" },
    { year: "", amount: "" },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAuthDialogOpen(true);
      }
    };
    checkAuth();
  }, []);

  const handleTurnoverChange = (index: number, field: keyof TurnoverData, value: string) => {
    const newTurnoverData = [...turnoverYears];
    newTurnoverData[index][field] = value;
    setTurnoverYears(newTurnoverData);
  };

  const addItem = () => {
    if (!selectedCategory || !quantity) {
      toast.error("Please select a category and enter quantity");
      return;
    }
    setRequestedItems([...requestedItems, { category: selectedCategory, quantity }]);
    setSelectedCategory("");
    setQuantity("");
  };

  const removeItem = (index: number) => {
    const newItems = [...requestedItems];
    newItems.splice(index, 1);
    setRequestedItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (requestedItems.length === 0) {
      toast.error("Please add at least one product category.");
      return;
    }

    if (requestType === "Bidding") {
       const isIncomplete = turnoverYears.some(t => !t.year || !t.amount);
       if (isIncomplete) {
         toast.error("Please fill in turnover details for all 3 years.");
         return;
       }
    }

    setIsSubmitting(true);

    try {
      // Map to 'dealer_applications' table schema
      const itemsString = requestedItems.map(i => `${i.category}: ${i.quantity}`).join('; ');
      
      const payload: any = {
        dealer_name: dealerName,
        director_name: directorName, // Required by DB
        address: address,
        email: email,
        mobile: mobile,
        director_email: email, // Reusing email for now
        director_mobile: mobile, // Reusing mobile for now
        gst_number: gst,
        product_requirements: itemsString,
        status: 'pending',
        remarks: requestType === "Bidding" ? `Bidding #: ${biddingNumber}` : `Turnover: ${turnover}`
      };

      if (requestType === "Bidding") {
        // Try to parse turnover if possible, but schema expects numbers for years.
        // If the input is text (e.g. "1.5 Cr"), we can't strict parse easily. 
        // We'll leave them null or try to extract numbers.
        // For now, let's put the turnover details in 'remarks' or try to parse.
        // Schema: turnover_year1: number
        // Let's try to parse:
        payload.turnover_year1 = parseFloat(turnoverYears[0].amount.replace(/[^0-9.]/g, '')) || null;
        payload.turnover_year2 = parseFloat(turnoverYears[1].amount.replace(/[^0-9.]/g, '')) || null;
        payload.turnover_year3 = parseFloat(turnoverYears[2].amount.replace(/[^0-9.]/g, '')) || null;
      } else {
         payload.turnover_year1 = parseFloat(turnover.replace(/[^0-9.]/g, '')) || null;
      }

      // Insert into Supabase
      const { error } = await (supabase as any)
        .from('dealer_applications')
        .insert(payload);

      if (error) throw error;

      toast.success("OEM Authorization Request Submitted!", {
        description: "Our team will review your details and contact you shortly."
      });
      
      // Reset Form
      setDealerName("");
      setDirectorName("");
      setAddress("");
      setEmail("");
      setMobile("");
      setGst("");
      setRequestedItems([]);
      setTurnover("");
      setBiddingNumber("");
      setTurnoverYears([
        { year: "", amount: "" },
        { year: "", amount: "" },
        { year: "", amount: "" },
      ]);

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Failed to submit request", {
        description: error.message || "Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
        message="Please login to request OEM Authorization."
      />
      <div className="flex-grow container mx-auto px-4 py-32 max-w-5xl">
        <Card className="border-0 shadow-2xl bg-white/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-8 border-b border-slate-100">
            <CardTitle className="text-3xl font-bold text-slate-800">Request OEM Authorization</CardTitle>
            <CardDescription className="text-lg text-slate-500 mt-2">
              Submit your details for L1 Purchase or Bidding Authorization
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Request Type Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
                  <button
                    type="button"
                    onClick={() => setRequestType("L1")}
                    className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                      requestType === "L1" 
                        ? "bg-white text-blue-600 shadow-md" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                  >
                    For L1 Purchase
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType("Bidding")}
                    className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                      requestType === "Bidding" 
                        ? "bg-white text-blue-600 shadow-md" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    }`}
                  >
                    For Bidding
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealerName">Firm / Dealer Name</Label>
                  <Input 
                    id="dealerName" 
                    value={dealerName} 
                    onChange={(e) => setDealerName(e.target.value)} 
                    required 
                    placeholder="Enter firm name"
                    className="h-12 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="directorName">Director / Proprietor Name</Label>
                  <Input 
                    id="directorName" 
                    value={directorName} 
                    onChange={(e) => setDirectorName(e.target.value)} 
                    required 
                    placeholder="Enter director name"
                    className="h-12 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="dealer@example.com"
                    className="h-12 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input 
                    id="mobile" 
                    type="tel" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    required 
                    placeholder="+91 98765 43210"
                    className="h-12 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input 
                    id="gst" 
                    value={gst} 
                    onChange={(e) => setGst(e.target.value)} 
                    required 
                    placeholder="22AAAAA0000A1Z5"
                    className="h-12 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                    placeholder="Enter full registered address"
                    className="min-h-[100px] bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-100 resize-none"
                  />
                </div>
              </div>

              {/* Specific Fields */}
              <div className="space-y-6 pt-6 border-t border-slate-100">
                {requestType === "L1" ? (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="turnover">Dealer Turnover (Current Financial Year)</Label>
                      <Input 
                        id="turnover" 
                        value={turnover} 
                        onChange={(e) => setTurnover(e.target.value)} 
                        required 
                        placeholder="e.g. 50 Lakhs"
                        className="h-12 bg-white/50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="biddingNumber">Bidding Number / Tender ID</Label>
                      <Input 
                        id="biddingNumber" 
                        value={biddingNumber} 
                        onChange={(e) => setBiddingNumber(e.target.value)} 
                        required 
                        placeholder="Enter bidding number"
                        className="h-12 bg-white/50"
                      />
                    </div>
                    
                    <div className="space-y-4">
                       <Label className="text-base font-semibold text-slate-700 block mb-2">Dealer Turnover (Last 3 Years)</Label>
                       <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 space-y-4">
                          {turnoverYears.map((data, index) => (
                             <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div className="space-y-2">
                                   <Label htmlFor={`year-${index}`} className="text-xs text-slate-500 uppercase tracking-wider font-bold">Financial Year {index + 1}</Label>
                                   <Input 
                                      id={`year-${index}`}
                                      value={data.year}
                                      onChange={(e) => handleTurnoverChange(index, "year", e.target.value)}
                                      placeholder="e.g. 2023-2024"
                                      className="bg-white"
                                   />
                                </div>
                                <div className="space-y-2">
                                   <Label htmlFor={`amount-${index}`} className="text-xs text-slate-500 uppercase tracking-wider font-bold">Turnover Amount</Label>
                                   <Input 
                                      id={`amount-${index}`}
                                      value={data.amount}
                                      onChange={(e) => handleTurnoverChange(index, "amount", e.target.value)}
                                      placeholder="e.g. 15000000 (Numeric preferred)"
                                      className="bg-white"
                                   />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Selection Section */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <Label className="text-lg font-semibold text-slate-700">Required Products</Label>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="category">Select Category</Label>
                      <div className="relative">
                        <select
                          id="category"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input 
                        id="quantity" 
                        type="number" 
                        min="1"
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        placeholder="Qty"
                        className="h-12 bg-white"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button 
                        type="button" 
                        onClick={addItem} 
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                      </Button>
                    </div>
                  </div>

                  {/* List of Added Items */}
                  {requestedItems.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label className="text-sm text-slate-500">Added Items List:</Label>
                      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                        {requestedItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 px-4 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-800">{item.category}</span>
                              <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeItem(index)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-200 mt-6"
              >
                {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Processing Request...</span>
                ) : (
                    "Submit Authorization Request"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RequestOEMAuthorization;
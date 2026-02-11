import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Loader2, Building2, User, Phone, MapPin, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Auth State
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // User Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  // Company Fields
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Check URL for mode
    if (searchParams.get("mode") === "signup") {
      setIsSignUp(true);
    }

    // Redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard"); 
      }
    });
  }, [navigate, searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let authData;
      let authError;

      if (isSignUp) {
        // --- VALIDATION ---
        if (!fullName || !companyName || !mobile || !address) {
          throw new Error("Please fill in all required registration fields.");
        }

        // --- SIGN UP LOGIC ---
        const result = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
              phone: mobile
            }
          }
        });
        authData = result.data;
        authError = result.error;
        
        if (authError) throw authError;
        toast.success("Account created successfully!");

      } else {
        // --- LOGIN LOGIC ---
        const result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        authData = result.data;
        authError = result.error;

        if (authError) throw authError;
        toast.success("Welcome back!");
      }

      // --- SYNC TO PROFILES TABLE ---
      if (authData?.user) {
        const profileUpdate: any = {
          id: authData.user.id,
          email: authData.user.email,
          updated_at: new Date().toISOString(),
        };

        // Only update these on sign up (or if they were provided)
        if (isSignUp) {
          profileUpdate.contact_person = fullName;
          profileUpdate.phone = mobile;
          profileUpdate.company_name = companyName;
          profileUpdate.address = address;
          profileUpdate.gst_number = gstNumber;
        }

        const { error: profileError } = await (supabase as any)
          .from('profiles')
          .upsert(profileUpdate, { onConflict: 'id' });

        if (profileError) {
          console.error("Profile sync error:", profileError);
        }
      }

      // Determine redirect
      navigate("/dashboard");

    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 pt-32 pb-24">
        <Card className="w-full max-w-xl border-slate-200 shadow-2xl bg-white rounded-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
          <CardHeader className="text-center space-y-2 pt-8">
            <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">
              {isSignUp ? "Register Organization" : "Member Login"}
            </CardTitle>
            <CardDescription className="text-slate-500 text-base">
              {isSignUp 
                ? "Create a complete profile to manage procurements." 
                : "Access your dashboard and order history."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleAuth} className="space-y-6">
              
              {isSignUp && (
                <>
                  {/* --- USER DETAILS SECTION --- */}
                  <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-px bg-slate-200 flex-grow"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">User Details</span>
                        <span className="h-px bg-slate-200 flex-grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name *</label>
                            <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Your Name" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required={isSignUp}
                                className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white"
                            />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Mobile *</label>
                            <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="10-digit Mobile" 
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required={isSignUp}
                                type="tel"
                                className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white"
                            />
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* --- ORGANIZATION DETAILS SECTION --- */}
                  <div className="space-y-4 animate-in slide-in-from-top-8 fade-in duration-500 delay-100">
                    <div className="flex items-center gap-2 mb-2 mt-2">
                        <span className="h-px bg-slate-200 flex-grow"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Organization Details</span>
                        <span className="h-px bg-slate-200 flex-grow"></span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Company Name *</label>
                        <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Registered Organization Name" 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required={isSignUp}
                            className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">GST Number (Optional)</label>
                        <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="GSTIN" 
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value)}
                            className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white font-mono"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Address *</label>
                        <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Textarea 
                            placeholder="Registered Office Address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required={isSignUp}
                            className="pl-9 min-h-[80px] bg-slate-50 border-slate-200 focus:bg-white resize-none py-2"
                        />
                        </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2 mt-4">
                        <span className="h-px bg-slate-200 flex-grow"></span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Credentials</span>
                        <span className="h-px bg-slate-200 flex-grow"></span>
                  </div>
                </>
              )}

              {/* --- LOGIN / CREDENTIALS --- */}
              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address *</label>
                    <Input 
                    type="email" 
                    placeholder="name@organization.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Password *</label>
                    <Input 
                    type="password" 
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all mt-6" 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                {isSignUp ? "Complete Registration" : "Sign In"}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-100 pt-6">
              {isSignUp ? "Already have an account? " : "New to Seatech? "}
              <button 
                onClick={() => {
                    setIsSignUp(!isSignUp);
                    // Reset fields when switching
                    setFullName("");
                    setCompanyName("");
                    setAddress("");
                    setGstNumber("");
                    setMobile("");
                }}
                className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
              >
                {isSignUp ? "Sign In Here" : "Create Profile"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, ShoppingBag, Clock, LogOut, Save, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  contact_person: string;
  email: string;
  phone: string;
}

interface Quote {
  id: string;
  status: string;
  total_items: number;
  created_at: string;
  additional_remarks: string;
}

interface Application {
  id: string;
  status: string;
  created_at: string;
  dealer_name: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [editForm, setEditForm] = useState<UserProfile>({
    contact_person: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }
      setUserEmail(user.email || "");

      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
        
      if (profileData) {
        const p = profileData as any;
        setProfile(p);
        setEditForm({
          contact_person: p.contact_person || "",
          email: p.email || user.email || "",
          phone: p.phone || "",
        });
      }

      // 2. Fetch Quotes (Orders)
      const { data: quotesData } = await supabase
        .from('quotes')
        .select('*')
        .eq('user_id', user.id)
        .neq('status', 'draft') // Show only submitted orders
        .order('created_at', { ascending: false });
        
      if (quotesData) {
        setQuotes(quotesData as any);
      }

      // 3. Fetch Dealer Applications
      const { data: appsData } = await supabase
        .from('dealer_applications')
        .select('*')
        .eq('email', user.email) 
        .order('created_at', { ascending: false });

      if (appsData) {
        setApplications(appsData as any);
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await (supabase as any)
        .from('profiles')
        .upsert({
          id: user.id,
          ...editForm,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setProfile(editForm);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'bg-green-500 hover:bg-green-600';
      case 'rejected': return 'bg-red-500 hover:bg-red-600';
      case 'pending': return 'bg-amber-500 hover:bg-amber-600';
      default: return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="bg-slate-900 pt-32 pb-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
                <p className="text-slate-400">Manage your profile and track your requests</p>
              </div>
              <Button onClick={handleSignOut} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Quote History</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Profile Settings</TabsTrigger>
          </TabsList>

          {/* --- OVERVIEW TAB --- */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" /> User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                      <p className="font-medium text-slate-900">{profile?.contact_person || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                      <p className="font-medium text-slate-900">{userEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Mobile</p>
                      <p className="font-medium text-slate-900">{profile?.phone || "Not set"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-100">
                    <ShoppingBag className="h-5 w-5" /> Active Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-1">{quotes.length}</div>
                  <p className="text-blue-200 text-sm">Total Quote Requests</p>
                </CardContent>
              </Card>

              {/* Application Status Card */}
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-500" /> Application Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.slice(0, 2).map(app => (
                        <div key={app.id} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                          <div>
                            <p className="font-medium text-sm text-slate-900">OEM Request</p>
                            <p className="text-xs text-slate-400">{new Date(app.created_at).toLocaleDateString()}</p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-slate-400 text-sm mb-3">No active applications</p>
                      <Button variant="secondary" size="sm" onClick={() => navigate('/request-oem')}>Apply Now</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --- ORDERS TAB --- */}
          <TabsContent value="orders">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Quote Request History</CardTitle>
                <CardDescription>Track the status of your bulk pricing requests.</CardDescription>
              </CardHeader>
              <CardContent>
                {quotes.length > 0 ? (
                  <div className="space-y-4">
                    {quotes.map(quote => (
                      <div key={quote.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            #{quote.total_items}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Quote #{quote.id.slice(0,8)}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                              <Clock className="h-3 w-3" /> {new Date(quote.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={`${getStatusColor(quote.status || 'pending')} px-3 py-1`}>
                            {quote.status || 'Pending'}
                          </Badge>
                          <Button variant="ghost" size="sm" disabled>View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-slate-900">No quotes found</h3>
                    <p className="text-slate-500 mb-6">Start adding items to your cart to request a quote.</p>
                    <Button onClick={() => navigate('/products')}>Browse Products</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- PROFILE TAB (USER ONLY) --- */}
          <TabsContent value="profile">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your personal contact details.</CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact_person">Full Name</Label>
                      <Input 
                        id="contact_person" 
                        disabled={!isEditing}
                        value={editForm.contact_person}
                        onChange={(e) => setEditForm({...editForm, contact_person: e.target.value})}
                        className={!isEditing ? "bg-slate-50 border-slate-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input 
                        id="phone" 
                        disabled={!isEditing}
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className={!isEditing ? "bg-slate-50 border-slate-100" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        disabled={true} 
                        value={editForm.email}
                        className="bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end gap-3 p-6">
                  <Button variant="ghost" onClick={() => {
                    setIsEditing(false);
                    if (profile) setEditForm(profile); // Reset form
                  }}>Cancel</Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isSaving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
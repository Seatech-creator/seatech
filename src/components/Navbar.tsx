import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, ShoppingCart, User, LogOut, FileText, X, ChevronRight, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import logoSrc from "../assets/logo.png";
import { useCart } from "../contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  
  // --- Auth State ---
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    toast.success("Signed out successfully");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalogue", path: "/products" },
    { name: "Certifications", path: "/certifications" },
    { name: "About Us", path: "/about" },
    { name: "Clients", path: "/clients" },
    { name: "Dealers", path: "/dealer-application" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  // --- SMART VISIBILITY LOGIC ---
  const isHomePage = location.pathname === "/";
  // Light Skin (White Text) ONLY on Home Page top.
  const useLightSkin = isHomePage && !scrolled;

  // Colors
  const textColorClass = useLightSkin 
    ? "text-slate-200 group-hover:text-white" 
    : "text-slate-600 group-hover:text-blue-600";

  const buttonBgClass = useLightSkin
    ? "bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-sm backdrop-blur-sm"
    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm";

  // Mobile Menu Button Color
  const mobileMenuColor = useLightSkin ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100";

  return (
    <>
      <motion.nav    
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled 
            ? "h-20 bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/60" 
            : "h-28 bg-transparent"
        }`}
      >
        {/* Subtle Gradient Border on Scroll */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/50 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* --- LOGO --- */}
            <Link to="/" className="flex items-center gap-3 relative z-50 group">
              <motion.div 
                layout 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-white/40 blur-3xl rounded-full transition-opacity duration-700 ${useLightSkin ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}></div>
                <img 
                  src={logoSrc} 
                  alt="Seatech" 
                  className={`w-auto object-contain transition-all duration-500 drop-shadow-sm ${scrolled ? "h-9 md:h-11" : "h-12 md:h-14"}`} 
                />
              </motion.div>
            </Link>

            {/* --- DESKTOP NAV --- */}
            <div className={`hidden lg:flex items-center p-1.5 rounded-full border transition-all duration-500 ${
              useLightSkin 
                ? "bg-black/20 border-white/10 backdrop-blur-xl shadow-lg" 
                : "bg-white/60 border-white/60 shadow-lg shadow-slate-200/20 backdrop-blur-xl"
            }`}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className="relative group px-4 py-2">
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                      isActive 
                        ? "text-slate-900" 
                        : textColorClass
                    }`}>
                      {link.name}
                    </span>
                    {!isActive && (
                       <span className={`absolute bottom-2 left-4 right-4 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${useLightSkin ? "bg-white/50" : "bg-blue-600/50"}`}></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* --- ACTIONS WRAPPER --- */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* --- DESKTOP ICONS --- */}
              <div className="hidden md:flex items-center gap-3">
                {/* Search */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(true)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${buttonBgClass}`}
                >
                  <Search className="h-4 w-4" />
                </motion.button>

                {/* Cart */}
                <Link to="/cart">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 relative ${buttonBgClass}`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <AnimatePresence>
                      {itemCount > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm"
                        >
                          {itemCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Link>

                {/* User Profile */}
                <div className="relative">
                  {user ? (
                    <>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
                          isProfileOpen 
                            ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-100" 
                            : buttonBgClass
                        }`}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                      >
                        <User className="h-4 w-4" />
                      </motion.button>
                      
                      <AnimatePresence>
                        {isProfileOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(8px)" }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="absolute right-0 top-full mt-3 w-72 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-slate-100 overflow-hidden z-50 origin-top-right"
                          >
                            <div className="px-6 py-5 bg-gradient-to-br from-slate-50/50 to-transparent">
                              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Signed in as</p>
                              <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                            </div>
                            <div className="p-2 space-y-0.5">
                              <Link to="/dashboard" onClick={() => setIsProfileOpen(false)}>
                                <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 rounded-2xl h-11 px-4 font-medium transition-all group">
                                  <span className="flex items-center gap-3"><LayoutDashboard className="h-4 w-4 text-slate-400 group-hover:text-blue-500" /> Dashboard</span>
                                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-blue-400" />
                                </Button>
                              </Link>
                              <div className="px-2 py-1"><div className="h-px bg-slate-100 w-full" /></div>
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-2xl h-11 px-4 font-medium transition-all group"
                                onClick={handleLogout}
                              >
                                <LogOut className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600" /> Sign Out
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {isProfileOpen && (
                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      )}
                    </>
                  ) : (
                    <Link to="/auth">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className={`rounded-full font-bold px-6 h-10 shadow-lg hover:shadow-xl transition-all ${
                          useLightSkin 
                            ? "bg-white text-slate-900 hover:bg-slate-50" 
                            : "bg-slate-900 hover:bg-blue-600 text-white"
                        }`}>
                          Login
                        </Button>
                      </motion.div>
                    </Link>
                  )}
                </div>
              </div>

              {/* --- OEM REQUEST BUTTON (Desktop) --- */}
              <div className="hidden lg:block ml-2">
                 <Link to="/request-oem">
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                   >
                     <FileText className="h-4 w-4" />
                     OEM Request
                   </motion.button>
                 </Link>
              </div>

              {/* --- MOBILE MENU BUTTON --- */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={`lg:hidden rounded-full w-10 h-10 ml-auto transition-colors ${mobileMenuColor}`}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] bg-white/80 backdrop-blur-3xl border-l border-white/50 p-0 shadow-2xl flex flex-col h-full z-[100]">
                  
                  {/* Mobile Menu Header */}
                  <div className="p-6 flex items-center justify-between">
                    <img src={logoSrc} alt="Seatech" className="h-8 w-auto" />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100/50">
                        <X className="h-6 w-6 text-slate-800" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-6">
                    
                    {/* 0. Mobile OEM Request (Prominent) */}
                    <SheetClose asChild>
                      <Link to="/request-oem">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 h-14 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200/50 mb-2">
                          <FileText className="mr-2 h-5 w-5" /> Request OEM Auth
                        </Button>
                      </Link>
                    </SheetClose>

                    {/* 1. Mobile Search */}
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                       <input 
                         type="search" 
                         placeholder="Search products..." 
                         className="w-full h-14 pl-11 pr-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 focus:bg-white focus:border-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
                         onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              navigate(`/products?search=${encodeURIComponent(e.currentTarget.value)}`);
                           }
                         }}
                       />
                    </div>

                    {/* 2. Mobile Cart Button */}
                    <SheetClose asChild>
                      <Link to="/cart">
                        <Button variant="outline" className="w-full justify-between h-16 rounded-3xl border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-200 group transition-all">
                          <span className="flex items-center text-lg font-bold text-slate-700 group-hover:text-blue-600 pl-2">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                               <ShoppingCart className="h-4 w-4 text-blue-600" />
                            </div>
                            Quote Cart
                          </span>
                          {itemCount > 0 && (
                            <span className="h-7 w-7 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full mr-2 shadow-lg shadow-blue-200">
                              {itemCount}
                            </span>
                          )}
                        </Button>
                      </Link>
                    </SheetClose>

                    {/* 3. Navigation Links */}
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <Link key={link.path} to={link.path}>
                          <SheetClose asChild>
                            <Button variant="ghost" className="w-full justify-between text-lg font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 h-auto py-4 pl-4 rounded-2xl group transition-all">
                              {link.name}
                              <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                            </Button>
                          </SheetClose>
                        </Link>
                      ))}
                    </div>

                    {/* Mobile Profile Link */}
                    {user ? (
                      <Link to="/dashboard">
                        <SheetClose asChild>
                          <div className="bg-slate-50 p-4 rounded-3xl mt-4 border border-slate-100">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                   {user.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account</p>
                                   <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                                </div>
                             </div>
                             <Button className="w-full bg-slate-900 text-white hover:bg-blue-700 rounded-xl h-12 font-bold shadow-lg shadow-slate-200">
                                Dashboard
                             </Button>
                          </div>
                        </SheetClose>
                      </Link>
                    ) : (
                      <Link to="/auth">
                         <SheetClose asChild>
                           <Button className="w-full bg-slate-900 text-white hover:bg-blue-700 rounded-2xl h-14 text-lg font-bold shadow-xl shadow-slate-200 mt-4">
                             Login / Sign Up
                           </Button>
                         </SheetClose>
                      </Link>
                    )}

                  </div>

                  {/* Mobile Footer (Sign Out) */}
                  {user && (
                    <div className="p-6 pt-0 mt-auto">
                         <SheetClose asChild>
                           <Button 
                            variant="ghost" 
                            className="w-full justify-center text-red-500 hover:bg-red-50 hover:text-red-600 h-12 rounded-xl font-semibold"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </Button>
                         </SheetClose>
                    </div>
                  )}

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- CINEMATIC SEARCH OVERLAY (Desktop) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-4"
          >
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-3xl transition-all"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-3xl z-10"
            >
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden flex items-center p-2 ring-1 ring-white/50">
                  <Search className="h-6 w-6 text-slate-400 ml-6" />
                  <input
                    type="search"
                    placeholder="Search for products, categories..."
                    className="flex-1 h-16 px-6 bg-transparent border-0 focus:ring-0 text-xl font-medium placeholder:text-slate-400 text-slate-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-slate-100 w-12 h-12 mr-2"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-6 w-6 text-slate-500" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper for ArrowRight in Mobile Menu
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default Navbar;
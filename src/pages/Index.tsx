import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  FileText,
  Users,
  TrendingUp,
  Award,
  Phone,
  MessageCircle,
  Briefcase,
  ShoppingCart,
  Gavel,
  Globe2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORT LOCAL HERO IMAGES ---
import conferenceImg from "../assets/heropage/Modern Executive Conference Room.jpg";
import classroomImg from "../assets/heropage/University Lecture Hall & Classroom.jpg";
import auditoriumImg from "../assets/heropage/Large Auditorium Hall.jpg";
import lobbyImg from "../assets/heropage/Modern Institutional Lobby Space.jpg";

// --- HERO IMAGES CONFIGURATION ---
const HERO_IMAGES = [
  {
    url: conferenceImg,
    alt: "Modern Executive Conference Room"
  },
  {
    url: classroomImg,
    alt: "University Lecture Hall & Classroom"
  },
  {
    url: auditoriumImg,
    alt: "Large Auditorium Hall"
  },
  {
    url: lobbyImg,
    alt: "Modern Institutional Lobby Space"
  }
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle through background images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* --- FLOATING CONTACT BUTTONS (Fixed Bottom Right) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        <motion.a 
          href="tel:+919876543210" 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors border border-slate-200"
          title="Call Us"
        >
          <Phone className="h-6 w-6 fill-current" />
        </motion.a>
        <motion.a 
          href="https://wa.me/919876543210" 
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-[#20bd5a] transition-colors border-4 border-white relative group"
          title="Chat on WhatsApp"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>
          <MessageCircle className="h-8 w-8 fill-current relative z-10" />
        </motion.a>
      </div>

      {/* --- SUPER ENHANCED HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-20">
        
        {/* DYNAMIC BACKGROUND SLIDESHOW */}
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={HERO_IMAGES[currentImageIndex].url}
              alt={HERO_IMAGES[currentImageIndex].alt}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center text-center max-w-6xl mx-auto mt-10 md:mt-0">
            
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-medium shadow-2xl">
                 <Globe2 className="w-4 h-4 text-blue-400" />
                 <span>Global Standard Supply Chain</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl"
            >
              Smart
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400"> Buying.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto font-light leading-snug"
            >
              Streamlining <span className="text-white font-semibold">Buying</span>, <span className="text-white font-semibold">Selling</span>, and <span className="text-white font-semibold">Bidding</span> for Enterprise & Government Infrastructure.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <Link to="/request-oem" className="w-full sm:w-auto group">
                <Button size="lg" className="w-full h-16 px-10 text-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-0 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all hover:scale-105 font-bold flex items-center gap-3">
                   Start Procurement
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats / Trust Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-10 w-full"
            >
               {[
                 { label: "Active Tenders", value: "2.5K+", icon: Gavel },
                 { label: "Verified OEMs", value: "500+", icon: ShieldCheck },
                 { label: "Products Listed", value: "10K+", icon: ShoppingCart },
                 { label: "Institutions Served", value: "150+", icon: Building2 },
               ].map((stat, i) => (
                 <div key={i} className="text-center group cursor-default">
                    <div className="flex items-center justify-center mb-3">
                       <stat.icon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{stat.value}</div>
                    <div className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THEME: PROCUREMENT, BUYING, SELLING --- */}
      <section className="py-32 container mx-auto px-4 relative">
         <div className="text-center max-w-3xl mx-auto mb-20">
           <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700 px-4 py-1">Ecosystem</Badge>
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Complete Supply Chain Solution.</h2>
           <p className="text-xl text-slate-500">A unified platform connecting manufacturers, dealers, and large-scale buyers.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            
            {/* CARD 1: PROCUREMENT (Buyers/Govt) */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8 text-emerald-600 shadow-sm">
                    <Briefcase className="h-8 w-8" />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-4">Procurement</h3>
                 <p className="text-slate-500 mb-8 leading-relaxed">
                   For Government Departments & Large Enterprises. Access L1 pricing, bulk ordering, and transparent tendering processes tailored for GeM compliance.
                 </p>
                 <ul className="space-y-4 mb-8">
                    {["L1 Price Discovery", "Bulk Order Management", "Compliance Documentation"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                 </ul>
                 <Link to="/contact">
                   <Button variant="outline" className="w-full h-14 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 font-bold">
                     Start Procurement
                   </Button>
                 </Link>
               </div>
            </motion.div>

            {/* CARD 2: BUYING (Dealers/B2B) */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-500"></div>
               
               <div className="relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 text-white shadow-lg shadow-blue-900/50">
                    <ShoppingCart className="h-8 w-8" />
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-4">Direct Buying</h3>
                 <p className="text-slate-400 mb-8 leading-relaxed">
                   For Dealers & Distributors. Get direct OEM authorization, access wholesale catalogs, and manage your inventory with our streamlined B2B portal.
                 </p>
                 <ul className="space-y-4 mb-8">
                    {["OEM Authorization", "Wholesale Pricing", "Priority Logistics"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-200 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                 </ul>
                 <Link to="/products">
                   <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold border-0 shadow-lg shadow-blue-900/50">
                     Browse Inventory
                   </Button>
                 </Link>
               </div>
            </motion.div>

            {/* CARD 3: SELLING (OEMs) */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-8 text-indigo-600 shadow-sm">
                    <TrendingUp className="h-8 w-8" />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 mb-4">Strategic Selling</h3>
                 <p className="text-slate-500 mb-8 leading-relaxed">
                   For Manufacturers. Expand your reach to government contracts and nationwide dealer networks without the logistical headache.
                 </p>
                 <ul className="space-y-4 mb-8">
                    {["Nationwide Network", "Automated Tendering", "Secure Payments"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                 </ul>
                 <Link to="/dealer-application">
                   <Button variant="outline" className="w-full h-14 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 font-bold">
                     Join as Partner
                   </Button>
                 </Link>
               </div>
            </motion.div>

         </div>
      </section>

      {/* --- LARGE VISUAL DIVIDER --- */}
      <section className="h-[50vh] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0">
            <img src={auditoriumImg} alt="Divider" className="w-full h-full object-cover fixed-attachment" />
            <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
         </div>
         <div className="relative z-10 text-center px-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Scale without limits.</h2>
            <Link to="/contact">
               <Button className="h-16 px-12 rounded-full bg-white text-blue-900 hover:bg-slate-100 font-bold text-xl shadow-2xl">
                 Get in Touch
               </Button>
            </Link>
         </div>
      </section>

      {/* --- TRUSTED CLIENTS STRIP (Visual Enhancement) --- */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
         <div className="container mx-auto px-4 text-center">
            <p className="text-slate-500 uppercase tracking-widest font-bold text-sm mb-10">Trusted by Infrastructure Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for Client Logos - Using Text for now but styled like logos */}
               {["Govt of India", "CPWD", "GeM Portal", "Indian Railways", "Defense Estate"].map((client, i) => (
                  <h3 key={i} className="text-2xl md:text-3xl font-black text-white/80 hover:text-white transition-colors cursor-default">{client}</h3>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
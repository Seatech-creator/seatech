import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Award, Hammer, Users, Building, PenTool, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Note: Replace these with actual images from your assets if available, or keep placeholders.
import workshopImg from "../assets/heropage/Modern Institutional Lobby Space.jpg"; // Placeholder
import showroomImg from "../assets/heropage/Modern Executive Conference Room.jpg"; // Placeholder

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6">
              Est. Excellence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Crafting Foundations <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                For Institutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Seatech Associates Pvt. Ltd. is a premier OEM verified partner, bridging the gap between precision manufacturing and government infrastructure needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTRODUCTION GRID --- */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img src={showroomImg} alt="Seatech Showroom" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-bold text-2xl">GeM Verified OEM</p>
                  <p className="text-slate-300">Trusted Government Supplier</p>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900">25+</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Product Categories</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Who We Are</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Seatech Associates Private Ltd. stands at the forefront of the furniture manufacturing industry. We specialize in dealing with government institutes, local buyers, and large-scale retailers, providing robust and elegant solutions for every space.
                </p>
                <p>
                  As an <strong className="text-slate-900">OEM Verified Seller on GeM</strong> (Government e-Marketplace), we adhere to the highest standards of quality and compliance. Our portfolio spans from executive office suites to large-scale auditorium seating, ensuring that every piece we deliver meets the rigorous demands of institutional use.
                </p>
                <p>
                  We don't just supply; we create. Our in-house factory is equipped with advanced machinery, allowing us to maintain strict quality control over every table, chair, and almirah that bears our name.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  "Government Institutes",
                  "Local Buyers",
                  "Retailers",
                  "Educational Bodies"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/products">
                  <Button size="lg" className="bg-slate-900 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg font-bold shadow-lg">
                    Explore Our Catalogue
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE & CAPABILITY --- */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Infrastructure</h2>
            <p className="text-xl text-slate-400">
              Precision engineering meets skilled craftsmanship. Our manufacturing capabilities allow us to deliver bulk orders with consistent quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/50">
                  <Hammer className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Advanced Machinery</h3>
                <p className="text-slate-400">
                  Our factory houses 5-6 heavy-duty industrial machines dedicated to cutting, shaping, and finishing wood and metal with micrometer precision.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-900/50">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">In-House Production</h3>
                <p className="text-slate-400">
                  We own our manufacturing facility, eliminating middlemen. This ensures better cost control, faster turnaround times, and direct accountability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-900/50">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Skilled Workforce</h3>
                <p className="text-slate-400">
                  Our team comprises experienced carpenters, engineers, and quality inspectors who treat every piece of furniture as a testament to our brand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- PRODUCT RANGE BANNER --- */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Product Range</h2>
              <p className="text-lg text-slate-600 mb-8">
                From simple classroom stools to complex composite office tables. We deal in <strong>17 to 25 distinct categories</strong> of wooden and metal furniture.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Office Tables", "Auditorium Chairs", "Almirahs", "Bunk Beds", "Workstations", "Executive Desks"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
               <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-200 relative group">
                  <PenTool className="h-20 w-20 text-white" />
                  <div className="absolute inset-0 border-4 border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to upgrade your infrastructure?</h2>
          <p className="text-xl text-slate-500 mb-10">
            Join the network of government institutions and large enterprises trusting Seatech for their furniture needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 rounded-full">
                Get in Touch
              </Button>
            </Link>
            <Link to="/dealer-application">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-bold border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

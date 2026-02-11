import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Armchair, 
  BedDouble, 
  Coffee, 
  User, 
  GraduationCap, 
  Layout, 
  Monitor, 
  BookOpen, 
  School, 
  Square, 
  ThermometerSun, 
  Briefcase, 
  Crown, 
  Bed, 
  AlignJustify, 
  Archive, 
  Fan, 
  Users, 
  Grid, 
  ConciergeBell, 
  RefreshCw, 
  Lock, 
  Library, 
  FileText, 
  TreePine, 
  Layers, 
  PenTool,
  Sofa,
  BoxSelect,
  ArrowLeft,
  FolderOpen
} from "lucide-react";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { name: "Auditorium Chair (V2)", icon: Armchair },
  { name: "Bunk Beds as per IS 17636", icon: BedDouble },
  { name: "Cafeteria Chair", icon: Coffee },
  { name: "Chair for General Purpose", icon: User },
  { name: "Classroom Stools", icon: GraduationCap },
  { name: "Composite Office Tables confirming to IS 8126 (V2)", icon: Layout },
  { name: "Computer Table (V2)", icon: Monitor },
  { name: "Computer Table (V3)", icon: Monitor },
  { name: "Desk and Bench Set for ClassroomTraining Area", icon: BookOpen },
  { name: "Desk and Chair Set for Classroom Training Area", icon: School },
  { name: "Desk Only for ClassroomTraining Area", icon: Square },
  { name: "Electric Water Heater - Geyser (V2)", icon: ThermometerSun },
  { name: "Executive Table (V4)", icon: Briefcase },
  { name: "High-end Office Furniture Set (V2)", icon: Crown },
  { name: "Metal Bed", icon: Bed },
  { name: "Metal Shelving Racks (Adjustable Type)", icon: AlignJustify },
  { name: "Metal Storage Cabinet", icon: Archive },
  { name: "MIST FAN", icon: Fan },
  { name: "Modular Table Meeting Table Centre Table (V2)", icon: Users },
  { name: "Modular Work Stations (V3)", icon: Grid },
  { name: "Reception Table", icon: ConciergeBell },
  { name: "Revolving Chair (V5)", icon: RefreshCw },
  { name: "Sofas & Couches Handcrafted", icon: Sofa },
  { name: "Steel Almirah Cabinets conforming to IS 3312 (V4)", icon: Lock },
  { name: "Steel Bookcases confirming to IS 7761 (V2)", icon: Library },
  { name: "Steel Filing Cabinets for General Office Purpose", icon: FileText },
  { name: "Wooden Almirah Wardrobe (V2)", icon: TreePine },
  { name: "Wooden Shelf Case Rack Credenza Modular Storage (V2)", icon: Layers },
  { name: "Writing Pad Chair", icon: PenTool },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search"); // Get search param
  
  // "All" means show Category Grid. Specific Name means show Product Grid.
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState(searchParam || ""); // Initialize with URL param

  useEffect(() => {
    // Sync state with URL params
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [categoryParam, searchParam]);

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Filter (Global)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Category Filter
    // If searching globally (activeCategory is All), ignore category check (matches everything).
    // If inside a category, enforce category check.
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;

    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (catName: string) => {
    setActiveCategory(catName);
    setSearchQuery(""); // Clear search when picking a category
    setSearchParams({ category: catName });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCategories = () => {
    setActiveCategory("All");
    setSearchParams({});
    setSearchQuery("");
  };

  // View Logic: Show Product Grid if (Category Selected) OR (Search Active)
  const isProductView = activeCategory !== "All" || searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* --- HEADER --- */}
      <div className="bg-slate-900 text-white pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : (activeCategory === "All" ? "Our Collections" : activeCategory)}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {!isProductView
              ? "Select a category to view approved products." 
              : `Found ${filteredProducts.length} items.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        <AnimatePresence mode="wait">
          {/* --- VIEW 1: CATEGORY GRID (Visible when no category selected AND no search) --- */}
          {!isProductView ? (
            <motion.div
              key="category-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-8">
                <BoxSelect className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group min-h-[140px]"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                        <Icon className="h-6 w-6 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <span className="text-xs font-bold text-center leading-tight line-clamp-3 group-hover:text-slate-900">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* --- VIEW 2: PRODUCT LIST (Visible when category selected OR search active) --- */
            <motion.div
              key="product-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button & Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBackToCategories}
                  className="rounded-full border-slate-300 hover:bg-slate-100 hover:text-slate-900 pl-2 pr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> 
                  {searchQuery ? "Clear Search" : "Back to Categories"}
                </Button>

                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Refine search..." 
                    className="pl-10 rounded-full border-slate-200 bg-white"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Optionally update URL as they type, or just let local state handle filtering
                    }}
                  />
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="group block h-full">
                      <div className="bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-slate-100 flex flex-col h-full hover:-translate-y-1">
                        
                        <div className="aspect-[4/3] bg-slate-50 relative p-6 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300"></div>
                          <img 
                            src={product.images[0].main} 
                            alt={product.name} 
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                          />
                          {product.discount > 0 && (
                            <Badge className="absolute top-4 left-4 bg-white text-slate-900 shadow-sm border-0 font-bold">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                            <div>
                              <p className="text-xs text-slate-400 font-medium">GeM ID</p>
                              <p className="text-sm font-mono font-bold text-slate-700">{product.id}</p>
                            </div>
                            <Button size="sm" variant="ghost" className="rounded-full hover:bg-blue-50 hover:text-blue-600">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Results Found</h3>
                  <p className="text-slate-500">Try adjusting your search terms or browse categories.</p>
                  <Button variant="link" onClick={handleBackToCategories} className="mt-4 text-blue-600">
                    Clear Filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
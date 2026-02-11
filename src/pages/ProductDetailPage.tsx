import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, 
  Package, 
  ChevronRight, 
  Home, 
  Info,
  ExternalLink,
  Truck,
  Hash,
  ZoomIn
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, ProductSpecification } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AuthDialog from "@/components/AuthDialog";

// --- CONFIG: SPECS TO HIDE ---
const IGNORED_SPECS = [
  "Governing Standard", 
  "Types of Almirah", 
  "Test Report Details", 
  "Type of test report",
  "Conformity to IS 3312"
];

const groupSpecifications = (specs: ProductSpecification[]) => {
  return specs
    .filter(spec => !IGNORED_SPECS.includes(spec.name) && !IGNORED_SPECS.includes(spec.category))
    .reduce((acc, spec) => {
      (acc[spec.category] = acc[spec.category] || []).push(spec);
      return acc;
    }, {} as Record<string, ProductSpecification[]>);
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find(p => String(p.id) === productId);
  
  const [selectedImage, setSelectedImage] = useState(product?.images[0]?.main);
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]?.main);
      setQuantity(product.minQty || 1);
    }
  }, [product]);

  const handleAddToQuote = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setIsAuthDialogOpen(true);
      return;
    }
    
    if (product) {
      addToCart(product, quantity);
      toast.success("Added to quote cart", { description: `${quantity} x ${product.name}` });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
            <Button asChild className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-xl h-12">
              <Link to="/products">Back to Catalogue</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const specificationGroups = groupSpecifications(product.specifications);

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-100">
      <Navbar />
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
        message="You must be logged in to create a quote request."
      />
      
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="text-sm text-slate-500 flex items-center gap-2 font-medium overflow-hidden whitespace-nowrap">
              <Link to="/" className="hover:text-blue-600 transition-colors"><Home className="h-4 w-4" /></Link>
              <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
              <Link to="/products" className="hover:text-blue-600 transition-colors">Catalogue</Link> 
              <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
              <span className="text-slate-900 truncate">{product.name}</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT COLUMN: Image Gallery --- */}
          <div className="md:col-span-7 flex flex-col">
             
             {/* MAIN IMAGE - Fixed spacing to prevent overlap with smooth transitions */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               onMouseEnter={() => setIsImageHovered(true)}
               onMouseLeave={() => setIsImageHovered(false)}
               className="relative w-full aspect-[4/3] bg-white rounded-3xl border-2 border-slate-200 p-8 md:p-12 flex items-center justify-center overflow-hidden shadow-lg group cursor-zoom-in mb-8"
             >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/30 via-slate-50/50 to-white opacity-60"></div>
                
                {/* Animated corner accents */}
                <motion.div 
                  className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/20 rounded-tl-3xl"
                  animate={{ 
                    borderColor: isImageHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.2)" 
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/20 rounded-br-3xl"
                  animate={{ 
                    borderColor: isImageHovered ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.2)" 
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Zoom icon indicator */}
                <AnimatePresence>
                  {isImageHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg z-20"
                    >
                      <ZoomIn className="h-5 w-5 text-slate-600" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main image with smooth transitions */}
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImage}
                    src={selectedImage} 
                    alt={product.name}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.9,
                      x: 20,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: isImageHovered ? 1.1 : 1,
                      x: 0,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.9,
                      x: -20,
                      filter: "blur(4px)"
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="w-full h-full object-contain relative z-10"
                  />
                </AnimatePresence>

                {/* Subtle floating shadow on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
             </motion.div>
             
             {/* THUMBNAILS - Enhanced with better spacing and hover effects */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide items-center"
             >
              {product.images.map((image, index) => {
                const isSelected = selectedImage === image.main;
                const isHovered = hoveredThumb === index;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(image.main)}
                    onMouseEnter={() => {
                      setHoveredThumb(index);
                      setSelectedImage(image.main);
                    }}
                    onMouseLeave={() => setHoveredThumb(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ease-out bg-white p-3 cursor-pointer flex items-center justify-center",
                      "border-2 shadow-md hover:shadow-2xl",
                      isSelected 
                        ? "border-blue-600 ring-4 ring-blue-100/50 shadow-blue-200" 
                        : "border-slate-200 hover:border-blue-400 hover:ring-4 hover:ring-blue-50"
                    )}
                  >
                    {/* Thumbnail background effect */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300",
                      isHovered && "opacity-100"
                    )} />
                    
                    <motion.img 
                      src={image.thumbnail} 
                      alt={`View ${index + 1}`}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -2, 2, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-contain relative z-10 pointer-events-none"
                    />

                    {/* Hover glow effect */}
                    {isHovered && !isSelected && (
                      <motion.div
                        layoutId="thumbnail-glow"
                        className="absolute inset-0 border-2 border-blue-400 rounded-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Seller Info Card - Enhanced */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 hidden md:block mt-8 group"
            >
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                 <ShieldCheck className="h-4 w-4 text-green-500" /> 
                 <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                   Verified Seller Information
                 </span>
               </h3>
               <div className="flex items-center gap-4">
                 <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                   <Package className="h-7 w-7" />
                 </div>
                 <div>
                   <p className="font-bold text-slate-900 text-xl">OEM</p>
                   <p className="text-sm text-slate-500">Original Equipment Manufacturer</p>
                 </div>
               </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: Product Info --- */}
          <div className="md:col-span-5 flex flex-col relative">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 sticky top-36"
            >
               <div className="mb-8 border-b border-slate-100 pb-8">
                 <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                   {product.name}
                 </h1>
                 <p className="text-slate-500 font-medium flex items-center gap-2">
                   <span className="text-xs font-bold text-slate-400 uppercase">Model:</span> 
                   <span className="text-slate-700">{product.model}</span>
                 </p>
               </div>

               <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-100 mb-8 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full -ml-12 -mb-12 group-hover:scale-125 transition-transform duration-500"></div>
                 <div className="relative z-10">
                   <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        Pricing
                      </p>
                      <Badge className="bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-md">Bulk Order</Badge>
                   </div>
                   <div className="flex items-baseline gap-2 mb-1">
                     <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                       Quote on Request
                     </span>
                   </div>
                   <p className="text-xs text-slate-500 mt-2">Contact us for competitive bulk pricing</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -4 }}
                   className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-default"
                 >
                     <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                       <Package className="h-6 w-6 text-blue-500" />
                     </div>
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Min Order</span>
                     <span className="text-xl font-bold text-slate-900">{product.minQty} <span className="text-sm font-normal text-slate-500">Units</span></span>
                 </motion.div>
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -4 }}
                   className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-default"
                 >
                     <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                       <Truck className="h-6 w-6 text-green-500" />
                     </div>
                     <span className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Origin</span>
                     <span className="text-xl font-bold text-slate-900">{product.countryOfOrigin}</span>
                 </motion.div>
               </div>

               <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700">Quantity Required</label>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Min: {product.minQty}</span>
                   </div>
                   <div className="flex gap-3">
                      <div className="relative w-32">
                        <Input 
                          type="number" 
                          min={product.minQty} 
                          value={quantity} 
                          onChange={(e) => setQuantity(Math.max(product.minQty || 1, parseInt(e.target.value) || 0))}
                          className="h-14 text-lg font-bold text-center border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 rounded-xl transition-all"
                        />
                      </div>
                      <Button 
                        size="lg" 
                        className="flex-grow h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] group"
                        onClick={handleAddToQuote}
                      >
                        <span className="group-hover:scale-110 transition-transform duration-200 inline-block">
                          Add to Quote
                        </span>
                      </Button>
                   </div>
                   
                   <Button 
                      asChild
                      variant="secondary"
                      size="lg"
                      className="w-full h-14 font-bold text-lg rounded-xl shadow-sm border border-slate-200 hover:bg-slate-100 text-slate-700 mt-3 transition-all hover:-translate-y-1 active:scale-[0.98]"
                   >
                      <Link to="/request-oem">
                        Request OEM Authorization
                      </Link>
                   </Button>
               </div>
            </motion.div>
          </div>
        </div>
        
        {/* Technical Specifications - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-12 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Technical Specifications
              </h2>
              <p className="text-slate-500 mt-1">Detailed breakdown of product features and compliance</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product ID Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="break-inside-avoid"
            >
              <Card className="border-0 shadow-lg overflow-hidden h-full bg-white rounded-2xl ring-1 ring-slate-200/60 hover:shadow-xl transition-all duration-300 group">
                 <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-5 border-b border-slate-100 flex items-center gap-3 group-hover:from-blue-50/50 group-hover:to-slate-50 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Hash className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">Product Identification</h3>
                 </div>
                 <div className="p-0">
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-blue-50/30 border-b border-slate-50 last:border-0 transition-colors">
                        <TableCell className="font-semibold text-slate-600 w-[40%] py-5 pl-6 align-top border-r border-slate-50 bg-slate-50/50">
                          GeM Product ID
                        </TableCell>
                        <TableCell className="text-slate-900 font-medium py-5 pl-6 align-top">
                          <a 
                            href={`https://mkp.gem.gov.in/search?q=${encodeURIComponent(product.id)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 group/link font-mono transition-colors"
                          >
                            <span className="group-hover/link:underline">{product.id}</span>
                            <ExternalLink className="h-4 w-4 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                          </a>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                 </div>
              </Card>
            </motion.div>

            {/* Specification Cards */}
            {Object.entries(specificationGroups).map(([category, specs], idx) => (
              <motion.div 
                key={category} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="break-inside-avoid"
              >
                <Card className="border-0 shadow-lg overflow-hidden h-full bg-white rounded-2xl ring-1 ring-slate-200/60 hover:shadow-xl transition-all duration-300 group">
                   <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-5 border-b border-slate-100 flex items-center gap-3 group-hover:from-blue-50/50 group-hover:to-slate-50 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg">{category}</h3>
                   </div>
                   <div className="p-0">
                    <Table>
                      <TableBody>
                        {specs.map((spec, specIdx) => (
                          <TableRow key={spec.name} className="hover:bg-blue-50/30 border-b border-slate-50 last:border-0 transition-colors group/row">
                            <TableCell className="font-semibold text-slate-600 w-[40%] py-5 pl-6 align-top border-r border-slate-50 bg-slate-50/50 group-hover/row:bg-blue-50/20 transition-colors">
                              {spec.name}
                            </TableCell>
                            <TableCell className="text-slate-900 font-medium py-5 pl-6 align-top">
                              {spec.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                   </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
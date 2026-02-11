import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage"; // <-- Make sure this is imported
import DealerApplication from "./pages/DealerApplication";
import Contact from "./pages/Contact";
import Location from "./pages/Location";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import RequestOEMAuthorization from "./pages/RequestOEMAuthorization";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* These two lines are critical: */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            
            <Route path="/dealer-application" element={<DealerApplication />} />
            <Route path="/request-oem" element={<RequestOEMAuthorization />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location" element={<Location />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
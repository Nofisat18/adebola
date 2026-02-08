import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
 import Layout from "./components/portfolio/Layout";
 import HomePage from "./pages/portfolio/HomePage";
 import VideosPage from "./pages/portfolio/VideosPage";
 
 import SpokespersonPage from "./pages/portfolio/SpokespersonPage";
 import ProcessPage from "./pages/portfolio/ProcessPage";
 import MetricsPage from "./pages/portfolio/MetricsPage";
 import ContactPage from "./pages/portfolio/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<HomePage />} />
             <Route path="videos" element={<VideosPage />} />
             
             <Route path="spokesperson" element={<SpokespersonPage />} />
             <Route path="process" element={<ProcessPage />} />
             <Route path="metrics" element={<MetricsPage />} />
             <Route path="contact" element={<ContactPage />} />
           </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

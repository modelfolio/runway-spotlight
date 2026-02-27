import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Models from "./pages/Models";
import ModelDetail from "./pages/ModelDetail";
import NotFound from "./pages/NotFound";
import CursorFollower from "./components/CursorFollower";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Global custom cursor — hides default cursor on pointer devices */}
      <CursorFollower />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:slug" element={<ModelDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CursorFollower from "./components/CursorFollower";

// Route-level code splitting — only the home page is eagerly loaded
const Models = lazy(() => import("./pages/Models"));
const ModelDetail = lazy(() => import("./pages/ModelDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 min — data is considered fresh
      gcTime: 15 * 60 * 1000,    // 15 min — keep unused cache in memory
      retry: 1,
    },
  },
});

// Minimal fallback shown while a lazy chunk loads (~1 frame on fast connections)
const PageShell = () => (
  <div className="min-h-screen bg-background" aria-hidden />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Global custom cursor — hides default cursor on pointer devices */}
      <CursorFollower />
      <BrowserRouter>
        <Suspense fallback={<PageShell />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:slug" element={<ModelDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const FindPhotos = lazy(() => import("./pages/FindPhotos"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Admin = lazy(() => import("./pages/Admin"));
const Docs = lazy(() => import("./pages/Docs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

import { StoreProvider } from "@/contexts/StoreContext";

const App = () => (
  <StoreProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Suspense fallback={
                <div className="h-screen w-full flex items-center justify-center bg-background">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Carregando...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/eventos" element={<Events />} />
                  <Route path="/evento/:id" element={<EventDetail />} />
                  <Route path="/encontrar" element={<FindPhotos />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pedido/:id" element={<OrderConfirmation />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StoreProvider>
);

export default App;

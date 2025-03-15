
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Restaurants from "./pages/Restaurants";
import Hotels from "./pages/Hotels";
import Spas from "./pages/Spas";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialSession, setInitialSession] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Current session:", data.session);
      setInitialSession(data.session);
      setInitialLoading(false);
    };
    
    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setInitialSession(session);
      }
    );
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-foodapp-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route 
          path="/auth" 
          element={initialSession ? <Navigate to="/home" replace /> : <Auth />} 
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
          path="/home" 
          element={initialSession ? <Index /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/restaurants" 
          element={initialSession ? <Restaurants /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/hotels" 
          element={initialSession ? <Hotels /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/spas" 
          element={initialSession ? <Spas /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/search" 
          element={initialSession ? <Search /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/orders" 
          element={initialSession ? <Orders /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/profile" 
          element={initialSession ? <Profile /> : <Navigate to="/auth" replace />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

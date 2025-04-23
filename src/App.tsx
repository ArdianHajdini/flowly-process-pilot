
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProcessBuilder from "./pages/ProcessBuilder";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            } />
            <Route path="/process-builder" element={
              <PrivateRoute>
                <MainLayout>
                  <ProcessBuilder />
                </MainLayout>
              </PrivateRoute>
            } />
            <Route path="/tasks" element={
              <PrivateRoute>
                <MainLayout>
                  <Tasks />
                </MainLayout>
              </PrivateRoute>
            } />
            <Route path="/team" element={
              <PrivateRoute>
                <MainLayout>
                  <Team />
                </MainLayout>
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <MainLayout>
                  <div className="p-4 mt-8 text-center">
                    <h2 className="text-xl font-medium mb-4">Einstellungen</h2>
                    <p className="text-muted-foreground">
                      Die Einstellungsseite wird in einer zukünftigen Version implementiert.
                    </p>
                  </div>
                </MainLayout>
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

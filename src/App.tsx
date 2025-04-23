import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProcessBuilder from "./pages/ProcessBuilder";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/process-builder" element={
            <MainLayout>
              <ProcessBuilder />
            </MainLayout>
          } />
          <Route path="/tasks" element={
            <MainLayout>
              <Tasks />
            </MainLayout>
          } />
          <Route path="/team" element={
            <MainLayout>
              <Team />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <div className="p-4 mt-8 text-center">
                <h2 className="text-xl font-medium mb-4">Einstellungen</h2>
                <p className="text-muted-foreground">Die Einstellungsseite wird in einer zukünftigen Version implementiert.</p>
              </div>
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

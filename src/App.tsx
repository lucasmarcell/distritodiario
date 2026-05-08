import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Noticias from "./pages/Noticias";
import Cultura from "./pages/Cultura";
import Comportamento from "./pages/Comportamento";
import Opiniao from "./pages/Opiniao";
import Agenda from "./pages/Agenda";
import Sobre from "./pages/Sobre";
import Artigo from "./pages/Artigo";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Contato from "./pages/Contato";
import ConteudoMais from "./pages/ConteudoMais";
import Expediente from "./pages/Expediente";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ArticlesList from "./pages/admin/ArticlesList";
import ArticleEditor from "./pages/admin/ArticleEditor";
import UsersList from "./pages/admin/UsersList";
import TeamMembersList from "./pages/admin/TeamMembersList";
import SiteSettingsPage from "./pages/admin/SiteSettingsPage";
import SecuritySettings from "./pages/admin/SecuritySettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/cultura" element={<Cultura />} />
            <Route path="/comportamento" element={<Comportamento />} />
            <Route path="/opiniao" element={<Opiniao />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/conteudo-mais" element={<ConteudoMais />} />
            <Route path="/expediente" element={<Expediente />} />
            <Route path="/artigo/:id" element={<Artigo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="materias" element={<ArticlesList />} />
              <Route path="materias/nova" element={<ArticleEditor />} />
              <Route path="materias/:id" element={<ArticleEditor />} />
              <Route
                path="usuarios"
                element={
                  <ProtectedRoute requireAdmin>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="equipe"
                element={
                  <ProtectedRoute requireAdmin>
                    <TeamMembersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="configuracoes"
                element={
                  <ProtectedRoute requireAdmin>
                    <SiteSettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="seguranca" element={<SecuritySettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

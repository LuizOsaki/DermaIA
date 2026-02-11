import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Enquanto carrega o estado do login
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Se não estiver logado → manda para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado → libera a página
  return children;
}
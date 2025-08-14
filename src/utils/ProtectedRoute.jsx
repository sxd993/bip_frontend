import { useUser } from '../shared/hooks/useUser';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !user) return <Navigate to="/auth/login" replace />;
  return children;
};
import { useCurrentUser } from '../hooks/useCurrentUser';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError || !user) return <Navigate to="/auth/login" replace />;
  return children;
};
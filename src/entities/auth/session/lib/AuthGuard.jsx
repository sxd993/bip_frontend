import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../model/useUser';
import { Loading } from '@/shared/ui/Loading';

export const AuthGuard = ({ children }) => {
  const { user, isLoading, error } = useUser();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

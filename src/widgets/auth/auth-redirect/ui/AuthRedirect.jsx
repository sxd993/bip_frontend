import { Link, useParams, useSearchParams } from 'react-router-dom';

export const AuthRedirect = () => {
  const { stage: stageRouteParam } = useParams();
  const [searchParams] = useSearchParams();
  const stage = stageRouteParam || searchParams.get('stage') || 'login';

  if (stage === 'register') {
    return (
      <p className="text-center text-sm text-text-muted">
        Уже есть аккаунт?{' '}
        <Link to="/auth/login" className="font-medium text-primary hover:underline">
          Войдите
        </Link>
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-text-muted">
      Нет аккаунта?{' '}
      <Link to="/auth/register" className="font-medium text-primary hover:underline">
        Зарегистрируйтесь
      </Link>
    </p>
  );
};

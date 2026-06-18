import { useUser } from '@/entities/auth';
import { AuthRedirect, LoginForm, RegisterForm } from '@/widgets/auth';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const AuthPage = () => {
  const { stage: stageRouteParam } = useParams();
  const [searchParams] = useSearchParams();
  const stage = stageRouteParam || searchParams.get('stage') || 'login';
  const userTypeParam = searchParams.get('userType');

  const { user, isLoading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/personal-account', { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-text-muted">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-error">Ошибка загрузки данных</p>
      </div>
    );
  }

  const title = stage === 'register' ? 'Зарегистрироваться' : 'Войти';

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-4xl bg-surface p-8 shadow-sm sm:p-10">
        <h1 className="text-center text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {title}
        </h1>

        <div className="mt-8 flex flex-col gap-5">
          {stage === 'register' ? (
            <RegisterForm defaultUserType={userTypeParam} />
          ) : (
            <LoginForm />
          )}

          <AuthRedirect />
        </div>
      </div>
    </div>
  );
};

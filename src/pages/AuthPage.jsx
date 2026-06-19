import { useUser } from '@/entities/auth';
import { AuthRedirect, LoginForm, RegisterForm } from '@/widgets/auth';
import { Loading } from '@/shared/ui/Loading';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const AuthPage = () => {
  const { stage: stageRouteParam } = useParams();
  const [searchParams] = useSearchParams();
  const stage = stageRouteParam || searchParams.get("stage") || "login";
  const userTypeParam = searchParams.get("userType");
  const legalType = searchParams.get("legalType");
  const inviteToken = searchParams.get("inviteToken");
  const inviteEmail = searchParams.get("email");

  const isEmployeeInvite =
    stage === "register" && legalType === "employee" && Boolean(inviteToken);

  const { user, isLoading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/personal-account", { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <p className="text-error">Ошибка загрузки данных</p>
      </div>
    );
  }

  const title = isEmployeeInvite
    ? "Регистрация сотрудника"
    : stage === "register"
      ? "Зарегистрироваться"
      : "Войти";

  return (
    <section className="flex flex-1 items-center justify-center py-8 sm:py-10">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-8">
          <h1 className="text-center text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6 flex flex-col gap-5 sm:mt-8">
            {stage === "register" ? (
              <RegisterForm
                defaultUserType={userTypeParam}
                legalType={legalType}
                inviteToken={inviteToken}
                inviteEmail={inviteEmail}
              />
            ) : (
              <LoginForm />
            )}

            <AuthRedirect />
          </div>
        </div>
      </div>
    </section>
  );
};

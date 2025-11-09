import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loading } from '../../../shared/ui/Loading';
import { AuthGuard } from '../../../shared/lib/auth/AuthGuard';
import { Account } from '../../../pages/Account';
import { Auth } from '../../../pages/Auth';

const Home = lazy(() => import('../../../pages/Home').then(module => ({ default: module.Home })));
const Contacts = lazy(() => import('../../../pages/Contacts').then(module => ({ default: module.Contacts })));
const ServicesPrivate = lazy(() => import('../../../pages/ServicesPrivate'));
const ServicesBusiness = lazy(() => import('../../../pages/ServicesBusiness'));
const UnderDevelopment = lazy(() => import('../../../pages/UnderDevelopment'));
const ConfirmRegister = lazy(() =>
  import('../../../pages/ConfirmRegister').then(module => ({ default: module.ConfirmRegister }))
);
const ForgotPassword = lazy(() => import('../../../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../../../features/auth/reset-password/ui/ResetPassword'));

export const AppRouter = () => (
  <Suspense fallback={<Loading size="large" text="Загрузка страницы..." className="min-h-screen" />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/:stage" element={<Auth />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/register/confirm" element={<ConfirmRegister />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/ServicesPrivate" element={<ServicesPrivate />} />
      <Route path="/ServicesBusiness" element={<ServicesBusiness />} />
      <Route path="/press-center" element={<UnderDevelopment />} />
      <Route path="/press-center/news" element={<UnderDevelopment />} />
      <Route path="/press-center/publications" element={<UnderDevelopment />} />
      <Route path="/calculator" element={<UnderDevelopment />} />
      <Route path="/certificate-verification" element={<UnderDevelopment />} />
      <Route path="/certification-of-evidence" element={<UnderDevelopment />} />
      <Route path="/about" element={<UnderDevelopment />} />
      <Route
        path="/personal-account"
        element={
          <AuthGuard>
            <Account />
          </AuthGuard>
        }
      />
    </Routes>
  </Suspense>
);
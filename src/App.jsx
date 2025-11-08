import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layout
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';

// Компоненты
import ScrollToTop from './shared/components/ScrollToTop';
import { Loading } from './shared/ui/Loading';

// Авторизация
import { AuthGuard } from './shared/lib/auth/AuthGuard';
import { Account } from './pages/Account';
import { Auth } from './pages/Auth';


// Lazy loading для страниц
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Contacts = lazy(() => import('./pages/Contacts').then(module => ({ default: module.Contacts })));
const ServicesPrivate = lazy(() => import('./pages/ServicesPrivate'));
const ServicesBusiness = lazy(() => import('./pages/ServicesBusiness'));
const UnderDevelopment = lazy(() => import('./pages/UnderDevelopment'));
const ConfirmRegister = lazy(() => import('./pages/ConfirmRegister').then(module => ({ default: module.ConfirmRegister })));

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-10">
        <Suspense fallback={<Loading size="large" text="Загрузка страницы..." className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/:stage" element={<Auth />} />
            <Route path="/auth/confirm" element={<ConfirmRegister />} />
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
      </main>
      <Footer />
    </div>
  );
};

export default App;

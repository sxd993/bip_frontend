import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';

// Страницы
import { Home } from './pages/Home'
import { Account } from './pages/Account';
import { Contacts } from './pages/Contacts';
import { Auth } from './pages/Auth';
import ServicesPrivate from './pages/ServicesPrivate';
import ServicesBusiness from './pages/ServicesBusiness';
import UnderDevelopment from './pages/UnderDevelopment';

// Утилиты
import { ProtectedRoute } from './utils/ProtectedRoute';


const App = () => {

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-1 pt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/:stage" element={<Auth />} />
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
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
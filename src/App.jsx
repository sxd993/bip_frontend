import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import './styles/App.css';
import { Contacts } from './pages/Contacts/Contacts';
import { Auth } from './pages/Auth/Auth';
import { ProtectedRoute } from './utils/ProtectedRoute';


const App = () => {

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/:stage" element={<Auth />} />
          <Route path="/contacts" element={<Contacts />} />
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
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { AppRouter } from './app/providers/router';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-1 pt-10">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;

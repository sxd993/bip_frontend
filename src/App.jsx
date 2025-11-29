import Header from './widgets/header/ui/Header';
import Footer from './widgets/footer/ui/Footer';
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

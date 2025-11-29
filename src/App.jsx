import { AppRouter } from './app/providers/router';
import { Footer, Header } from './widgets';

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

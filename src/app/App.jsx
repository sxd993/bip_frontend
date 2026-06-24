import { AppRouter } from "@app/router";
import { CookieConsentBanner, Footer, Header } from "@/widgets";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <Header />

      <div className="mx-auto flex w-full max-w-300 flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <main className="flex flex-1 flex-col">
          <AppRouter />
        </main>
      </div>

      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default App;

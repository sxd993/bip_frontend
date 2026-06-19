import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "@/shared/ui/Loading";
import { AuthGuard } from "@/entities/auth";
import { ProfilePage } from "@/pages/ProfilePage";
import { AuthPage } from "@/pages/AuthPage";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((module) => ({ default: module.HomePage })),
);

export const AppRouter = () => (
  <Suspense
    fallback={<Loading fullScreen />}
  >
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/:stage" element={<AuthPage />} />
      <Route
        path="/personal-account/*"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
    </Routes>
  </Suspense>
);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './store';
import { RouterProvider } from './router';

const queryClient = new QueryClient();

export const AppProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <RouterProvider>{children}</RouterProvider>
    </StoreProvider>
  </QueryClientProvider>
);

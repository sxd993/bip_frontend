import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query/queryClient';
import { RouterProvider } from '../router/RouterProvider';

export const AppProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider>{children}</RouterProvider>
  </QueryClientProvider>
);

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../../../shared/components/ScrollToTop'

export const RouterProvider = ({ children }) => (
  <BrowserRouter>
    <ScrollToTop />
    {children}
  </BrowserRouter>
);

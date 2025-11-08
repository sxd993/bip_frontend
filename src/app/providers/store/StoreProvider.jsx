import { useRef } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from './config/store';

export const StoreProvider = ({ children, initialState }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createAppStore(initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

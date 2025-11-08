import { useRef, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import { createAppStore, type AppStore, type RootState } from './config/store';

type StoreProviderProps = PropsWithChildren<{
  initialState?: PreloadedState<RootState>;
}>;

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  const store = storeRef.current ?? (storeRef.current = createAppStore(initialState));

  return <Provider store={store}>{children}</Provider>;
};

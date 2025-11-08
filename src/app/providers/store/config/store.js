import { configureStore } from '@reduxjs/toolkit';

export const createAppStore = () =>
  configureStore({
    reducer: {},
  });

export const appStore = createAppStore();

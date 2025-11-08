import { configureStore } from '@reduxjs/toolkit';

const dummyReducer = (state = {}) => state;

export const createAppStore = () =>
  configureStore({
    reducer: {
      app: dummyReducer,
    },
  });

export const appStore = createAppStore();

import { configureStore } from '@reduxjs/toolkit';
import { registerPhysicalReducer } from '@/features/auth/register/model/store/RegisterPhysical.slice';

export const createAppStore = () =>
  configureStore({
    reducer: {
      registerPhysical: registerPhysicalReducer
    },
  });

export const appStore = createAppStore();

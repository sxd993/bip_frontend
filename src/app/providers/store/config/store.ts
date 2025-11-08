import {
  configureStore,
  type PreloadedState,
  type ReducersMapObject,
  type StateFromReducersMapObject,
} from '@reduxjs/toolkit';

const reducer: ReducersMapObject = {
  // register feature reducers here as the state tree grows
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const createAppStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    devTools: import.meta.env.MODE !== 'production',
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore['dispatch'];

export const appStore = createAppStore();

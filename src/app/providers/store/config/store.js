import { configureStore } from '@reduxjs/toolkit'

export const createAppStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      app: (state = initialState) => state
    }
  })
}

export const appStore = createAppStore();

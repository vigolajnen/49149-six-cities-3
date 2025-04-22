// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './reducer';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

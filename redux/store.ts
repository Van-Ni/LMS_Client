'use client'
import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import authSlice from './features/auth/authSlice';

// Import your reducers here
// import myReducer from './myReducer';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    // Add your reducers here
    // myReducer,
  },
  devTools: false, // Disable Redux DevTools extension
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

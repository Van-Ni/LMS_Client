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

export const initializeApp = async () => {
  try {
    // Gọi hàm refresh token từ endpoint refreshToken
    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
  } catch (error) {
    console.error('Error initializing app:', error);
    // Xử lý lỗi nếu cần thiết
  }
};
initializeApp();

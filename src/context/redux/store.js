import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';  // ✅ correct import

export const store = configureStore({
  reducer: {
    customers: customerReducer   // ✅ key name in state
  }
});
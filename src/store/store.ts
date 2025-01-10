import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';
import storesReducer from './slices/storesSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    orders: ordersReducer,
    users: usersReducer,
    stores: storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
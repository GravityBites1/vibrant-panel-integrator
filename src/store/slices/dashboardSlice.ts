import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  stats: {
    totalOrders: number;
    totalUsers: number;
    revenue: number;
  };
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isLoading: boolean;
}

const initialState: DashboardState = {
  stats: {
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  },
  isDarkMode: false,
  isSidebarOpen: true,
  isLoading: false
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardState['stats']>) => {
      state.stats = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setStats, toggleDarkMode, toggleSidebar, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
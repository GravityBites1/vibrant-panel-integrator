import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
  id: string;
  name: string;
  cuisine_type: string;
  is_active: boolean;
  created_at: string;
}

interface StoresState {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoresState = {
  stores: [],
  isLoading: false,
  error: null
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setStores, setLoading, setError } = storesSlice.actions;
export default storesSlice.reducer;
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken } from '../api/tokenStorage';
import type { User } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.user = null;
      }
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { setAuthenticated, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

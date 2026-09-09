import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken } from '../api/tokenStorage';
import type { User } from '../types/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileError: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
  profileStatus: 'idle',
  profileError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.profileStatus = 'idle';
      state.profileError = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.profileStatus = 'succeeded';
      state.profileError = null;
    },
    setProfileLoading(state) {
      state.profileStatus = 'loading';
      state.profileError = null;
    },
    setProfileError(state, action: PayloadAction<string>) {
      state.profileStatus = 'failed';
      state.profileError = action.payload;
    },
  },
});

export const { setAuthenticated, logout, setUser, setProfileLoading, setProfileError } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

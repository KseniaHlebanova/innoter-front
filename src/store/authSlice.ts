import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken } from '../api/tokenStorage';
import { DEFAULT_AVATAR_URL } from '../assets/defaultAvatar';
import type { User } from '../types/user';

type AvatarStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  profileError: string | null;
  avatarUrl: string;
  avatarStatus: AvatarStatus;
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
  profileStatus: 'idle',
  profileError: null,
  avatarUrl: DEFAULT_AVATAR_URL,
  avatarStatus: 'idle',
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
      state.avatarUrl = DEFAULT_AVATAR_URL;
      state.avatarStatus = 'idle';
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
    setAvatar(state, action: PayloadAction<{ url: string; status: AvatarStatus }>) {
      state.avatarUrl = action.payload.url;
      state.avatarStatus = action.payload.status;
    },
  },
});

export const { setAuthenticated, logout, setUser, setProfileLoading, setProfileError, setAvatar } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

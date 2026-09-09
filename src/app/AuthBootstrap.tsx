import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser, setProfileLoading, setProfileError } from '../store/authSlice';
import { getCurrentUser } from '../api/user';
import { mapUserApiProfileToUser } from '../api/mappers/userMapper';
import { logClientError } from '../lib/sentry';

export function useLoadCurrentUser() {
  const dispatch = useAppDispatch();

  const loadCurrentUser = useCallback(async () => {
    dispatch(setProfileLoading());

    try {
      const profile = await getCurrentUser();

      dispatch(setUser(mapUserApiProfileToUser(profile)));
    } catch (error) {
      logClientError('Failed to load current user profile', error, {
        source: 'useLoadCurrentUser',
        action: 'loadCurrentUser',
      });
      dispatch(setProfileError('Could not load your profile. Please try again.'));
    }
  }, [dispatch]);

  return loadCurrentUser;
}

export function AuthBootstrap() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const loadCurrentUser = useLoadCurrentUser();

  useEffect(() => {
    if (!isAuthenticated || user) {
      return;
    }

    void loadCurrentUser();
  }, [isAuthenticated, user, loadCurrentUser]);

  return null;
}

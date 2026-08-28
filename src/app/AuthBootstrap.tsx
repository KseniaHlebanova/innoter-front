import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser, setProfileLoading, setProfileError } from '../store/authSlice';
import { getCurrentUser } from '../api/user';
import { mapUserApiProfileToUser } from '../api/mappers/userMapper';

export function useLoadCurrentUser() {
  const dispatch = useAppDispatch();

  const loadCurrentUser = useCallback(async () => {
    dispatch(setProfileLoading());

    try {
      const profile = await getCurrentUser();

      dispatch(setUser(mapUserApiProfileToUser(profile)));
    } catch (error) {
      // TODO: swap for Sentry (logClientError) once Sentry is wired up
      console.error('Failed to load current user profile', error);

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

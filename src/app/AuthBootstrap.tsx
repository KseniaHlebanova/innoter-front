import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/authSlice';
import { getCurrentUser } from '../api/user';
import { mapUserApiProfileToUser } from '../api/mappers/userMapper';

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthenticated && !user) {
      getCurrentUser()
        .then((profile) => dispatch(setUser(mapUserApiProfileToUser(profile))))
        .catch(() => {});
    }
  }, [isAuthenticated, user, dispatch]);

  return null;
}

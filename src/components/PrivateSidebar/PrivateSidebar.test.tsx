import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/renderWithProviders';
import { PrivateSidebar } from './PrivateSidebar';
import { RoleEnum } from '../../api/generated/schema';
import { DEFAULT_AVATAR_URL } from '../../assets/defaultAvatar';

test('shows private navigation links', () => {
  renderWithProviders(<PrivateSidebar />, {
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user: {
          id: 'test-uuid',
          displayName: 'Test User',
          username: 'Test User Name',
          imageS3Path: null,
          name: 'Test Name',
          surname: 'Test Surname',
          email: 'test.test@gmail.com',
          phoneNumber: '+375297654321',
          role: RoleEnum.USER,
        },
        profileStatus: 'succeeded',
        profileError: null,
        avatarUrl: DEFAULT_AVATAR_URL,
        avatarStatus: 'idle',
      },
    },
  });

  expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/subscriptions');
  expect(screen.getByRole('link', { name: /Explore/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '/profile');
  expect(screen.getAllByRole('link', { name: 'Post' })).toHaveLength(2);
  screen.getAllByRole('link', { name: 'Post' }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/posts/new');
  });
});

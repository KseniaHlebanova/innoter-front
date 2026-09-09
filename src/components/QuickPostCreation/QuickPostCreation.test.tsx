// QuickPostCreation.test.tsx
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/renderWithProviders';
import { QuickPostCreation } from './QuickPostCreation';
import { RoleEnum } from '../../api/generated/schema';
import { DEFAULT_AVATAR_URL } from '../../assets/defaultAvatar';

test('shows quick post placeholder and post action', () => {
  renderWithProviders(<QuickPostCreation />, {
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

  expect(screen.getByText("What's happening")).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Post' })).toHaveAttribute('href', '/posts/new');
});

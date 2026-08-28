// QuickPostCreation.test.tsx
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/renderWithProviders';
import { QuickPostCreation } from './QuickPostCreation';

test('shows quick post placeholder and post action', () => {
  renderWithProviders(<QuickPostCreation />, {
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user: {
          id: 'test-uuid',
          displayName: 'Test User',
          username: 'Test User Name',
          avatarUrl: 'https://aws.test.s3.com/test.img',
          role: 1,
        },
        profileStatus: 'succeeded',
        profileError: null,
      },
    },
  });

  expect(screen.getByText("What's happening")).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Post' })).toHaveAttribute('href', '/posts/new');
});

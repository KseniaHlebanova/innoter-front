import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/renderWithProviders';
import { PrivateSidebar } from './PrivateSidebar';

test('shows private navigation links', () => {
  renderWithProviders(<PrivateSidebar />, {
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

  expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/subscriptions');
  expect(screen.getByRole('link', { name: /Explore/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '/profile');
  expect(screen.getAllByRole('link', { name: 'Post' })).toHaveLength(2);
  screen.getAllByRole('link', { name: 'Post' }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/posts/new');
  });
});

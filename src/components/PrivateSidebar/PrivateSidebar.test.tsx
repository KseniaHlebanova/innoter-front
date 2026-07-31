import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateSidebar } from './PrivateSidebar';

test('shows private navigation links', () => {
  render(
    <MemoryRouter>
      <PrivateSidebar />
    </MemoryRouter>,
  );
  expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/subscriptions');
  expect(screen.getByRole('link', { name: /Explore/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '/profile');
  expect(screen.getAllByRole('link', { name: 'Post' })).toHaveLength(2);
  screen.getAllByRole('link', { name: 'Post' }).forEach((link) => {
    expect(link).toHaveAttribute('href', '/posts/new');
  });
});

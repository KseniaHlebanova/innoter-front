import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QuickPostCreation } from './QuickPostCreation';

test('shows quick post placeholder and post action', () => {
  render(
    <MemoryRouter>
      <QuickPostCreation />
    </MemoryRouter>,
  );
  expect(screen.getByText("What's happening")).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Post' })).toHaveAttribute('href', '/posts/new');
});

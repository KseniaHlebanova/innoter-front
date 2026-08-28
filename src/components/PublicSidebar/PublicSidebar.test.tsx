import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PublicSidebar } from './PublicSidebar';

test('shows logo and login button', () => {
  render(
    <MemoryRouter>
      <PublicSidebar />
    </MemoryRouter>,
  );
  expect(screen.getByAltText('Innoter logo')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
});

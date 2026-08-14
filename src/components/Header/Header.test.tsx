import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

test('shows a login link by default', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
});

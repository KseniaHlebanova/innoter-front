import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

test('renders its nested authentication page content', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<p>Login content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('img', { name: 'Innoter' })).toBeInTheDocument();
  expect(screen.getByText('Login content')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/');
});

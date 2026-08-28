import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../utils/renderWithProviders';
import { AuthLayout } from './AuthLayout';

test('renders its nested authentication page content', () => {
  renderWithProviders(
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<p>Login content</p>} />
      </Route>
    </Routes>,
    { route: '/login' },
  );

  expect(screen.getByRole('img', { name: 'Innoter' })).toBeInTheDocument();
  expect(screen.getByText('Login content')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/');
});

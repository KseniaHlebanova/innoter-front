import { render, screen } from '@testing-library/react';
import { AuthFormCard } from './AuthFormCard';

test('renders page-specific content inside the shared card', () => {
  render(
    <AuthFormCard
      title="Reset password"
      description="Enter your email address."
      footer={<a href="/login">Return to login</a>}
    >
      <button type="button">Continue</button>
    </AuthFormCard>,
  );

  expect(screen.getByRole('heading', { name: 'Reset password' })).toBeInTheDocument();
  expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Return to login' })).toBeInTheDocument();
});

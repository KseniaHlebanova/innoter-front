import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

test('renders avatar image with alt text', () => {
  render(<Avatar src="/avatar.png" alt="User avatar" />);
  expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument();
});

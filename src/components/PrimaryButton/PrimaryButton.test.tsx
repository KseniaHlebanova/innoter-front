import { render, screen } from '@testing-library/react';
import { PrimaryButton } from './PrimaryButton';

test('renders a button with the supplied label', () => {
  render(<PrimaryButton type="submit">Continue</PrimaryButton>);

  expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('type', 'submit');
});

import { render, screen } from '@testing-library/react';
import { TextField } from './TextField';

test('associates its label with the input', () => {
  render(<TextField id="email" label="Email address" type="email" />);

  expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email');
});

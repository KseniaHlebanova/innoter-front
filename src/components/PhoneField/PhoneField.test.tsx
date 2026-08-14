import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneField } from './PhoneField';

test('associates its label with the input', () => {
  render(<PhoneField id="phone" label="Phone number" />);

  expect(screen.getByLabelText('Phone number')).toHaveAttribute('type', 'tel');
});

test('formats typed digits with the phone mask', async () => {
  const user = userEvent.setup();
  render(<PhoneField id="phone" label="Phone number" />);

  const input = screen.getByLabelText('Phone number');
  await user.type(input, '123456789012');

  expect(input).toHaveValue('+123 (45) 678-90-12');
});

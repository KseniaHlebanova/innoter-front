import { render, screen } from '@testing-library/react';
import { InnoterLogo } from './InnoterLogo';

test('shows the Inotter brand name', () => {
  render(<InnoterLogo />);
  expect(screen.getByAltText('Innoter logo')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { FeedHeader } from './FeedHeader';

test('renders the feed title', () => {
  render(<FeedHeader title="Explore" />);
  expect(screen.getByRole('heading', { name: 'Explore' })).toBeInTheDocument();
});

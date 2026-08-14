import { render, screen } from '@testing-library/react';
import { subscriptionFeedPosts } from '../../features/feed/data/mockPosts';
import { Feed } from './Feed';

test('renders a list of posts', () => {
  render(<Feed posts={subscriptionFeedPosts} />);
  expect(screen.getByText('Annie')).toBeInTheDocument();
  expect(screen.getByText('Jorge Mckinney')).toBeInTheDocument();
});

test('shows empty state when there are no posts', () => {
  render(<Feed posts={[]} />);
  expect(screen.getByText('No posts yet.')).toBeInTheDocument();
});

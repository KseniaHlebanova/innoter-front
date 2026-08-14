import { render, screen } from '@testing-library/react';
import { subscriptionFeedPosts } from '../../features/feed/data/mockPosts';
import { PostCard } from './PostCard';

test('renders post author and text', () => {
  render(<PostCard post={subscriptionFeedPosts[0]} />);
  expect(screen.getByText('Annie')).toBeInTheDocument();
  expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
});

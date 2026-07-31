import type { Meta, StoryObj } from '@storybook/react';
import { subscriptionFeedPosts } from '../../features/feed/data/mockPosts';
import { PostCard } from './PostCard';

const meta = {
  title: 'Components/PostCard',
  component: PostCard,
  args: { post: subscriptionFeedPosts[0] },
} satisfies Meta<typeof PostCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutImage: Story = { args: { post: subscriptionFeedPosts[1] } };

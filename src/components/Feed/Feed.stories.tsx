import type { Meta, StoryObj } from '@storybook/react';
import { globalFeedPosts, subscriptionFeedPosts } from '../../features/feed/data/mockPosts';
import { Feed } from './Feed';

const meta = {
  title: 'Components/Feed',
  component: Feed,
  args: { posts: subscriptionFeedPosts },
} satisfies Meta<typeof Feed>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Subscriptions: Story = {};
export const Global: Story = { args: { posts: globalFeedPosts } };
export const Empty: Story = { args: { posts: [] } };

import type { Meta, StoryObj } from '@storybook/react';
import { FeedHeader } from './FeedHeader';

const meta = {
  title: 'Components/FeedHeader',
  component: FeedHeader,
  args: { title: 'Home' },
} satisfies Meta<typeof FeedHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

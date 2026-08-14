import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from './PrimaryButton';

const meta = {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  args: { children: 'Continue' },
} satisfies Meta<typeof PrimaryButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

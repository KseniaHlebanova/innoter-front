import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { TextField } from '../TextField/TextField';
import { AuthFormCard } from './AuthFormCard';

const meta = {
  title: 'Components/AuthFormCard',
  component: AuthFormCard,
  args: {
    title: 'Account Login',
    description: 'Use your email address and password to sign in.',
    children: (
      <>
        <TextField id="email" label="Email address" type="email" />
        <PrimaryButton>Continue</PrimaryButton>
      </>
    ),
  },
} satisfies Meta<typeof AuthFormCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

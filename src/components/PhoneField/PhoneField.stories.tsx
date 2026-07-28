import type { Meta, StoryObj } from '@storybook/react';
import { PhoneField } from './PhoneField';

const meta = {
  title: 'Components/PhoneField',
  component: PhoneField,
  args: { id: 'phone', label: 'Phone number' },
} satisfies Meta<typeof PhoneField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

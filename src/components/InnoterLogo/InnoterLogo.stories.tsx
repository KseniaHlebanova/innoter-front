import type { Meta, StoryObj } from '@storybook/react';
import { InnoterLogo } from './InnoterLogo';

const meta = {
  title: 'Components/InnoterLogo',
  component: InnoterLogo,
  args: { compact: false },
} satisfies Meta<typeof InnoterLogo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };

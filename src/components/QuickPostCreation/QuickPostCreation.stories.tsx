import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { QuickPostCreation } from './QuickPostCreation';

const meta = {
  title: 'Components/QuickPostCreation',
  component: QuickPostCreation,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof QuickPostCreation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

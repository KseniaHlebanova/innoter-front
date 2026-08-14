import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PublicSidebar } from './PublicSidebar';

const meta = {
  title: 'Components/PublicSidebar',
  component: PublicSidebar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PublicSidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

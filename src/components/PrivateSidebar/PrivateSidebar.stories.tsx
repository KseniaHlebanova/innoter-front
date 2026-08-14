import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateSidebar } from './PrivateSidebar';

const meta = {
  title: 'Components/PrivateSidebar',
  component: PrivateSidebar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/subscriptions']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PrivateSidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

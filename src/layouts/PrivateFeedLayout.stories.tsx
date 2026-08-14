import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PrivateFeedLayout } from './PrivateFeedLayout';
import { SubscriptionsPage } from '../pages/SubscriptionsPage/SubscriptionsPage';

const meta = {
  title: 'Layouts/PrivateFeedLayout',
  component: PrivateFeedLayout,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/subscriptions']}>
        <Routes>
          <Route element={<Story />}>
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PrivateFeedLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

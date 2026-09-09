import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthAwareFeedLayout } from './AuthAwareFeedLayout';
import { GlobalFeedPage } from '../pages/GlobalFeedPage/GlobalFeedPage';

const meta = {
  title: 'Layouts/AuthAwareFeedLayout',
  component: AuthAwareFeedLayout,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Story />}>
            <Route path="/" element={<GlobalFeedPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AuthAwareFeedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Public: Story = { parameters: { isAuthenticated: false } };
export const Private: Story = { parameters: { isAuthenticated: true } };

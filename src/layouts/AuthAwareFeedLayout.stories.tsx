import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthAwareFeedLayout } from './AuthAwareFeedLayout';
import { GlobalFeedPage } from '../pages/GlobalFeedPage/GlobalFeedPage';
import { authReducer } from '../store/authSlice';

const meta = {
  title: 'Layouts/AuthAwareFeedLayout',
  component: AuthAwareFeedLayout,
  decorators: [
    (Story, context) => {
      const store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: { isAuthenticated: context.parameters.isAuthenticated ?? false },
        },
      });

      return (
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route element={<Story />}>
                <Route path="/" element={<GlobalFeedPage />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof AuthAwareFeedLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Public: Story = { parameters: { isAuthenticated: false } };
export const Private: Story = { parameters: { isAuthenticated: true } };

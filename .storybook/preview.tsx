import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../src/store/authSlice';
import '../src/app/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
  },

  decorators: [
    (Story, context) => {
      const authState = {
        isAuthenticated: context.parameters.isAuthenticated ?? false,
        user: null,
        profileStatus: 'idle' as const,
        profileError: null,
      };

      const store = configureStore({
        reducer: {
          auth: authReducer,
        },
        preloadedState: {
          auth: authState,
        },
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default preview;

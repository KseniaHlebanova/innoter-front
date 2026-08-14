import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';

const meta = { title: 'Layouts/AuthLayout', component: AuthLayout } satisfies Meta<
  typeof AuthLayout
>;
export default meta;
type Story = StoryObj<typeof meta>;

function AuthLayoutPreview() {
  return (
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<p>Authentication content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export const Default: Story = { render: () => <AuthLayoutPreview /> };
export const Mobile: Story = {
  render: () => <AuthLayoutPreview />,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

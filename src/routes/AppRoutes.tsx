import { Route, Routes } from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/AuthenticatedLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { CreatePostPage } from '../pages/CreatePostPage/CreatePostPage';
import { GlobalFeedPage } from '../pages/GlobalFeedPage/GlobalFeedPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { SubscriptionsPage } from '../pages/SubscriptionsPage/SubscriptionsPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<GlobalFeedPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/posts/new" element={<CreatePostPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

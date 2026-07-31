import { Route, Routes } from 'react-router-dom';
import { AuthAwareFeedLayout } from '../layouts/AuthAwareFeedLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PrivateFeedLayout } from '../layouts/PrivateFeedLayout';
import { PrivateSidebarLayout } from '../layouts/PrivateSidebarLayout';
import { CreatePostPage } from '../pages/CreatePostPage/CreatePostPage';
import { GlobalFeedPage } from '../pages/GlobalFeedPage/GlobalFeedPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { SubscriptionsPage } from '../pages/SubscriptionsPage/SubscriptionsPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthAwareFeedLayout />}>
        <Route path="/" element={<GlobalFeedPage />} />
        <Route path="/subscriptions2" element={<SubscriptionsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateFeedLayout />}>
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Route>
        <Route element={<PrivateSidebarLayout />}>
          <Route path="/posts/new" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

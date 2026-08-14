import { Outlet } from 'react-router-dom';
import { PrivateSidebar } from '../components/PrivateSidebar/PrivateSidebar';
import { PublicSidebar } from '../components/PublicSidebar/PublicSidebar';
import { FeedHeader } from '../components/FeedHeader/FeedHeader';
import { useAppSelector } from '../store/hooks';
import './feedLayout.css';

export function AuthAwareFeedLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="feed-layout">
      {isAuthenticated ? <PrivateSidebar /> : <PublicSidebar />}
      <div className="feed-layout__content">
        <div className="feed-layout__main">
          <div className="feed-layout__sticky-top">
            <FeedHeader title="Explore" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { FeedHeader } from '../components/FeedHeader/FeedHeader';
import { PrivateSidebar } from '../components/PrivateSidebar/PrivateSidebar';
import { QuickPostCreation } from '../components/QuickPostCreation/QuickPostCreation';
import './feedLayout.css';

export function PrivateFeedLayout() {
  return (
    <div className="feed-layout feed-layout--private">
      <PrivateSidebar />
      <div className="feed-layout__content">
        <div className="feed-layout__main">
          <div className="feed-layout__sticky-top">
            <FeedHeader title="Home" />
            <QuickPostCreation />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

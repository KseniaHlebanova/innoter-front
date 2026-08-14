import { Outlet } from 'react-router-dom';
import { PrivateSidebar } from '../components/PrivateSidebar/PrivateSidebar';
import './feedLayout.css';

export function PrivateSidebarLayout() {
  return (
    <div className="feed-layout feed-layout--private">
      <PrivateSidebar />
      <div className="feed-layout__content">
        <div className="feed-layout__main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

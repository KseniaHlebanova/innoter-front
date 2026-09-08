import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import { InnoterLogo } from '../InnoterLogo/InnoterLogo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { clearTokens } from '../../api/tokenStorage';
import './PrivateSidebar.css';

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="96px" height="96px">
      <path d="M29.356,11.223l-11.353-8.92c-1.18-0.928-2.827-0.928-4.009,0L2.645,11.222c-0.529,0.415-0.729,1.095-0.51,1.73	C2.354,13.589,2.931,14,3.604,14c0.553,0,1-0.447,1-1c0-0.23-0.078-0.442-0.208-0.611L15.23,3.875	c0.618-0.485,1.514-0.209,1.932,0.32c0.513,0.651,0.4,1.594-0.251,2.106L9,12.529V25.5C9,26.328,8.328,27,7.5,27	C6.673,27,6,26.328,6,25.5v-6.25V16c0-0.553-0.447-1-1-1s-1,0.447-1,1v9.5C4,27.43,5.57,29,7.5,29h17c1.93,0,3.5-1.57,3.5-3.5V14	h0.396c0.674,0,1.251-0.411,1.47-1.048C30.085,12.317,29.885,11.637,29.356,11.223z M13,16c0-0.552,0.448-1,1-1h4	c0.552,0,1,0.448,1,1v5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1V16z" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <g stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        <line x1="35" y1="15" x2="25" y2="85"></line>
        <line x1="65" y1="15" x2="55" y2="85"></line>
        <line x1="15" y1="35" x2="85" y2="35"></line>
        <line x1="10" y1="65" x2="80" y2="65"></line>
      </g>
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrivateSidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const avatarUrl = useAppSelector((state) => state.auth.avatarUrl);
  function handleLogout() {
    clearTokens();
    dispatch(logout());
    navigate('/login');
  }

  return (
    <aside className="private-sidebar" aria-label="Main navigation">
      <Link className="private-sidebar__logo" to="/subscriptions">
        <InnoterLogo />
      </Link>
      <nav className="private-sidebar__nav">
        <NavLink
          className={({ isActive }) =>
            `private-sidebar__link${isActive ? ' private-sidebar__link--active' : ''}`
          }
          to="/subscriptions"
        >
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `private-sidebar__link${isActive ? ' private-sidebar__link--active' : ''}`
          }
          to="/"
        >
          <ExploreIcon />
          <span>Explore</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `private-sidebar__link private-sidebar__link--profile${
              isActive ? ' private-sidebar__link--active' : ''
            }`
          }
          to="/profile"
        >
          <Avatar
            src={avatarUrl}
            alt={user ? `${user.displayName} avatar` : 'User avatar'}
            size="sm"
          />
          <span>Profile</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `private-sidebar__link private-sidebar__link--mobile-post${
              isActive ? ' private-sidebar__link--active' : ''
            }`
          }
          to="/posts/new"
        >
          <span className="private-sidebar__mobile-post-icon" aria-hidden="true">
            +
          </span>
          <span>Post</span>
        </NavLink>
        <button
          type="button"
          className="private-sidebar__link private-sidebar__logout"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span>Log out</span>
        </button>
      </nav>
      <Link className="private-sidebar__post-button" to="/posts/new">
        Post
      </Link>
    </aside>
  );
}

import { Link } from 'react-router-dom';
import { InnoterLogo } from '../InnoterLogo/InnoterLogo';
import './PublicSidebar.css';

export function PublicSidebar() {
  return (
    <aside className="public-sidebar" aria-label="Public navigation">
      <Link className="public-sidebar__logo" to="/">
        <InnoterLogo />
      </Link>

      <Link className="public-sidebar__login-button" to="/login">
        Login
      </Link>
    </aside>
  );
}

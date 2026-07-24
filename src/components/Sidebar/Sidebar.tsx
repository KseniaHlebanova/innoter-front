import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <nav>
        <NavLink to="/">Global feed</NavLink>
        <NavLink to="/subscriptions">Subscriptions</NavLink>
        <NavLink to="/posts/new">Create post</NavLink>
      </nav>
    </aside>
  );
}

import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import './layouts.css';

export function PublicLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}

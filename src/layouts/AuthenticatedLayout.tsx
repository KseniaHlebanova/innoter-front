import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Sidebar } from '../components/Sidebar/Sidebar';
import './layouts.css';

export function AuthenticatedLayout() {
  return (
    <div className="app-shell">
      <Header showLogin={false} />
      <div className="authenticated-layout">
        <Sidebar />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

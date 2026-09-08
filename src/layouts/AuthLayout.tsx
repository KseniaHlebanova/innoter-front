import { Link, Navigate, Outlet } from 'react-router-dom';
import innoterLogo from '../assets/innoter-logo.png';
import { useAppSelector } from '../store/hooks';
import './AuthLayout.css';

export function AuthLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-layout">
      <aside className="auth-layout__brand-panel" aria-label="Innoter">
        <img className="auth-layout__logo" src={innoterLogo} alt="Innoter" />
      </aside>
      <main className="auth-layout__content">
        <Link className="auth-layout__back" to="/">
          <span aria-hidden="true">‹</span> Back
        </Link>
        <div className="auth-layout__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

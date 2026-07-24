import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  showLogin?: boolean;
}

export function Header({ showLogin = true }: HeaderProps) {
  return (
    <header className="header">
      <Link className="header__brand" to="/">
        Innoter
      </Link>
      {showLogin && (
        <Link className="header__login" to="/login">
          Login
        </Link>
      )}
    </header>
  );
}

import type { ReactNode } from 'react';
import './AuthFormCard.css';

interface AuthFormCardProps {
  children: ReactNode;
  description: string;
  footer?: ReactNode;
  title: string;
}

export function AuthFormCard({ children, description, footer, title }: AuthFormCardProps) {
  return (
    <section className="auth-form-card" aria-labelledby="auth-form-card-title">
      <h1 id="auth-form-card-title">{title}</h1>
      <p className="auth-form-card__description">{description}</p>
      <div className="auth-form-card__divider" />
      {children}
      {footer && <div className="auth-form-card__footer">{footer}</div>}
    </section>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './PrimaryButton.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, ...buttonProps }: PrimaryButtonProps) {
  return (
    <button className="primary-button" {...buttonProps}>
      {children}
    </button>
  );
}

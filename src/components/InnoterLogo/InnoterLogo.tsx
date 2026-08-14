import innoterLogo from '../../assets/innoter-logo.png';
import './InnoterLogo.css';

interface InnoterLogoProps {
  compact?: boolean;
}

export function InnoterLogo({ compact = false }: InnoterLogoProps) {
  return (
    <div className={`innoter-logo${compact ? ' innoter-logo--compact' : ''}`}>
      <img className="innoter-logo__icon" src={innoterLogo} alt="" aria-hidden="true" />
      {!compact}
    </div>
  );
}

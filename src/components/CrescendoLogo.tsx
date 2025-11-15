import { useTheme } from './ThemeProvider';
import crescendoLogoDark from 'figma:asset/91e2bb71d0b51e0a451d37fa6859e1814f08012d.png';

interface CrescendoLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function CrescendoLogo({ className = "", showSubtitle = true }: CrescendoLogoProps) {
  const { theme } = useTheme();
  
  return (
    <img 
      src={crescendoLogoDark}
      alt="Crescendo Rewards Alliance"
      className={`${theme === 'light' ? 'invert' : ''} ${className}`}
      style={{ 
        objectFit: 'contain',
        width: '300px',
        height: 'auto',
        minWidth: '300px'
      }}
    />
  );
}
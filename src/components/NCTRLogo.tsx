import { useTheme } from './ThemeProvider';
import nctrLogoGrey from 'figma:asset/2d6d4ed72bcb8ee94953a0f3d9167caa6af51fd5.png';
import nctrLogoYellow from 'figma:asset/b3da0db9b82f02308d82d4dc22b48f95514b78f1.png';

interface NCTRLogoProps {
  className?: string;
}

export function NCTRLogo({ className = "inline-block h-[2.7rem] w-auto mx-1 align-middle" }: NCTRLogoProps) {
  const { theme } = useTheme();
  
  return (
    <img 
      src={theme === 'dark' ? nctrLogoYellow : nctrLogoGrey}
      alt="NCTR"
      className={className}
    />
  );
}
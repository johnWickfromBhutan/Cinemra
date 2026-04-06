import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  className?: string;
  disabled?: boolean;
}

export const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }: ButtonProps) => {
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-dim neon-glow-primary',
    secondary: 'bg-secondary-container text-secondary hover:bg-secondary-container/80',
    glass: 'bg-surface-bright/40 backdrop-blur-md text-on-surface hover:bg-surface-bright/60',
    outline: 'bg-transparent border border-outline-variant/20 text-on-surface hover:bg-surface-container-highest',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3 rounded-full font-bold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

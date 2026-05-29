'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export default function AnimatedButton({ children, className = '', href, onClick, type = 'button', disabled }: Props) {
  const baseClasses =
    'relative inline-flex items-center justify-center overflow-hidden rounded-pill font-semibold' +
    ' bg-brand-green text-white px-6 py-3 shadow-lg transition-colors duration-300' +
    ' disabled:opacity-50 disabled:cursor-not-allowed';

  const buttonContent = (
    <>
      {/* Ripple overlay on hover */}
      <motion.span
        className="absolute inset-0 rounded-pill bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.05, boxShadow: '0 0 20px rgba(76,175,80,0.6)' },
    whileTap: { scale: 0.95 },
  };

  if (href) {
    return (
      <motion.a href={href} className={`${baseClasses} ${className}`} {...motionProps}>
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}
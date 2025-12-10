'use client';

import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-lg transition-colors duration-200 inline-flex items-center justify-center';

  const variants = {
    primary:
      'bg-verde-oliva text-off-white hover:bg-verde-claro shadow-sm hover:shadow-md',
    secondary:
      'bg-off-white border border-cinza-medio text-cinza-escuro hover:bg-cinza-claro',
    tertiary: 'text-verde-oliva hover:underline bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// components/atoms/Button.tsx

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    className?: string;
 }

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    className = '', 
    ...rest
}) => {
    const baseClasses = clsx(
        'rounded-md focus:outline-none focus:ring-2',
        {
          'btn btn-primary': variant === 'primary',
          'btn btn-secondary': variant === 'secondary',
          'btn btn-danger': variant === 'danger',
          'text-sm': size === 'small',
          'text-base': size === 'medium',
          'text-lg': size === 'large',
          'w-full': fullWidth,
        },
        className
      );

    return (
        <button
            {...rest}
            className={baseClasses}
        >
            {children}
        </button>
    );
};

export default Button;

"use client"

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
 }

const Button: React.FC<ButtonProps> = ({
    children,
    className = '', 
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={clsx("btn", className)}
        >
            {children}
        </button>
    );
};

export default Button;

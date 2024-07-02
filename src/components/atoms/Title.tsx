"use client"

import React from 'react';
import clsx from 'clsx';
import { poppinsFont } from '@/lib/fonts';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = '' }) => {
  return (
    <h1 className={clsx(
        'text-6xl font-semibold text-white drop-shadow-md', 
        poppinsFont.className, 
        className
        )}>
      {children}
    </h1>
  );
};

export default Title;

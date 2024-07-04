"use client"

import clsx from 'clsx';
import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => {
  return (
      <h1 className={clsx("card-title block text-xl font-semibold", className)}>{children}</h1>
  );
};

export default CardHeader;

"use client"

import clsx from 'clsx';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className="" }) => {
  return (
    <div className={clsx("card bg-base-100 w-96 shadow-xl", className)}>{children}</div>
  );
};

export default Card;

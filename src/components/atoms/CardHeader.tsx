"use client"

import React from 'react';

interface CardHeaderProps {
  children: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return (
      <h1 className="card-title block text-xl font-semibold">{children}</h1>
  );
};

export default CardHeader;

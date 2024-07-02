"use client"

import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">{children}</div>
  );
};

export default Card;

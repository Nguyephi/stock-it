"use client"

import React from 'react';

interface CardBodyProps {
  children: React.ReactNode;
}

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <div className="flex justify-center card-body space-y-6 text-center">{children}</div>
  );
};

export default CardBody;

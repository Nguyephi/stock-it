"use client"

import React from 'react';

interface CardBodyProps {
  children: React.ReactNode;
}

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <div className="card-body flex justify-center space-y-3 text-center">{children}</div>
  );
};

export default CardBody;

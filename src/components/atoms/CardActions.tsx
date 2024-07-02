"use client"

import React from 'react';
import clsx from 'clsx';

interface CardActionsProps {
    children: React.ReactNode;
    className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ children, className = '' }) => {
    return (
        <div className={clsx("card-actions", className)}>{children}</div>
    );
};

export default CardActions;

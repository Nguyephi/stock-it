import React from 'react';
import clsx from 'clsx';

interface AlertProps {
    message?: string;
    icon?: React.ReactNode;
    iconPlacement?: "before" | "after"
    className?: string;
}


const Alert: React.FC<AlertProps> = ({ message, icon, iconPlacement, className }) => {
    if (!message) return null;
    return (
        <div role="alert" className={clsx('alert rounded-md text-sm py-3', className)}>
            {iconPlacement === "before" && icon}
            <span>{message}</span>
            {iconPlacement === "after" && icon}
        </div>
    );
};

export default Alert;
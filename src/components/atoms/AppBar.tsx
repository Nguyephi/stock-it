import React from 'react';
import { cn } from '@/lib/cn';

interface AppBarProps {
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    position?: 'static' | 'fixed' | 'sticky';
    className?: string;
}

const AppBar: React.FC<AppBarProps> = ({ leftComponent, rightComponent, position = "fixed", className }) => {
    const positionClasses = {
        static: 'relative',
        fixed: 'fixed top-0 left-0 w-full',
        sticky: 'sticky top-0',
    };
    return (
        <header className={cn('bg-blue-500 text-white shadow-md h-16 z-50', positionClasses[position], className)}>
            <div className="mx-auto flex items-center justify-between px-20 p-4 h-full">
                <div>{leftComponent}</div>
                <div>{rightComponent}</div>
            </div>
        </header>
    );
};

export default AppBar;
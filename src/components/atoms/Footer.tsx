
import React from 'react';
import { cn } from '@/lib/cn';

interface FooterProps {
    children: React.ReactNode;
    className?: string;
}

const Footer: React.FC<FooterProps> = ({
    children,
    className
}) => {
    return (
        <footer className={cn("bg-zinc-700 text-white p-4 h-16 z-50 w-full", className)}>
            <div className={cn('container mx-auto')}>
                {children}
            </div>
        </footer>
    );
};

export default Footer;
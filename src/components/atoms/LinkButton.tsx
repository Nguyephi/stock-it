"use client"

import React from 'react';
import { cn } from '@/lib/cn';
import Link from "next/link"
import { Button } from './button';

interface LinkButtonProps {
  label: string;
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href, className = '' }) => {
  return (
    <Button asChild variant="link" className={cn(
      'link',
      className
    )}>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default LinkButton;

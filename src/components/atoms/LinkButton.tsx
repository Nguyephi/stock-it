"use client"

import React from 'react';
import clsx from 'clsx';
import Link from "next/link"
import { Button } from './button';

interface LinkButtonProps {
  label: string;
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href, className = '' }) => {
  return (
    <Button asChild variant="link" className={clsx(
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

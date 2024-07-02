"use client"

import React from 'react';
import clsx from 'clsx';
import Link from "next/link"

interface LinkButtonProps {
  label: string;
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href, className = '' }) => {
  return (
    <Link href={href} className={clsx(
        'link link-hover', 
        className
        )}>
      {label}
    </Link>
  );
};

export default LinkButton;

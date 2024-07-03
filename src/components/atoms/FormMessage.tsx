import clsx from 'clsx';
import React from 'react';

interface FormMessageProps {
  children: React.ReactNode;
  type: 'error' | 'info' | 'success';
}

const FormMessage: React.FC<FormMessageProps> = ({ children, type }) => {
  const messageClass = {
    error: 'text-red-600',
    info: 'text-blue-600',
    success: 'text-green-600',
  }[type];

  return <p className={clsx("text-sm text-left px-1 pt-1", messageClass)}>{children}</p>;
};

export default FormMessage;
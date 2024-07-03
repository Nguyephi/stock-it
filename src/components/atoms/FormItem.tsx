import React from 'react';

interface FormItemProps {
    children: React.ReactNode;
  }

const FormItem: React.FC<FormItemProps>= ({ children }) => {
  return <div className="mb-2">{children}</div>;
};

export default FormItem;
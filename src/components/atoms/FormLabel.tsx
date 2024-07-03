import React from 'react';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ children, htmlFor, ...rest }) => {
  return (
    <label className="label" htmlFor={htmlFor} {...rest}>
      <span className="label-text">{children}</span>
    </label>
  );
};

export default FormLabel;
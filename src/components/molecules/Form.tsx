import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormField from './FormField';
import Button from '../atoms/Button';

interface FormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  fields: {
    id: string;
    label?: string;
    type: string;
    placeholder: string;
  }[];
}

const Form: React.FC<FormProps> = ({ form, onSubmit, fields }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map(field => (
        <FormField
          key={field.id}
          control={form.control}
          name={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
        />
      ))}
      <Button type="submit" className="btn-primary mt-2 w-full">Submit</Button>
    </form>
  );
};

export default Form;
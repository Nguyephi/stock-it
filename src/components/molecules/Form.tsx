import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormField from './FormField';
import Button from '../atoms/Button';
import Alert from '../atoms/Alert';
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

interface FormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isPending?: boolean;
  error?: string | undefined;
  success?: string | undefined;
  fields: {
    id: string;
    label?: string;
    type: string;
    placeholder: string;
  }[];
}

const Form: React.FC<FormProps> = ({ form, onSubmit, isPending = false, fields, success, error }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='mb-2'>
        {fields.map(field => (
          <FormField
            isPending={isPending}
            key={field.id}
            control={form.control}
            name={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <Alert icon={<FaCheckCircle className="h-4 w-4" />} iconPlacement="before" message={success} className='text-green-950 alert-success mt-4' />
      <Alert icon={<FiAlertTriangle className="h-4 w-4" />} iconPlacement="before" message={error} className='text-red-950 alert-error mt-4' />
      <Button disabled={isPending} type="submit" className="btn-primary mt-2 w-full">Submit</Button>
    </form>
  );
};

export default Form;
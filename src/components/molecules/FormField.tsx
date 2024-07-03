import React from 'react';
import { Control, Controller } from 'react-hook-form';
import FormItem from '../atoms/FormItem';
import FormLabel from '../atoms/FormLabel';
import FormControl from '../atoms/FormControl';
import Input from '../atoms/Input';
import FormMessage from '../atoms/FormMessage';

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type: string;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ control, name, label, type, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input id={name} {...field} type={type} placeholder={placeholder} />
            <FormMessage type="error">
                {fieldState.error?.message}
            </FormMessage>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormField;
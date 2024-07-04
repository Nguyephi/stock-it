import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { usePathname } from 'next/navigation';

import FormItem from '../atoms/FormItem';
import FormLabel from '../atoms/FormLabel';
import FormControl from '../atoms/FormControl';
import Input from '../atoms/Input';
import FormMessage from '../atoms/FormMessage';
import LinkButton from '../atoms/LinkButton';

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  isPending?: boolean
}

const FormField: React.FC<FormFieldProps> = ({ control, name, label, type, isPending=false, placeholder }) => {
  const pathName = usePathname();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input disabled={isPending} id={name} {...field} type={type} placeholder={placeholder} />
            {pathName === "/auth/signin" && type === "password" && <LinkButton label="Forgot password?" href="/auth/reset" className='flex w-full text-xs px-1 pt-1' />}
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
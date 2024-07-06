import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { usePathname } from 'next/navigation';

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem
} from '../atoms/form';
import { Button } from '../atoms/button';
import { Alert, AlertDescription } from '../atoms/alert';
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { Input } from '../atoms/input';
import LinkButton from '../atoms/LinkButton';

interface AuthFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isPending?: boolean;
  error?: string | undefined;
  success?: string | undefined;
  buttonLabel?: string;
  fields: {
    id: string;
    label?: string;
    type: string;
    placeholder: string;
  }[];
}

const AuthForm: React.FC<AuthFormProps> = ({ form, onSubmit, isPending = false, fields, success, error, buttonLabel = "Submit" }) => {
  const pathName = usePathname();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-2 space-y-4'>
          {fields.map(fieldData => (
            <FormField
              key={fieldData.id}
              control={form.control}
              name={fieldData.id}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type={fieldData.type} placeholder={fieldData.placeholder} disabled={isPending} />
                  </FormControl>
                  <FormMessage className='px-2' />
                  {pathName === "/auth/signin" &&
                    fieldData.type === "password" &&
                    <LinkButton
                      label="Forgot password?"
                      href="/auth/reset"
                      className='flex w-full justify-start text-xs px-2 mt-0'
                    />}
                </FormItem>
              )}
            />
          ))}
          {error && <Alert variant="destructive">
            <div className='flex items-center space-x-2'>
              <FiAlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>}
          {success && <Alert variant="affirmative">
            <div className='flex items-center space-x-2'>
              <FaCheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </div>
          </Alert>}
        </div>
        <Button disabled={isPending} type="submit" className="mt-4 w-full">{buttonLabel}</Button>
      </form>
    </Form >
  );
};

export default AuthForm;
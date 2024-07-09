import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import { Form, FormControl, FormField, FormItem } from "../atoms/form";
import { Alert, AlertDescription } from "../atoms/alert";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { cn } from "@/lib/cn";
import { InputSchema } from "@/schema";

interface InputWithButtonProps {
  inputType?: string;
  inputPlaceholder: string;
  buttonText: string;
  onSubmit: (value: z.infer<typeof InputSchema>) => Promise<{ error?: string; success?: string } | void>;
  inputClassName?: string;
  buttonClassName?: string;
}

export function InputWithButton({
  inputType = "text",
  inputPlaceholder,
  buttonText,
  onSubmit,
  inputClassName,
  buttonClassName,
}: InputWithButtonProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      input: "",
    }
  })

  const handleSubmit = (values: z.infer<typeof InputSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      onSubmit(values)
      .then((data) => {
        if (!data) return
        const { error, success } = data
        if (error) setError(data.error)
        if (success) setSuccess(data.success)
      })
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full'>
        <div className='mb-2 space-y-4'>
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 space-x-2">
                <FormControl>
                  <Input
                    {...field}
                    type={inputType}
                    placeholder={inputPlaceholder}
                    disabled={isPending}
                    className={cn('h-12 text-md', inputClassName)}
                  />
                </FormControl>
                <Button
                  disabled={isPending}
                  type="submit"
                  className={cn('h-12', buttonClassName)}
                  size="lg"
                >
                  {buttonText}
                </Button>
              </FormItem>
            )}
          />
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
      </form>
    </Form >
  );
}
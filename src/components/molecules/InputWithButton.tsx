import { useEffect, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "../atoms/form";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { cn } from "@/lib/cn";
import { InputSchema } from "@/schema";
import useAlertStore from "@/store/alert-message";

interface InputWithButtonProps {
  inputType?: string;
  inputPlaceholder: string;
  buttonText: string;
  onSubmit?: (value: z.infer<typeof InputSchema>) => Promise<{ error?: string; success?: string } | void>;
  inputClassName?: string;
  buttonClassName?: string;
  provider?: string;
}

export function InputWithButton({
  inputType = "text",
  inputPlaceholder,
  buttonText,
  onSubmit,
  inputClassName,
  buttonClassName,
}: InputWithButtonProps) {
  const { clearMessages } = useAlertStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      input: "",
    }
  })

  const handleSubmit = (values: z.infer<typeof InputSchema>) => {
    clearMessages();
    startTransition(() => {
      onSubmit && onSubmit(values)
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full'>
        <div className='space-y-4'>
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
        </div>
      </form>
    </Form >
  );
}
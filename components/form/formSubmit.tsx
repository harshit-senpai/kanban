"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive"
    | null
    | undefined;
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn(className)}
      variant={variant}
      size="sm"
    >
      {children}
    </Button>
  );
};

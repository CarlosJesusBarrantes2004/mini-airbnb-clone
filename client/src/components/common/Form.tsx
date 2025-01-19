import { UseFormHandleSubmit } from "react-hook-form";

interface FormProps<T> {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (data: T) => void | Promise<void>;
  className?: string;
}

export const Form = <T extends Record<string, any>>({
  children,
  handleSubmit,
  onSubmit,
  className = "",
}: FormProps<T>) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
    >
      {children}
    </form>
  );
};

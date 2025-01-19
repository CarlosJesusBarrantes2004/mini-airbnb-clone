import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "file" | "date";
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  className?: string;
  error?: FieldError;
  validation?: any;
}

export const Input = ({
  label,
  type = "text",
  name,
  register,
  placeholder,
  className = "",
  error,
  validation,
}: InputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff07c1] ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...register(name, validation)}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

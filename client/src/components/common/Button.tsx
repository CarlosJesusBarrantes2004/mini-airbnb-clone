interface ButtonProps {
  name: string;
  className: string;
  type: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  name,
  className,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

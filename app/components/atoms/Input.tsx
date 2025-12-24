"use client";

interface InputProps {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  hasError?: boolean;
  isValid?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  hasError = false,
  isValid = false,
}: InputProps) {
  const borderColor = value.length > 0 ? (isValid ? "border-green-500" : "border-red-500") : "border-gray-300";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-2 p-2 rounded-md w-full ${borderColor} ${className}`}
    />
  );
}


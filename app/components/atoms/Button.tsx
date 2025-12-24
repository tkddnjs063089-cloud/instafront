"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled = false }: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`p-2 rounded-md transition-colors ${variants[variant]} ${className} disabled:cursor-not-allowed`}>
      {children}
    </button>
  );
}

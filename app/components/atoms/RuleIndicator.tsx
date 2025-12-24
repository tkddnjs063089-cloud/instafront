"use client";

interface RuleIndicatorProps {
  label: string;
  isValid: boolean;
}

export default function RuleIndicator({ label, isValid }: RuleIndicatorProps) {
  return (
    <span className={`text-sm ${isValid ? "text-green-500" : "text-gray-400"}`}>
      {isValid ? "✓" : "○"} {label}
    </span>
  );
}


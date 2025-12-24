"use client";
import Input from "../atoms/Input";
import RuleIndicator from "../atoms/RuleIndicator";

interface Rule {
  label: string;
  isValid: boolean;
}

interface ValidatedInputProps {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules: Rule[];
}

export default function ValidatedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  rules,
}: ValidatedInputProps) {
  const allValid = rules.every((rule) => rule.isValid);

  return (
    <div className="w-full">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isValid={allValid}
      />
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {rules.map((rule, index) => (
          <RuleIndicator key={index} label={rule.label} isValid={rule.isValid} />
        ))}
      </div>
    </div>
  );
}


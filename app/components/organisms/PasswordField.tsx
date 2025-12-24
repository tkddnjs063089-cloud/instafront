"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import ValidatedInput from "../molecules/ValidatedInput";

export default function PasswordField() {
  const { password, setPassword, getPasswordRules } = useSignupStore();

  return (
    <ValidatedInput
      type="password"
      placeholder="비밀번호"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      rules={getPasswordRules()}
    />
  );
}


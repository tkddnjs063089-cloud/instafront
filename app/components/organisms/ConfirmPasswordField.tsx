"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import ValidatedInput from "../molecules/ValidatedInput";

export default function ConfirmPasswordField() {
  const { confirmPassword, setConfirmPassword, getConfirmPasswordRules } = useSignupStore();

  return (
    <ValidatedInput
      type="password"
      placeholder="비밀번호 확인"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      rules={getConfirmPasswordRules()}
    />
  );
}


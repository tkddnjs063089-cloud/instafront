"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import ValidatedInput from "../molecules/ValidatedInput";

export default function NicknameField() {
  const { nickname, setNickname, getNicknameRules } = useSignupStore();

  return (
    <ValidatedInput
      type="text"
      placeholder="닉네임"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      rules={getNicknameRules()}
    />
  );
}


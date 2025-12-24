"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/app/store/useSignupStore";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import NicknameField from "./NicknameField";
import ProfileImageField from "./ProfileImageField";
import Button from "../atoms/Button";
import axios from "axios";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { username, password, confirmPassword, nickname, file, getUsernameRules, getPasswordRules, getConfirmPasswordRules, getNicknameRules, reset } = useSignupStore();

  const handleSubmit = async () => {
    // 유효성 검사
    if (!file) return alert("사진을 올려주세요");
    if (!getUsernameRules().every((r) => r.isValid)) {
      return alert("아이디: 4~20자, 영문/숫자 (특수문자 !@#$%^&*_- 선택)");
    }
    if (!getPasswordRules().every((r) => r.isValid)) {
      return alert("비밀번호: 8~20자, 영문+숫자+특수문자를 포함해주세요");
    }
    if (!getConfirmPasswordRules().every((r) => r.isValid)) {
      return alert("비밀번호가 일치하지 않습니다");
    }
    if (!getNicknameRules().every((r) => r.isValid)) {
      return alert("닉네임: 2~10자, 영문 (숫자/특수문자 선택)");
    }

    // 폼 데이터 생성
    const form = new FormData();
    form.append("file", file);
    form.append("username", username);
    form.append("password", password);
    form.append("confirmPassword", confirmPassword);
    form.append("nickname", nickname);

    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, form);
      console.log(res.data);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      reset();
      router.push("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <UsernameField />
      <PasswordField />
      <ConfirmPasswordField />
      <NicknameField />
      <ProfileImageField />

      <Button onClick={handleSubmit} className="w-full mt-2 font-semibold" disabled={isLoading}>
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>
    </div>
  );
}

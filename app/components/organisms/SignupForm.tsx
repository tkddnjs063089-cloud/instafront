"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import NicknameField from "./NicknameField";
import ProfileImageField from "./ProfileImageField";
import Button from "../atoms/Button";
import axios from "axios";

export default function SignupForm() {
  const {
    username,
    password,
    confirmPassword,
    nickname,
    file,
    isAllValid,
    getUsernameRules,
    getPasswordRules,
    getConfirmPasswordRules,
    getNicknameRules,
    reset,
  } = useSignupStore();

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

    try {
      const res = await axios.post("http://localhost:3001/upload", form);
      console.log(res.data);
      alert("회원가입 성공!");
      reset(); // 폼 초기화
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full mx-auto">
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">회원가입</h1>

        <UsernameField />
        <PasswordField />
        <ConfirmPasswordField />
        <NicknameField />
        <ProfileImageField />

        <Button onClick={handleSubmit} className="w-full mt-2">
          회원가입
        </Button>
      </div>
    </section>
  );
}


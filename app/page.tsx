"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./components/atoms/Input";
import Button from "./components/atoms/Button";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("tkddnjs0630");
  const [password, setPassword] = useState("tkddnjs0729!");
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 버튼 클릭
  const handleLogin = async () => {
    if (!username || !password) {
      return alert("아이디와 비밀번호를 입력해주세요");
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        username,
        password,
      });

      // JWT 토큰 저장
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      // 유저 정보 localStorage에 저장
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 프로필 페이지로 이동
      router.push(`/${res.data.user.username}`);
    } catch (error: any) {
      const message = error.response?.data?.message || "아이디나 비밀번호가 잘못 됐습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 버튼 클릭
  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* 로그인 박스 */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
          {/* 로고 */}
          <h1 className="text-4xl font-semibold text-center mb-8 font-serif italic">Instagram</h1>

          {/* 로그인 폼 */}
          <div className="flex flex-col gap-3">
            <Input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} isValid={username.length > 0} />
            <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} isValid={password.length > 0} />

            {/* 버튼들 */}
            <div className="flex flex-col gap-2 mt-2">
              <Button onClick={handleLogin} className="w-full font-semibold" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
              <Button onClick={handleSignup} variant="secondary" className="w-full font-semibold">
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import SignupForm from "../components/organisms/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* 회원가입 박스 */}
        <div className="bg-white border border-gray-300 rounded-sm p-10 mb-3">
          {/* 로고 */}
          <h1 className="text-4xl font-semibold text-center mb-4 font-serif italic">Instagram</h1>
          <p className="text-center text-gray-500 font-semibold mb-6">친구들의 사진과 동영상을 보려면 가입하세요.</p>

          <SignupForm />
        </div>

        {/* 로그인 링크 박스 */}
        <div className="bg-white border border-gray-300 rounded-sm p-5 text-center">
          <p className="text-sm">
            계정이 있으신가요?{" "}
            <Link href="/" className="text-blue-500 font-semibold">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

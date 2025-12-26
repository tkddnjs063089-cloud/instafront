"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

interface User {
  id: string;
  username: string;
  nickname: string;
  profileImage: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 임시 게시물 데이터 (나중에 백엔드에서 가져오기)
  const posts = [
    { id: 1, image: "https://picsum.photos/300/300?random=1" },
    { id: 2, image: "https://picsum.photos/300/300?random=2" },
    { id: 3, image: "https://picsum.photos/300/300?random=3" },
    { id: 4, image: "https://picsum.photos/300/300?random=4" },
    { id: 5, image: "https://picsum.photos/300/300?random=5" },
    { id: 6, image: "https://picsum.photos/300/300?random=6" },
  ];

  // 임시 통계 데이터
  const stats = {
    posts: 6,
    followers: 128,
    following: 95,
  };

  useEffect(() => {
    // 토큰 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
      return;
    }

    // API로 프로필 정보 가져오기
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data);
      } catch (error) {
        // 토큰 만료 또는 유효하지 않음 - api 인터셉터에서 처리
        console.error("프로필 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 (Refresh Token 삭제)
      await api.post("/logout");
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
    } finally {
      // 로컬 스토리지 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-semibold font-serif italic">Instagram</h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
            로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 프로필 섹션 */}
        <section className="flex items-start gap-8 mb-8">
          {/* 프로필 이미지 */}
          <div className="shrink-0">
            <img src={user.profileImage} alt={user.nickname} className="w-32 h-32 rounded-full object-cover border-2 border-gray-200" />
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1">
            {/* 유저네임 */}
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-light">{user.username}</h2>
              <button className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-200">프로필 편집</button>
            </div>

            {/* 통계 */}
            <div className="flex gap-8 mb-4">
              <div>
                <span className="font-semibold">{stats.posts}</span> <span className="text-gray-600">게시물</span>
              </div>
              <div>
                <span className="font-semibold">{stats.followers}</span> <span className="text-gray-600">팔로워</span>
              </div>
              <div>
                <span className="font-semibold">{stats.following}</span> <span className="text-gray-600">팔로잉</span>
              </div>
            </div>

            {/* 닉네임 */}
            <div>
              <p className="font-semibold">{user.nickname}</p>
            </div>
          </div>
        </section>

        {/* 구분선 */}
        <div className="border-t border-gray-300 mb-4"></div>

        {/* 게시물 탭 */}
        <div className="flex justify-center mb-4">
          <button className="flex items-center gap-1 px-4 py-2 border-t-2 border-black text-sm font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
            게시물
          </button>
        </div>

        {/* 게시물 그리드 */}
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={post.image} alt={`게시물 ${post.id}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* 게시물이 없을 때 */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light mb-2">사진 공유</h3>
            <p className="text-gray-500">사진을 공유하면 프로필에 표시됩니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}

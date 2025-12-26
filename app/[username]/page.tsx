"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../lib/api";

interface Stats {
  posts: number;
  followers: number;
  following: number;
}

interface User {
  id: string;
  username: string;
  nickname: string;
  profileImage: string;
  bio?: string;
  stats: Stats;
}

interface PostItem {
  id: string;
  imageUrl: string;
  caption?: string;
  likesCount: number;
  commentsCount: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    // 토큰 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      router.push("/");
      return;
    }

    // API로 프로필 정보와 게시물 가져오기
    const fetchData = async () => {
      try {
        // 현재 로그인한 유저 정보
        const [profileRes, postsRes] = await Promise.all([api.get("/profile"), api.get("/posts")]);

        const currentUser = profileRes.data;
        const userPosts = postsRes.data;

        // URL의 username과 현재 로그인한 유저가 같은지 확인
        if (currentUser.username === username) {
          setUser(currentUser);
          setPosts(userPosts);
          setIsOwnProfile(true);
        } else {
          // 다른 유저 프로필 보기 (나중에 구현)
          setUser(currentUser);
          setPosts(userPosts);
          setIsOwnProfile(false);
        }
      } catch (error) {
        console.error("프로필 로드 실패:", error);
        // API 에러 시 로그인 페이지로 이동
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, username]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">로그인이 필요합니다. 잠시 후 로그인 페이지로 이동합니다...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="bg-black border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent font-serif italic">Instagram</h1>
          <button onClick={handleLogout} className="text-sm text-zinc-400 hover:text-white transition-colors">
            로그아웃
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 프로필 섹션 */}
        <section className="flex items-start gap-8 mb-8">
          {/* 프로필 이미지 */}
          <div className="shrink-0">
            <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
              <div className="p-1 bg-black rounded-full">
                <img src={user.profileImage} alt={user.nickname} className="w-32 h-32 rounded-full object-cover" />
              </div>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1 pt-2">
            {/* 유저네임 & 버튼 */}
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-xl font-normal">{user.nickname}</h2>
              {isOwnProfile ? (
                <button className="px-4 py-1.5 bg-zinc-800 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition-colors">프로필 편집</button>
              ) : (
                <button className="px-6 py-1.5 bg-blue-500 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">팔로우</button>
              )}
            </div>

            {/* 통계 */}
            <div className="flex gap-10 mb-5">
              <div className="text-center">
                <span className="font-semibold">{user.stats.posts}</span>
                <span className="text-zinc-400 ml-1">게시물</span>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70">
                <span className="font-semibold">{user.stats.followers}</span>
                <span className="text-zinc-400 ml-1">팔로워</span>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70">
                <span className="font-semibold">{user.stats.following}</span>
                <span className="text-zinc-400 ml-1">팔로잉</span>
              </div>
            </div>

            {/* 닉네임 & 바이오 */}
            <div>
              <p className="font-semibold">{user.nickname}</p>
              <p className="text-zinc-400 text-sm mt-1">{user.bio || "자기소개를 입력하세요"}</p>
            </div>
          </div>
        </section>

        {/* 스토리 하이라이트 */}
        <section className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <div className="flex flex-col items-center gap-1 min-w-fit">
            <div className="w-16 h-16 rounded-full border-2 border-zinc-700 flex items-center justify-center bg-zinc-900 cursor-pointer hover:border-zinc-500 transition-colors">
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs text-zinc-400">새로 만들기</span>
          </div>
        </section>

        {/* 구분선 & 탭 */}
        <div className="border-t border-zinc-800">
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-4 border-t border-white text-sm font-medium -mt-px">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
              게시물
            </button>
            <button className="flex items-center gap-2 px-4 py-4 text-sm font-medium text-zinc-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              저장됨
            </button>
          </div>
        </div>

        {/* 게시물 그리드 */}
        {posts.length > 0 && (
          <div className="grid grid-cols-3 gap-1 mt-1">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square bg-zinc-900 cursor-pointer relative group overflow-hidden">
                <img src={post.imageUrl} alt={post.caption || "게시물"} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likesCount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                    </svg>
                    <span>{post.commentsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 게시물이 없을 때 */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 border-2 border-white rounded-full flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-light mb-3">사진 공유</h3>
            <p className="text-zinc-500">사진을 공유하면 프로필에 표시됩니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}

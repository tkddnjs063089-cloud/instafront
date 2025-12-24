import { create } from "zustand";

interface SignupState {
  // 상태
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  file: File | null;

  // 액션
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setNickname: (nickname: string) => void;
  setFile: (file: File | null) => void;
  reset: () => void;

  // 유효성 검사 (computed-like)
  getUsernameRules: () => { label: string; isValid: boolean }[];
  getPasswordRules: () => { label: string; isValid: boolean }[];
  getConfirmPasswordRules: () => { label: string; isValid: boolean }[];
  getNicknameRules: () => { label: string; isValid: boolean }[];
  isAllValid: () => boolean;
}

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  nickname: "",
  file: null,
};

export const useSignupStore = create<SignupState>((set, get) => ({
  ...initialState,

  // 액션
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setNickname: (nickname) => set({ nickname }),
  setFile: (file) => set({ file }),
  reset: () => set(initialState),

  // 아이디 규칙
  getUsernameRules: () => {
    const { username } = get();
    return [
      { label: "4~20자", isValid: username.length >= 4 && username.length <= 20 },
      { label: "영문/숫자 (특수문자 선택)", isValid: username.length > 0 && /^[a-zA-Z0-9!@#$%^&*_-]+$/.test(username) },
    ];
  },

  // 비밀번호 규칙
  getPasswordRules: () => {
    const { password } = get();
    return [
      { label: "8~20자", isValid: password.length >= 8 && password.length <= 20 },
      { label: "영문 포함", isValid: /[a-zA-Z]/.test(password) },
      { label: "숫자 포함", isValid: /\d/.test(password) },
      { label: "특수문자(!@#$%^&*)", isValid: /[!@#$%^&*]/.test(password) },
    ];
  },

  // 비밀번호 확인 규칙
  getConfirmPasswordRules: () => {
    const { password, confirmPassword } = get();
    return [{ label: "비밀번호 일치", isValid: password === confirmPassword && confirmPassword !== "" }];
  },

  // 닉네임 규칙
  getNicknameRules: () => {
    const { nickname } = get();
    return [
      { label: "2~10자", isValid: nickname.length >= 2 && nickname.length <= 10 },
      { label: "영문 (숫자/특수문자 선택)", isValid: nickname.length > 0 && /^[a-zA-Z0-9!@#$%^&*_-]+$/.test(nickname) },
    ];
  },

  // 전체 유효성 검사
  isAllValid: () => {
    const { file, getUsernameRules, getPasswordRules, getConfirmPasswordRules, getNicknameRules } = get();
    return (
      !!file &&
      getUsernameRules().every((r) => r.isValid) &&
      getPasswordRules().every((r) => r.isValid) &&
      getConfirmPasswordRules().every((r) => r.isValid) &&
      getNicknameRules().every((r) => r.isValid)
    );
  },
}));

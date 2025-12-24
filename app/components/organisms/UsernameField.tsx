"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import ValidatedInput from "../molecules/ValidatedInput";
import Button from "../atoms/Button";
import axios from "axios";

export default function UsernameField() {
  const { username, setUsername, getUsernameRules } = useSignupStore();
  const rules = getUsernameRules();
  const isValid = rules.every((r) => r.isValid);

  const checkId = async () => {
    if (!username) return alert("아이디를 입력해주세요");
    if (!isValid) return alert("올바른 아이디 형식이 아닙니다");

    try {
      const res = await axios.get(`http://localhost:3001/chackId?username=${username}`);
      if (res.data.success) {
        alert("사용 가능한 아이디입니다.");
      } else {
        alert("이미 존재하는 아이디입니다.");
      }
    } catch (error) {
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-start gap-2">
      <ValidatedInput
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        rules={rules}
      />
      <Button onClick={checkId} className="px-2 py-2 whitespace-nowrap">
        중복 확인
      </Button>
    </div>
  );
}


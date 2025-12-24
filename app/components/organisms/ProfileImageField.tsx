"use client";
import { useSignupStore } from "@/app/store/useSignupStore";
import FileInput from "../molecules/FileInput";

export default function ProfileImageField() {
  const { file, setFile } = useSignupStore();

  return (
    <FileInput
      file={file}
      onChange={(e) => setFile(e.target.files?.[0] || null)}
      placeholder="프로필 사진 선택"
      accept=".jpg,.jpeg"
    />
  );
}


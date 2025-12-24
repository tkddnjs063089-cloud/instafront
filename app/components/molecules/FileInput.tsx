"use client";

interface FileInputProps {
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  accept?: string;
}

export default function FileInput({
  file,
  onChange,
  placeholder = "파일 선택",
  accept = "image/*",
}: FileInputProps) {
  return (
    <label className="border-2 border-gray-300 p-2 rounded-md cursor-pointer text-gray-500 text-center w-full block hover:border-blue-400 transition-colors">
      {file ? file.name : placeholder}
      <input type="file" accept={accept} onChange={onChange} className="hidden" />
    </label>
  );
}


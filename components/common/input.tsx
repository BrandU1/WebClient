interface InputProps {
  type: string;
  color: string;
  height: number;
  width: number;
  value: string;
  onChange: any;
}

function Input({ type, color, height, width, value, onChange }: InputProps) {
  return (
    <input
      className={`bg-transparent text-${color} w-[${width}] h-[${height}] rounded-xl text-sm font-bold border-main  focus:outline-0 px-2`}
      type={type}
      autoComplete="off"
      value={value}
      placeholder="검색어를 입력해주세요"
      onChange={onChange}
    />
  );
}

export default Input;

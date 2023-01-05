import { useState } from "react";

interface ModifyRecommendProps {
  value: string;
}

function ModifyRecommend({ value }: ModifyRecommendProps) {
  const [text, setText] = useState<string>(value);

  return (
    <div className="text-[12px] focus: outline-0">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}

export default ModifyRecommend;

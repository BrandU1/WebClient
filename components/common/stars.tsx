import * as React from "react";
import { useState } from "react";
import StarIcon from "@icons/staricon";

interface StarProps {
  size: number;
  count?: number; //이미 쓴 리뷰의 star 개수
  clickable: boolean;
}
// 리뷰 수정 => starvalue 정해짐 & 수정 가능
// 리뷰 추가 => starvalue 없음 & 수정 가능
// product 리뷰 => starvalue 정해짐 & 수정 불가능 & 총합 필요

function Stars({ count, size, clickable }: StarProps) {
  const [value, setValue] = useState<number>(count != undefined ? count : 0);
  const changeValue = (idx: number) => {
    if (clickable) {
      setValue(idx + 1);
    }
  };
  console.log(value);
  return (
    <div className="flex flex-row space-x-1">
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <div
            onClick={() => {
              changeValue(index);
            }}
          >
            <StarIcon
              color={index + 1 <= value ? "#ECAF49" : "#DBDBDB"}
              size={size}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Stars;

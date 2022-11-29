import * as React from "react";
import { useState } from "react";
import Rating, { RatingProps } from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

interface StarProps {
  size: RatingProps["size"];
  count: number; //이미 쓴 리뷰의 star 개수
}

function Star({ count, size }: StarProps) {
  const [value, setValue] = useState<number>(count > 0 ? count : 0);
  return (
    <div>
      {count == 0 ? (
        <Rating
          name="simple-controlled"
          value={value}
          size={size}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue ?? 0);
          }}
          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
        />
      ) : (
        <Rating
          size={size}
          name="read-only"
          value={value}
          precision={0.5}
          readOnly
          emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
        />
      )}
    </div>
  );
}

export default Star;

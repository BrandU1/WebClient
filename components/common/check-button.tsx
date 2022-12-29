interface CheckProps {
  register?: any;
  title?: string;
  width: number;
  height: number;
  color: string;
}

function CheckButton({ register, width, height, title, color }: CheckProps) {
  return (
    <label className="flex flex-row cursor-pointer">
      <input type="checkbox" className="hidden peer" {...register} />
      <svg
        className="flex justify-center items-center fill-subContent peer-checked:fill-main transition-all duration-300"
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" />
        <path
          d="M5.5 10L8.5 13L14.5 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {title && (
        <span className="flex justify-center items-center text-base text-black peer-checked:text-main">
          {title}
        </span>
      )}
    </label>
  );
}

export default CheckButton;

// 0CABA833

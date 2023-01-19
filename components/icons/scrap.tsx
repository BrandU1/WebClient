interface ScrapProps {
  color: string;
  width: number;
  height: number;
  stroke: string;
}

function ScrapIcon({ color, width, height, stroke }: ScrapProps) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={width} height={height} rx="10" fill={color} />
        <path
          d="M8 10.8C8 9.11984 8 8.27976 8.32698 7.63803C8.6146 7.07354 9.07354 6.6146 9.63803 6.32698C10.2798 6 11.1198 6 12.8 6H17.2C18.8802 6 19.7202 6 20.362 6.32698C20.9265 6.6146 21.3854 7.07354 21.673 7.63803C22 8.27976 22 9.11984 22 10.8V24L15 20L8 24V10.8Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
export default ScrapIcon;

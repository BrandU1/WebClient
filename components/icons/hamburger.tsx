interface HambugerProps {
  onClick: () => void;
  color: string;
}

function HamburgerIcon({ onClick, color }: HambugerProps) {
  return (
    <svg
      onClick={onClick}
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H19M1 1H19M1 13H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HamburgerIcon;

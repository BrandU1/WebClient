import type { ReactNode } from "react";

interface AccordionProps {
  title: string;
  subTitle: string;
  children: ReactNode;
}

const WriteAccordion = ({ title, children, subTitle }: AccordionProps) => {
  return (
    <details className="group cursor-pointer px-5 py-3">
      <summary className="flex flex-row justify-between items-center">
        <h1 className="text-base text-black">
          {title}{" "}
          <span className="text-xs ml-4 text-subContent">{subTitle}</span>
        </h1>
        <svg
          className="group-open:rotate-180 transition-all duration-300"
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5.5L6 0.499999L0.999999 5.5"
            stroke="#767676"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="flex flex-col py-3 space-y-2">{children}</div>
    </details>
  );
};

export default WriteAccordion;

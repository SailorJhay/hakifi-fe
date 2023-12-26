import clsx from "clsx";

interface IconSvg {
    size?: number;
    color?: string;
    className?: string;
    onClick?: (e: any) => void;
    isShowDot?: boolean;
  }


const ChevronDown = ({ size = 16, className, ...props }: IconSvg) => {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(`rotate-180 transition ease-in-out`, className)}
        {...props}
      >
        <g clipPath={`url(#chevron-down)`}>
          <path
            d="M11.333 9.332 8 5.999 4.666 9.332h6.667z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={"chevron-down"}>
            <path
              fill="currentColor"
              transform="rotate(180 8 8)"
              d="M0 0h16v16H0z"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };
export default ChevronDown
import React from "react";

const ArrowForwardIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 10L15.336 10M11.9352 6L15.668 9.29289C16.1107 9.68342 16.1107 10.3166 15.668 10.7071L11.9352 14"
        stroke={props.stroke || "#768394"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.443 9.43724C16.7516 9.74898 16.7516 10.251 16.443 10.5628L12.3686 14.6794C11.8658 15.1874 11 14.8314 11 14.1166L11 5.88336C11 5.16865 11.8658 4.81262 12.3686 5.3206L16.443 9.43724Z"
        fill={props.fill || "#768394"}
      />
    </svg>
  );
};

export default ArrowForwardIcon;

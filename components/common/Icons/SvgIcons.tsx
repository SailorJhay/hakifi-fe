interface IconSvg {
  size?: number;
  color?: string;
  className?: string;
  onClick?: (e: any) => void;
  isShowDot?: boolean;
}

const LinkedInIcon = ({ size = 24, ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#hwgb829cua)">
      <path
        d="M22.228 0H1.772A1.772 1.772 0 0 0 0 1.772v20.456A1.772 1.772 0 0 0 1.772 24h20.456A1.772 1.772 0 0 0 24 22.228V1.772A1.772 1.772 0 0 0 22.228 0zM7.153 20.445H3.545V8.983h3.608v11.462zM5.347 7.395a2.072 2.072 0 1 1 2.083-2.07 2.042 2.042 0 0 1-2.083 2.07zm15.106 13.06h-3.606v-6.262c0-1.846-.785-2.416-1.799-2.416-1.07 0-2.12.806-2.12 2.463v6.215H9.32V8.992h3.47v1.588h.047c.348-.705 1.568-1.91 3.43-1.91 2.013 0 4.188 1.195 4.188 4.695l-.002 7.09z"
        fill="#0A66C2"
      />
    </g>
    <defs>
      <clipPath id="hwgb829cua">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const FaceBookIcon = ({ size = 24, ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#dsz2hva88a)">
      <path
        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
        fill="#1877F2"
      />
      <path
        d="M16.671 15.469 17.203 12h-3.328V9.75c0-.949.465-1.875 1.956-1.875h1.513V4.922s-1.374-.234-2.686-.234c-2.741 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.13 12.13 0 0 0 3.75 0V15.47h2.796z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="dsz2hva88a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const TelegramIcon = ({ size = 24, ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#smfmq1ynoa)">
      <path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill="url(#ys6i1gqlob)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.431 11.872c3.498-1.524 5.831-2.529 6.998-3.014 3.333-1.387 4.025-1.627 4.476-1.635.1-.002.322.023.465.14a.506.506 0 0 1 .171.324c.016.094.036.306.02.473-.18 1.897-.962 6.502-1.36 8.627-.167.9-.499 1.2-.82 1.23-.696.064-1.225-.46-1.9-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.213-.07-.062-.174-.04-.248-.024-.107.024-1.794 1.14-5.062 3.346-.48.329-.913.49-1.302.48-.428-.009-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663z"
        fill="#fff"
      />
    </g>
    <defs>
      <linearGradient
        id="ys6i1gqlob"
        x1="12"
        y1="0"
        x2="12"
        y2="23.822"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2AABEE" />
        <stop offset="1" stopColor="#229ED9" />
      </linearGradient>
      <clipPath id="smfmq1ynoa">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const MediumIcon = ({ size = 24, color = "#fff", ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 11.829c0 3.179-.533 5.758-1.19 5.758-.658 0-1.19-2.578-1.19-5.758s.532-5.759 1.19-5.759c.657 0 1.19 2.578 1.19 5.759zM20.962 11.826c0 3.55-1.515 6.428-3.384 6.428-1.87 0-3.385-2.879-3.385-6.428 0-3.55 1.515-6.428 3.385-6.428 1.869 0 3.384 2.878 3.384 6.428M13.537 11.828c0 3.77-3.03 6.827-6.768 6.827S0 15.598 0 11.828 3.03 5 6.769 5c3.738 0 6.768 3.057 6.768 6.828z"
      fill={color}
    />
  </svg>
);

const TwitterIcon = ({ size = 24, ...props }: IconSvg) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_8258_11486)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14Z"
        fill="black"
      />
      <path
        d="M6.03901 7L12.2164 14.7218L6 21H7.39907L12.8415 15.5034L17.2389 21H22L15.475 12.8438L21.2612 7H19.8621L14.8499 12.0623L10.8001 7H6.03901ZM8.09644 7.96344H10.2837L19.9422 20.0364H17.755L8.09644 7.96344Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_8258_11486">
        <rect width="28" height="28" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DiscordIcon = ({ size = 24, ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#x4v0uj1iia)">
      <path
        d="M20.317 4.157a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.271 18.271 0 0 0-5.487 0 12.644 12.644 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.028C.533 8.833-.32 13.367.099 17.845a.082.082 0 0 0 .031.056 19.905 19.905 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.098 13.098 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.245.198.372.292.044.032.04.1-.006.128-.598.35-1.22.644-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.029zM8.02 15.118c-1.182 0-2.157-1.085-2.157-2.418 0-1.334.956-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.334.955-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
        fill="#5865F2"
      />
    </g>
    <defs>
      <clipPath id="x4v0uj1iia">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const BxsPenIcon = ({ size = 24, color = "#F02C62", ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.656 5.833H6.418c-.701 0-1.327.438-1.566 1.096l-3.134 8.619a.834.834 0 0 0 .194.874l.244.244 5.351-5.351c0-.022-.006-.044-.006-.066a1.25 1.25 0 1 1 1.25 1.25c-.022 0-.044-.005-.065-.006l-5.352 5.351.244.245a.83.83 0 0 0 .874.193l8.619-3.134a1.666 1.666 0 0 0 1.096-1.567v-3.237l1.666-1.665-4.511-4.512-1.666 1.666zM16.616 7.55 12.45 3.385l1.768-1.768 4.166 4.167-1.768 1.768z"
      fill={color}
    />
  </svg>
);

const WalletIcon = ({ size = 24, color = "#F02C62", ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#7bb59om11a)">
      <path
        d="M17.5 15v.833c0 .917-.75 1.667-1.667 1.667H4.167c-.925 0-1.667-.75-1.667-1.667V4.167c0-.917.742-1.667 1.667-1.667h11.666c.917 0 1.667.75 1.667 1.667V5H10c-.925 0-1.667.75-1.667 1.667v6.666C8.333 14.25 9.075 15 10 15h7.5zM10 13.333h8.333V6.667H10v6.666zm3.333-2.083c-.691 0-1.25-.558-1.25-1.25s.559-1.25 1.25-1.25c.692 0 1.25.558 1.25 1.25s-.558 1.25-1.25 1.25z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="7bb59om11a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const BxLinkExternal = ({
  size = 16,
  color = "#808080",
  ...props
}: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m9.037 2 2.195 2.195-4.667 4.667.943.943 4.667-4.667 2.195 2.195V2H9.037z"
      fill={color}
    />
    <path
      d="M13.038 12.667H3.705V3.333h4.667L7.038 2H3.705c-.735 0-1.333.598-1.333 1.333v9.334c0 .735.598 1.333 1.333 1.333h9.333c.736 0 1.334-.598 1.334-1.333V9.333L13.038 8v4.667z"
      fill={color}
    />
  </svg>
);

const InsuranceIcon = ({ size = 12, ...props }: IconSvg) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.708.054.484 2.281a.188.188 0 0 0-.105.168v1.129c0 .118.139.19.253.133l4.072-2.15a.465.465 0 0 1 .425 0l4.073 2.15c.113.061.252-.015.252-.133V2.449a.182.182 0 0 0-.105-.164L5.129.055a.435.435 0 0 0-.42 0zm-2.32 5.702V4.082c0-.119-.14-.191-.253-.134l-1.567.828a.338.338 0 0 0-.19.297V6.16c0 2.102 1.195 4.055 3.152 5.17l-.01.006c.063.038.126.072.193.107l.935.492a.545.545 0 0 0 .317.06.536.536 0 0 0 .21-.062l.935-.492.19-.103-.008-.004c1.958-1.116 3.153-3.07 3.153-5.173V5.075a.338.338 0 0 0-.19-.298l-1.57-.831c-.118-.053-.257.02-.257.137v1.678c0 1.865-.94 3.612-2.518 4.762-1.581-1.152-2.522-2.9-2.522-4.767z"
      fill="url(#y0lx5lacra)"
    />
    <defs>
      <linearGradient
        id="y0lx5lacra"
        x1=".559"
        y1="8.998"
        x2="9.827"
        y2="7.938"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F1F1F1" />
        <stop offset="1" stopColor="#F8F8F8" />
      </linearGradient>
    </defs>
  </svg>
);

const PlusIconCircle = ({ size = 12, ...props }: IconSvg) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="15.9974"
      cy="16.0013"
      r="12.3333"
      stroke="#040045"
      strokeWidth="2"
    />
    <rect
      x="14.6641"
      y="9.33594"
      width="2.66667"
      height="13.3333"
      rx="1.33333"
      fill="#040045"
    />
    <rect
      x="22.6641"
      y="14.668"
      width="2.66667"
      height="13.3333"
      rx="1.33333"
      transform="rotate(90 22.6641 14.668)"
      fill="#040045"
    />
  </svg>
);
const SubtractIconCircle = ({ size = 12, ...props }: IconSvg) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="15.9974"
      cy="16.0013"
      r="12.3333"
      stroke="#6768EE"
      strokeWidth="2"
    />
    <rect
      x="21.9974"
      y="15.3346"
      width="1.33333"
      height="12"
      rx="0.666667"
      transform="rotate(90 21.9974 15.3346)"
      fill="#040045"
      stroke="#6768EE"
      strokeWidth="1.33333"
    />
  </svg>
);

const EmailIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_8258_11494)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14Z"
          fill="#5563F7"
        />
        <path
          d="M9.36793 9.00144C9.0515 9.00005 8.80235 9.01652 8.51435 9.20335C8.28139 9.35447 8.2127 9.87066 8.58858 10.1372L13.274 13.4602C13.4643 13.5952 13.7128 13.6621 13.9606 13.6621C14.2084 13.6621 14.4568 13.5952 14.6471 13.4602L19.3326 10.1372C19.7084 9.87066 19.6397 9.35447 19.4068 9.20335C19.1188 9.01652 18.8695 8.99303 18.5532 9.00144C15.3431 9.08682 12.725 9.01624 9.36793 9.00144ZM20.9284 10.7261L14.9069 14.9997C14.3788 15.3742 13.5284 15.3742 13.0003 14.9997L6.98811 10.7387C6.4242 10.8325 6 11.2805 6 11.8197V17.9021C6 18.51 6.54038 19 7.21079 19H20.7892C21.4596 19 22 18.51 22 17.9021V11.8197C22 11.2541 21.5334 10.7877 20.9284 10.7261Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_8258_11494">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export {
  LinkedInIcon,
  FaceBookIcon,
  TelegramIcon,
  MediumIcon,
  TwitterIcon,
  DiscordIcon,
  BxsPenIcon,
  WalletIcon,
  BxLinkExternal,
  InsuranceIcon,
  PlusIconCircle,
  SubtractIconCircle,
  EmailIcon
};

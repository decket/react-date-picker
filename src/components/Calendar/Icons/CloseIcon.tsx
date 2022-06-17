export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g filter="url(#filter0_d_925_1672)">
      <path d="M15 14L57 56M57 14L15 56" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <filter id="filter0_d_925_1672" x="11" y="10" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_925_1672" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_925_1672" result="shape" />
      </filter>
    </defs>
  </svg>
);
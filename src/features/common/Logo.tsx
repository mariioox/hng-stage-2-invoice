function Logo() {
  return (
    <div className="logo">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="url(#gradient)" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="700"
          fontFamily="League Spartan, sans-serif"
        >
          M
        </text>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#7c5cfa" />
            <stop offset="100%" stopColor="#5a42cc" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Logo;

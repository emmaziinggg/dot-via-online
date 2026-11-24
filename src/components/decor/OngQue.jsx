// Ống quẻ: ống tre có hoa văn, que thẻ cắm phía trên.
export default function OngQue({ className = "", label }) {
  const sticks = [
    [56, "#D7263D", -8], [66, "#F7931E", -3], [76, "#E6007E", 2], [86, "#D7263D", 6],
    [96, "#12A150", 10], [71, "#6A3D9A", -1], [91, "#F7931E", 4],
  ];
  return (
    <svg viewBox="0 0 160 240" className={className} role="img" aria-label={label}>
      {sticks.map(([x, tip, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${x} 90)`}>
          <rect x={x - 3} y="10" width="6" height="90" rx="2" fill="#F5D99A" stroke="#C9A25A" strokeWidth="1" />
          <rect x={x - 3} y="10" width="6" height="12" rx="2" fill={tip} />
        </g>
      ))}
      {/* thân ống */}
      <path d="M36 70 L124 70 L118 222 Q80 236 42 222 Z" fill="#D7263D" />
      <ellipse cx="80" cy="70" rx="44" ry="10" fill="#6A3D9A" />
      <ellipse cx="80" cy="70" rx="36" ry="6" fill="#2B1B3D" opacity="0.55" />
      <path d="M38 96 L122 96 L121 112 L39 112 Z" fill="#FFD23F" />
      <path d="M41 190 L119 190 L118 204 L42 204 Z" fill="#12A150" />
      <g transform="translate(80 150)">
        <circle r="22" fill="#F5F0E6" />
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-12" rx="4" ry="8" fill="#E6007E" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="6" fill="#F7931E" />
      </g>
      <path d="M46 100 L114 100" stroke="#D7263D" strokeWidth="3" strokeDasharray="5 5" />
    </svg>
  );
}

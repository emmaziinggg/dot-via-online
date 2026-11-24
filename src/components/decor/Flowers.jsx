// Các bông hoa dùng chung: hoa cúc, hoa sen, mây cuộn. Thuần trang trí.

export function Cuc({ x = 0, y = 0, r = 1, petal = "#E6007E", core = "#FFD23F", ring = "#F7931E" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r})`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="0" cy="-11" rx="3.6" ry="9" fill={petal} transform={`rotate(${i * 30})`} />
      ))}
      <circle r="7" fill={ring} />
      <circle r="4" fill={core} />
      <circle r="1.6" fill={petal} />
    </g>
  );
}

export function Sen({ x = 0, y = 0, r = 1, outer = "#E6007E", inner = "#F7931E", leaf = "#12A150" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r})`}>
      <path d="M-22 6 Q-30 -6 -16 -10 Q-8 0 0 8 Z" fill={leaf} />
      <path d="M22 6 Q30 -6 16 -10 Q8 0 0 8 Z" fill={leaf} />
      <path d="M0 8 Q-18 -2 -12 -20 Q-2 -12 0 8 Z" fill={outer} />
      <path d="M0 8 Q18 -2 12 -20 Q2 -12 0 8 Z" fill={outer} />
      <path d="M0 8 Q-8 -14 0 -26 Q8 -14 0 8 Z" fill={inner} />
      <circle cx="0" cy="-2" r="2" fill="#FFD23F" />
    </g>
  );
}

export function May({ x = 0, y = 0, r = 1, color = "#29A8E0" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r})`} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round">
      <path d="M-26 6 Q-28 -8 -14 -8 Q-12 -20 2 -16 Q10 -26 20 -14 Q32 -12 28 2" />
      <path d="M-14 -8 Q-6 -8 -8 0 Q-12 4 -15 -1" />
      <path d="M20 -14 Q14 -6 20 -2 Q25 0 25 -6" />
      <path d="M-30 8 L30 8" />
    </g>
  );
}

export function La({ x = 0, y = 0, rot = 0, color = "#12A150" }) {
  return (
    <path
      d="M0 0 Q8 -10 20 -4 Q10 6 0 0 Z"
      fill={color}
      transform={`translate(${x} ${y}) rotate(${rot})`}
    />
  );
}

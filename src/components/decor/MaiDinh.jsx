import { Cuc, Sen } from "./Flowers.jsx";

// Mái đình cong có đầu đao, xếp nhiều sọc màu như bản in riso.
export default function MaiDinh({ className = "" }) {
  const ridge = "M-40 250 Q300 170 560 70 Q820 170 1240 250";
  return (
    <svg viewBox="0 0 1200 320" className={className} aria-hidden="true" preserveAspectRatio="xMidYMin slice">
      {/* nền ngà dưới mái để che hoa văn */}
      <path d="M-40 262 Q300 182 560 82 Q820 182 1240 262 L1240 340 L-40 340 Z" fill="#F5F0E6" />
      <g className="riso-shift">
        <path d={ridge} fill="none" stroke="#6A3D9A" strokeWidth="26" />
        <path d={ridge} fill="none" stroke="#E6007E" strokeWidth="14" transform="translate(0 18)" />
        <path d={ridge} fill="none" stroke="#12A150" strokeWidth="12" transform="translate(0 32)" />
        <path d={ridge} fill="none" stroke="#F7931E" strokeWidth="6" transform="translate(0 42)" />
        <path d={ridge} fill="none" stroke="#D7263D" strokeWidth="7" strokeDasharray="1 12" strokeLinecap="round" transform="translate(0 -16)" />
        {/* dải trang trí dưới mái */}
        <path d={ridge} fill="none" stroke="#FFD23F" strokeWidth="18" transform="translate(0 58)" />
        <path d={ridge} fill="none" stroke="#29A8E0" strokeWidth="4" strokeDasharray="14 8" transform="translate(0 58)" />
        {/* đầu đao cong vút hai bên */}
        <path d="M80 222 Q30 220 18 178 Q42 196 70 192 Q60 176 66 160 Q88 196 120 206 Z" fill="#12A150" />
        <path d="M1120 222 Q1170 220 1182 178 Q1158 196 1130 192 Q1140 176 1134 160 Q1112 196 1080 206 Z" fill="#12A150" />
        <path d="M60 196 q-14 -6 -10 -22" fill="none" stroke="#E6007E" strokeWidth="5" strokeLinecap="round" />
        <path d="M1140 196 q14 -6 10 -22" fill="none" stroke="#E6007E" strokeWidth="5" strokeLinecap="round" />
        {/* bờ nóc + hồ lô trên đỉnh */}
        <path d="M520 78 Q560 40 600 78" fill="#D7263D" />
        <circle cx="560" cy="40" r="11" fill="#FFD23F" />
        <circle cx="560" cy="22" r="7" fill="#F7931E" />
        {/* bông hoa giữa hồi */}
        <Sen x={560} y={150} r={1.6} />
        <Cuc x={470} y={150} r={0.7} petal="#29A8E0" />
        <Cuc x={650} y={150} r={0.7} petal="#29A8E0" />
      </g>
    </svg>
  );
}

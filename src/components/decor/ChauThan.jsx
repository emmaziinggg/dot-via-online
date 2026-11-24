import { motion } from "framer-motion";
import { Flame } from "./Fire.jsx";

// Chậu than hồng
export default function ChauThan({ className = "" }) {
  const coals = [
    [40, 34, "#D7263D"], [62, 30, "#F7931E"], [84, 33, "#E6007E"], [106, 30, "#D7263D"],
    [128, 34, "#F7931E"], [52, 40, "#F7931E"], [74, 41, "#D7263D"], [96, 40, "#FFD23F"], [118, 41, "#D7263D"],
  ];
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute inset-x-[18%] -top-[46%] flex justify-around">
        <Flame className="h-16 w-10" />
        <Flame className="h-20 w-12" delay={0.3} />
        <Flame className="h-14 w-9" delay={0.15} />
      </div>
      <svg viewBox="0 0 170 90" className="relative w-full">
        {coals.map(([x, y, c], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="11"
            fill={c}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ duration: 1 + (i % 3) * 0.4, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        {/* thân chậu */}
        <path d="M14 38 L156 38 Q150 78 120 84 L50 84 Q20 78 14 38 Z" fill="#6A3D9A" />
        <path d="M14 38 L156 38 L154 48 L16 48 Z" fill="#E6007E" />
        <path d="M24 60 L146 60" stroke="#FFD23F" strokeWidth="4" strokeDasharray="10 7" />
        <path d="M44 84 L38 90 L58 90 Z M126 84 L132 90 L112 90 Z" fill="#6A3D9A" />
      </svg>
    </div>
  );
}

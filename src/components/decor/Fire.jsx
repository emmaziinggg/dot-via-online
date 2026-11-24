import { motion } from "framer-motion";

// Ngọn lửa 3 lớp màu, lập loè
export function Flame({ className = "", delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 40 60"
      className={className}
      aria-hidden="true"
      style={{ originY: 1 }}
      animate={{ scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.94, 1.05, 0.97, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path d="M20 2 C26 16 38 22 36 40 C35 52 27 58 20 58 C13 58 5 52 4 40 C3 28 12 22 14 10 C17 18 18 20 20 2 Z" fill="#D7263D" />
      <path d="M20 16 C24 26 31 32 30 43 C29 51 25 55 20 55 C15 55 11 51 10 43 C10 35 16 31 17 24 C19 30 19 30 20 16 Z" fill="#F7931E" />
      <path d="M20 32 C22 38 25 41 25 47 C25 51 23 53 20 53 C17 53 15 51 15 47 C15 42 18 40 20 32 Z" fill="#FFD23F" />
    </motion.svg>
  );
}

// Tàn giấy bay lên
export function Embers({ count = 10, active = true }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const left = 8 + ((i * 37) % 84);
        const colors = ["#F7931E", "#FFD23F", "#D7263D", "#E6007E"];
        return (
          <motion.span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-[1px]"
            style={{ left: `${left}%`, bottom: 0, background: colors[i % 4] }}
            animate={{ y: [0, -140 - (i % 5) * 30], x: [0, (i % 2 ? 1 : -1) * (10 + (i % 3) * 8)], opacity: [0, 1, 0], rotate: [0, 180] }}
            transition={{ duration: 1.8 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.22, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// Khói cuộn kiểu mây
export function Smoke({ className = "", style }) {
  return (
    <motion.svg
      viewBox="0 0 120 60"
      className={className}
      style={style}
      aria-hidden="true"
      animate={{ y: [0, -24], opacity: [0, 0.7, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
    >
      <path d="M10 50 Q6 34 22 32 Q24 16 42 20 Q52 6 68 18 Q86 12 90 30 Q110 30 108 48 Z" fill="#6A3D9A" opacity="0.25" />
      <path d="M40 34 q-8 -2 -6 -10 q6 -4 10 2" fill="none" stroke="#6A3D9A" strokeWidth="2.5" opacity="0.5" />
    </motion.svg>
  );
}

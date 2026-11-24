import { motion } from "framer-motion";

// Nhân vật phẳng tí hon kiểu đám rước. Dùng ở mở đầu và chặng 3.
export function Figure({ shirt = "#E6007E", pants = "#12A150", hat = "#29A8E0", skin = "#F2A97A", prop = null, flip = false }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      {/* chân */}
      <rect x="-6" y="18" width="5" height="20" rx="2" fill={pants} transform="rotate(8 -4 18)" />
      <rect x="1" y="18" width="5" height="20" rx="2" fill={pants} transform="rotate(-10 3 18)" />
      {/* thân */}
      <path d="M-9 -2 Q0 -6 9 -2 L8 20 L-8 20 Z" fill={shirt} />
      <rect x="-8" y="12" width="16" height="3" fill="#FFD23F" />
      {/* tay */}
      <rect x="7" y="-1" width="4" height="16" rx="2" fill={skin} transform="rotate(-35 9 0)" />
      <rect x="-11" y="-1" width="4" height="15" rx="2" fill={skin} transform="rotate(20 -9 0)" />
      {/* đầu + khăn */}
      <circle cx="0" cy="-10" r="7" fill={skin} />
      <path d="M-8 -12 Q0 -22 8 -12 Z" fill={hat} />
      {prop === "flag" && (
        <g transform="translate(14 -30)">
          <rect x="-1" y="0" width="2.4" height="52" fill="#6A3D9A" />
          <motion.path
            d="M1 2 L22 10 L1 26 Z"
            fill="#D7263D"
            style={{ originX: 0, originY: 0.5 }}
            animate={{ skewY: [0, 8, 0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M4 9 L14 12 L4 19 Z" fill="#FFD23F" />
        </g>
      )}
      {prop === "lantern" && (
        <g transform="translate(14 -34)">
          <rect x="-1" y="0" width="2.4" height="52" fill="#6A3D9A" />
          <rect x="-10" y="-14" width="22" height="16" rx="5" fill="#D7263D" />
          <rect x="-10" y="-8" width="22" height="3" fill="#FFD23F" />
        </g>
      )}
    </g>
  );
}

const CREW = [
  { shirt: "#29A8E0", pants: "#E6007E", hat: "#12A150", prop: "lantern" },
  { shirt: "#12A150", pants: "#29A8E0", hat: "#E6007E" },
  { shirt: "#F7931E", pants: "#6A3D9A", hat: "#29A8E0" },
  { shirt: "#E6007E", pants: "#12A150", hat: "#FFD23F", prop: "flag" },
  { shirt: "#6A3D9A", pants: "#F7931E", hat: "#E6007E" },
  { shirt: "#29A8E0", pants: "#D7263D", hat: "#12A150" },
  { shirt: "#12A150", pants: "#E6007E", hat: "#F7931E" },
  { shirt: "#D7263D", pants: "#29A8E0", hat: "#12A150", prop: "flag" },
  { shirt: "#F7931E", pants: "#12A150", hat: "#6A3D9A" },
  { shirt: "#E6007E", pants: "#6A3D9A", hat: "#29A8E0" },
  { shirt: "#29A8E0", pants: "#F7931E", hat: "#E6007E", prop: "lantern" },
];

// Đám rước tí hon nhún nhảy
export default function DamRuoc({ className = "" }) {
  return (
    <svg viewBox="0 0 560 110" className={className} aria-hidden="true">
      {CREW.map((c, i) => (
        <motion.g
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: (i % 4) * 0.18, ease: "easeInOut" }}
        >
          <g transform={`translate(${30 + i * 48} ${62 + (i % 2) * 6})`}>
            <Figure {...c} />
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

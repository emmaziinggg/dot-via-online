import { motion } from "framer-motion";
import { Cuc, Sen, May, La } from "./Flowers.jsx";

// Một ô hoa văn 240x200, lặp lại để phủ kín mảng trên.
function Tile({ dx = 0 }) {
  return (
    <g transform={`translate(${dx} 0)`}>
      <May x={40} y={40} r={0.9} />
      <Cuc x={120} y={46} r={1.1} />
      <La x={150} y={60} rot={20} />
      <La x={92} y={30} rot={200} />
      <Sen x={200} y={70} r={0.9} />
      <Cuc x={36} y={120} r={0.75} petal="#29A8E0" core="#F5F0E6" ring="#E6007E" />
      <Sen x={110} y={140} r={1} outer="#6A3D9A" inner="#E6007E" />
      <May x={190} y={150} r={0.8} color="#E6007E" />
      <Cuc x={170} y={110} r={0.55} petal="#F7931E" core="#12A150" ring="#FFD23F" />
      <Cuc x={70} y={180} r={0.6} petal="#12A150" core="#FFD23F" ring="#F5F0E6" />
      <La x={20} y={80} rot={-30} color="#29A8E0" />
      <La x={230} y={180} rot={140} />
      <circle cx="80" cy="88" r="3" fill="#D7263D" />
      <circle cx="226" cy="22" r="3" fill="#FFD23F" />
      <circle cx="150" cy="190" r="3" fill="#E6007E" />
    </g>
  );
}

/**
 * Mảng hoa văn dày đặc (hoa cúc, sen, mây) trên nền halftone xanh lam.
 * Trôi chậm sang ngang, in 2 lớp lệch nhau cho giống riso.
 */
export default function HoaVan({ className = "" }) {
  const tiles = Array.from({ length: 10 }).map((_, i) => i * 240);
  return (
    <div className={`overflow-hidden halftone-lam ${className}`} aria-hidden="true">
      <motion.div
        className="absolute inset-y-0 left-0 w-[2400px]"
        animate={{ x: [0, -240] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg width="2400" height="100%" viewBox="0 0 2400 400" preserveAspectRatio="xMinYMin slice" className="h-full">
          {/* lớp lệch màu phía sau */}
          <g opacity="0.35" transform="translate(3 2)">
            {tiles.map((dx) => (
              <g key={`s${dx}`}>
                <Tile dx={dx} />
                <g transform="translate(120 200)"><Tile dx={dx} /></g>
              </g>
            ))}
          </g>
          {tiles.map((dx) => (
            <g key={dx}>
              <Tile dx={dx} />
              <g transform="translate(120 200)"><Tile dx={dx} /></g>
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

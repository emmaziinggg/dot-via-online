import { motion } from "framer-motion";
import content from "../content.js";
import HoaVan from "./decor/HoaVan.jsx";
import MaiDinh from "./decor/MaiDinh.jsx";
import DamRuoc from "./decor/Figure.jsx";

const T = content.hero;

// Màn hình mở đầu
export default function Hero({ onStart, stepsRef }) {
  return (
    <header className="relative">
      <div className="relative h-[26vh] min-h-[190px] overflow-hidden md:h-[46vh]">
        <HoaVan className="absolute inset-0" />
        <MaiDinh className="absolute -bottom-px left-1/2 w-[160%] -translate-x-1/2 md:w-[115%]" />
      </div>

      <div className="relative mx-auto -mt-6 max-w-3xl px-5 pb-8 pt-0 text-center md:mt-0 md:pt-2">
        <p className="eyebrow text-sen">{T.tag}</p>
        {/* 2 vế headline, mỗi vế 1 dòng; chữ co theo màn hình để không bị xuống dòng */}
        <h1 className="riso-text mt-3 font-display text-[clamp(1.6rem,8.2vw,4rem)] leading-[1.12] text-son">
          {T.headline.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h1>
        {/* khổ thơ: mỗi dòng 1 hàng */}
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.55] md:text-base">
          {T.sub.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="mx-auto mt-4 max-w-md text-[13px] italic leading-relaxed text-tim">{T.subExtra}</p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onStart} className="btn-chunky bg-sen text-giay">
            {T.ctaPrimary}
          </button>
          <button
            type="button"
            onClick={() => stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="btn-ghost"
          >
            {T.ctaSecondary}
          </button>
        </div>

        <DamRuoc className="mx-auto mt-6 w-full max-w-xl" />

        <ol ref={stepsRef} className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {T.steps.map((s, i) => (
            <li
              key={s.num}
              className="flex items-start gap-3 border-t-2 border-dashed border-tim/40 pt-3 sm:block"
            >
              <span
                className={`font-display text-2xl ${["text-lam", "text-sen", "text-ma"][i % 3]}`}
              >
                {s.num}
              </span>
              <span className="text-sm leading-snug sm:mt-1 sm:block">{s.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-tim">{T.duration}</p>

        <motion.p
          className="eyebrow mt-6 text-lam"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          {T.scrollHint}
        </motion.p>
      </div>
    </header>
  );
}

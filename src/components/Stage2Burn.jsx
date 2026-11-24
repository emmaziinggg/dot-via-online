import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import content from "../content.js";
import { useStageScroll } from "../hooks/useStageScroll.js";
import { useIdle } from "../hooks/useIdle.js";
import { useIsTouch } from "../hooks/useIsTouch.js";
import { Flame, Embers, Smoke } from "./decor/Fire.jsx";

const T = content.stage2;

// Cỡ chữ trên giấy theo độ dài câu xui, để tờ giấy luôn gọn
function sizeFor(len) {
  if (len < 40) return "text-2xl md:text-3xl";
  if (len < 80) return "text-xl md:text-2xl";
  return "text-lg md:text-xl";
}

// Đường cắt tờ giấy: giữ phần bên trái, mép cháy là đường dọc lởm chởm ở vị trí `edge` (%)
function burnClip(edge) {
  const jag = [0, 2.2, -1.6, 2.6, -2, 1.8, -2.4, 1.4, 0];
  const pts = ["0 0"];
  jag.forEach((d, i) => {
    const x = Math.max(0, Math.min(100, edge + d));
    pts.push(`${x}% ${(i / (jag.length - 1)) * 100}%`);
  });
  pts.push("0 100%");
  return `polygon(${pts.join(", ")})`;
}

// Chặng 2: cuộn chuột / vuốt để đốt tờ giấy, lửa ăn từ phải sang trái
export default function Stage2Burn({ wish, onDone }) {
  const reduce = useReducedMotion();
  const isTouch = useIsTouch();
  const [burn, setBurn] = useState(0); // 0..1, chỉ tăng không giảm
  const [warnBack, setWarnBack] = useState(false);
  const maxRef = useRef(0);
  const doneRef = useRef(false);
  const warnTimer = useRef();

  const ref = useStageScroll((v, backward) => {
    if (doneRef.current) return;
    if (backward && maxRef.current > 0.02) {
      setWarnBack(true);
      clearTimeout(warnTimer.current);
      warnTimer.current = setTimeout(() => setWarnBack(false), 2000);
    }
    // phần đầu section là đoạn "lấy đà", lửa bén từ ~5% cuộn
    const p = Math.min(1, Math.max(0, (v - 0.05) / 0.88));
    if (p > maxRef.current) {
      maxRef.current = p >= 0.995 ? 1 : p;
      setBurn(Math.round(maxRef.current * 100) / 100);
      if (maxRef.current === 1) {
        doneRef.current = true;
        setWarnBack(false);
        onDone();
      }
    }
  });

  const done = burn >= 1;
  const idle = useIdle(!done, T.idle.afterSeconds);
  const pct = Math.round(burn * 100);
  const status = burn > 0 ? T.progress.find((p) => p.upTo >= pct)?.text : null;
  const edge = (1 - burn) * 100; // vị trí mép cháy tính từ trái sang (%)
  const clip = burnClip(edge);
  const instruction = isTouch ? T.instruction.mobile : T.instruction.desktop;

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label={instruction}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
        <p className="max-w-md text-center font-display text-lg leading-snug text-tim md:text-2xl">{instruction}</p>

        {/* TỜ GIẤY nằm ngang */}
        <div className="relative mt-10 w-[min(88vw,520px)] md:mt-16">
          {!done && (
            <div className="relative">
              {/* bóng in lệch màu, bị cắt cùng tờ giấy */}
              <div
                className="absolute inset-0 translate-x-[6px] translate-y-[7px] rounded-[4px] bg-tim/85"
                style={{ clipPath: clip }}
                aria-hidden="true"
              />
              <div
                role="img"
                aria-label={content.extra.paperAria}
                className="relative flex min-h-[140px] items-center justify-center rounded-[4px] bg-[#FFFDF7] px-6 py-6 md:aspect-[16/9] md:min-h-0 md:px-10"
                style={{ clipPath: clip }}
              >
                <p className={`break-words text-center font-body font-medium leading-snug text-muc ${sizeFor(wish.length)}`}>
                  {wish}
                </p>
              </div>

              {/* mép cháy + lửa chạy dọc theo mép, từ phải sang trái */}
              {burn > 0 && (
                <div
                  className="pointer-events-none absolute inset-y-0 w-0"
                  style={{ left: `${edge}%` }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-y-1 -left-1.5 w-3 rounded-full bg-[#5A2A1A] opacity-80 blur-[1.5px]" />
                  <Flame className="absolute -left-5 top-[-18%] h-14 w-10" />
                  <Flame className="absolute -left-4 top-[22%] h-12 w-8" delay={0.25} />
                  <Flame className="absolute -left-5 top-[58%] h-14 w-10" delay={0.1} />
                  <div className="absolute -left-10 bottom-0 h-full w-20">
                    <Embers active={!reduce} count={7} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* khói + đống tro */}
          {burn > 0.15 && !done && !reduce && (
            <Smoke className="pointer-events-none absolute -top-16 w-36" style={{ left: `calc(${edge}% - 72px)` }} />
          )}
          {done && (
            <div className="flex min-h-[140px] items-center justify-center md:aspect-[16/9]" aria-hidden="true">
              {!reduce && <Smoke className="w-48" />}
            </div>
          )}
          <div
            className="mx-auto mt-3 h-3 rounded-[50%] bg-[#6A5A55]"
            style={{ width: `${10 + burn * 70}%`, opacity: 0.12 + burn * 0.5 }}
            aria-hidden="true"
          />
        </div>

        {/* thanh tiến độ */}
        <div className="mt-6 h-2 w-[min(88vw,520px)] overflow-hidden rounded-full bg-muc/10" aria-hidden="true">
          <div className="ml-auto h-full bg-cam" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-4 min-h-[3.5rem] text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={warnBack ? "back" : idle && !done ? "idle" : status || "none"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`font-display text-lg ${warnBack ? "text-son" : done ? "text-ma" : "text-tim"}`}
            >
              {warnBack ? T.scrollBack : idle && !done ? T.idle.text : status}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="absolute bottom-5 max-w-xs text-center text-[11px] text-muc/60">{T.reassure}</p>
      </div>
    </section>
  );
}

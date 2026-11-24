import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import content, { fill } from "../content.js";
import ChauThan from "./decor/ChauThan.jsx";
import { Figure } from "./decor/Figure.jsx";

const T = content.stage3;


// Chặng 3: gõ vào chậu than, mỗi lần gõ là bước qua 1 nhịp
export default function Stage3Coals({ total, onStepsDone, onNext }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const done = current >= total;

  // Đo bề ngang khung để nhân vật luôn đáp ngoài mép chậu, không tràn màn hình
  const boxRef = useRef(null);
  const [boxW, setBoxW] = useState(360);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setBoxW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const land = Math.min(boxW / 2 - 40, boxW * 0.23 + 48);
  // chưa bước thì đứng bên trái; nhịp lẻ đáp bên phải chậu, nhịp chẵn đáp bên trái
  const posOf = (n) => (n === 0 ? -land : n % 2 === 1 ? land : -land);

  const step = () => {
    if (done) return;
    const next = current + 1;
    setCurrent(next);
    if (next === total) onStepsDone();
  };

  const facingLeft = current > 0 && current % 2 === 0;

  return (
    <section
      className="relative flex flex-col items-center justify-center px-5 py-10"
      aria-labelledby="stage3-h"
    >
      <h2 id="stage3-h" className="riso-text max-w-xl text-center font-display text-3xl leading-tight text-tim md:text-5xl">
        {T.headline}
      </h2>
      <p className="mt-3 max-w-md text-center text-sm">{T.instruction}</p>

      <div ref={boxRef} className="relative mt-14 h-[200px] w-[min(92vw,440px)] md:mt-16">
        {/* Chậu than là nút bấm: gõ 1 lần = 1 nhịp */}
        {/* lớp bọc lo việc căn giữa, vì Framer ghi đè transform của nút khi bấm */}
        <div className="absolute bottom-0 left-1/2 w-[46%] -translate-x-1/2">
        <motion.button
          type="button"
          onClick={step}
          disabled={done}
          aria-label={content.extra.coalsAria}
          className="relative block w-full cursor-pointer rounded-[28px] disabled:cursor-default"
          whileTap={reduce || done ? undefined : { scale: 0.94 }}
        >
          <motion.div
            key={current}
            initial={reduce || current === 0 ? false : { y: 0, scale: 1 }}
            animate={reduce || current === 0 ? undefined : { y: [0, 6, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 0.35 }}
          >
            <ChauThan className="w-full" />
          </motion.div>
          {/* vòng sáng gợi ý gõ vào, tắt khi xong */}
          {!done && !reduce && (
            <motion.span
              className="pointer-events-none absolute inset-x-2 -bottom-2 h-5 rounded-[50%] bg-cam/40"
              animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.9, 1.05, 0.9] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              aria-hidden="true"
            />
          )}
        </motion.button>
        </div>

        {/* Nhân vật nhảy vòng cung qua chậu than */}
        <motion.svg
          key={`fig-${current}`}
          viewBox="-30 -50 60 100"
          className="pointer-events-none absolute bottom-4 left-1/2 -ml-10 h-36 w-20"
          initial={reduce ? false : { x: posOf(Math.max(0, current - 1)), y: 0 }}
          animate={
            current === 0 || reduce
              ? { x: posOf(current), y: 0 }
              : { x: posOf(current), y: [0, -120, 0] }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <Figure shirt="#29A8E0" pants="#E6007E" hat="#12A150" flip={facingLeft} />
        </motion.svg>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full border-2 border-muc transition-colors ${i < current ? "bg-cam" : "bg-transparent"}`}
          />
        ))}
      </div>
      <p className="mt-3 font-display text-2xl text-son" aria-live="polite">
        {fill(T.counter, { current, total })}
      </p>

      <div className="mt-4 min-h-[7rem] text-center">
        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="mx-auto max-w-sm text-[15px] font-medium text-ma">{T.done}</p>
              <button type="button" onClick={onNext} className="btn-chunky mt-4 bg-ma text-giay">
                {T.cta}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

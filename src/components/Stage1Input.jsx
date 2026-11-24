import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import content, { fill } from "../content.js";
import { Cuc } from "./decor/Flowers.jsx";

const T = content.stage1;

// Chặng 1: viết điều xui + chọn vía
export default function Stage1Input({ wish, setWish, via, setVia, onIgnite, locked }) {
  const id = useId();
  const reduce = useReducedMotion();
  const [phIndex, setPhIndex] = useState(0);
  const [error, setError] = useState("");

  // Placeholder xoay vòng, dừng khi đã gõ chữ
  useEffect(() => {
    if (wish) return undefined;
    const t = setInterval(() => setPhIndex((i) => (i + 1) % T.placeholders.length), 3000);
    return () => clearInterval(t);
  }, [wish]);

  const submit = (e) => {
    e.preventDefault();
    const text = wish.trim();
    let err = "";
    if (!text) err = T.errors.empty;
    else if (text.length < T.minLength) err = T.errors.tooShort;
    else if (text.length > T.maxLength) err = T.errors.tooLong;
    else if (!via) err = T.errors.noVia;
    setError(err);
    if (!err) onIgnite();
  };

  const remaining = T.maxLength - wish.length;

  return (
    <section className="relative mx-auto max-w-2xl px-5 py-10 md:py-16">
      <div className="pointer-events-none absolute right-2 top-6 opacity-80" aria-hidden="true">
        <svg viewBox="-30 -30 60 60" className="h-16 w-16 riso-shift">
          <Cuc r={1.6} petal="#F7931E" ring="#E6007E" />
        </svg>
      </div>

      <p className="eyebrow text-tim">{T.tag}</p>
      <h2 className="riso-text mt-3 font-display text-4xl leading-tight text-sen md:text-6xl">{T.headline}</h2>
      <p className="mt-3 text-[15px] leading-relaxed">{T.sub}</p>

      <form onSubmit={submit} noValidate className={`mt-6 space-y-6 ${locked ? "opacity-60" : ""}`}>
        <fieldset disabled={locked} className="space-y-6">
        <div>
          <label htmlFor={`${id}-wish`} className="eyebrow text-tim">
            {T.inputLabel}
          </label>
          <div className="relative mt-2">
            <textarea
              id={`${id}-wish`}
              value={wish}
              maxLength={T.maxLength}
              rows={3}
              onChange={(e) => {
                setWish(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={Boolean(error) && error !== T.errors.noVia}
              aria-describedby={`${id}-help ${id}-err`}
              className="w-full resize-none rounded-[14px] border-2 border-muc bg-[#FFFDF7] px-4 py-3 text-lg leading-snug shadow-[4px_5px_0_#29A8E0] outline-none placeholder:text-transparent focus:border-sen"
              autoComplete="off"
              spellCheck={false}
            />
            {/* placeholder xoay vòng tự vẽ để có hiệu ứng mờ dần */}
            {!wish && (
              <div className="pointer-events-none absolute left-4 right-4 top-3 text-lg text-muc/40" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phIndex}
                    className="block"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                  >
                    {T.placeholders[phIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 text-xs">
            <span id={`${id}-help`} className="text-tim">{T.helper}</span>
            <span className={remaining <= 10 ? "font-bold text-son" : "text-muc/70"}>
              {fill(T.counter, { n: remaining })}
            </span>
          </div>
        </div>

        <fieldset>
          <legend className="eyebrow text-tim">{T.via.label}</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {T.via.options.map((o) => {
              const active = via === o.id;
              return (
                <label
                  key={o.id}
                  className={`flex min-h-[56px] cursor-pointer items-center justify-center rounded-[14px] border-2 px-3 text-center font-display text-lg transition-[background-color,box-shadow,border-color] ${
                    active
                      ? "border-muc bg-nghe text-muc shadow-[3px_4px_0_#E6007E]"
                      : "border-muc/25 bg-transparent text-muc/70 hover:border-muc hover:bg-nghe hover:text-muc hover:shadow-[3px_4px_0_#E6007E]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-via`}
                    value={o.id}
                    checked={active}
                    onChange={() => {
                      setVia(o.id);
                      if (error === T.errors.noVia) setError("");
                    }}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muc/70">{T.via.hint}</p>
        </fieldset>

        {/* Câu dẫn hiện trước, nút Châm lửa hiện sau khi cuộn tới */}
        <motion.div
          className="pt-4"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="riso-text-cam font-display text-2xl leading-snug text-son md:text-3xl"
          >
            {T.ctaLead}
          </motion.p>
          <p id={`${id}-err`} role="alert" aria-live="assertive" className="mt-3 min-h-[1.5rem] text-sm font-bold text-son">
            {error}
          </p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.4 } } }}
          >
            <button type="submit" className="btn-chunky mt-1 w-full bg-son text-giay sm:w-auto">
              {T.cta}
            </button>
          </motion.div>
        </motion.div>
        </fieldset>
      </form>
    </section>
  );
}

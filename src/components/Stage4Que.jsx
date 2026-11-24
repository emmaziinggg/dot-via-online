import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toPng } from "html-to-image";
import content, { fill } from "../content.js";
import OngQue from "./decor/OngQue.jsx";
import { Cuc, Sen, May } from "./decor/Flowers.jsx";

const T = content.stage4;

// Màu nhấn riêng cho từng nhóm quẻ (chỉ là màu, không có chữ)
const TONE = {
  "cong-viec": { bg: "#29A8E0", band: "#FFD23F" },
  "tien-bac": { bg: "#FFD23F", band: "#E6007E" },
  "tinh-duyen": { bg: "#E6007E", band: "#FFD23F" },
  "gia-dinh": { bg: "#F7931E", band: "#12A150" },
  "suc-khoe": { bg: "#12A150", band: "#FFD23F" },
  chung: { bg: "#6A3D9A", band: "#F7931E" },
};

// Thời gian từng bước (ms)
const ZOOM_MS = 550; // ống phóng to ra giữa màn hình
const SHAKE_MS = 1600; // lắc
const DROP_MS = 1100; // que văng ra, rớt xuống, ống mờ dần
const LAND_MS = 1100; // ống đã biến mất, que nằm giữa màn hình cho đọc chữ

// Bộ bài quẻ: xáo 1 lần khi mở trang, mỗi lần rút lấy quẻ kế tiếp, hết thì quay vòng.
// Vậy 6 lần rút liền nhau luôn ra đủ 6 quẻ khác nhau. Chỉ nằm trong bộ nhớ, tải lại trang là xáo mới.
let deck = null;
let deckPos = 0;
function nextQue() {
  if (!deck) {
    deck = [...T.ques];
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  const q = deck[deckPos % deck.length];
  deckPos += 1;
  return q;
}

// Copy chữ: dùng Clipboard API, không được thì dùng cách cũ execCommand
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    if (!ok) throw new Error("copy-failed");
  }
}

// Que thẻ: thân tre, đầu tô màu nhóm quẻ, thân có chữ "Vía Lành · nhóm"
// `layout`: lớp sắp xếp (ngang/dọc), `head`: kích thước đầu que, `text`: lớp cho chữ
function Stick({ color, label, layout, head, text }) {
  return (
    <div
      className={`flex overflow-hidden rounded-[6px] border-2 border-[#B98C3E] bg-[#F5D99A] shadow-[3px_4px_0_#2B1B3D] ${layout}`}
    >
      <div className={`shrink-0 ${head}`} style={{ background: color }} />
      <div className="flex flex-1 items-center justify-center">
        <p className={`whitespace-nowrap font-display tracking-wide text-muc ${text}`}>{label}</p>
      </div>
    </div>
  );
}

// Chặng 4: ống gieo quẻ -> que rớt ra nằm lại -> thẻ Vía Lành hiện bên cạnh
export default function Stage4Que({ que, setQue, onReplay, notify }) {
  const reduce = useReducedMotion();
  // idle -> zoom -> shaking -> dropped -> landed -> shown. Đã có quẻ thì luôn "shown".
  const [phase, setPhase] = useState(que ? "shown" : "idle");
  const cardRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Khoá cuộn trang khi ống đang phóng to giữa màn hình
  const overlayOn = ["zoom", "shaking", "dropped", "landed"].includes(phase);
  useEffect(() => {
    if (!overlayOn) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOn]);

  // Lắc ống và rút quẻ kế tiếp trong bộ bài, lưu ngay vào state
  const runDraw = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setQue(nextQue());
    if (reduce) {
      setPhase("shown");
      return;
    }
    let t = 0;
    const at = (ms, p) => timers.current.push(setTimeout(() => setPhase(p), (t += ms)));
    setPhase("zoom");
    at(ZOOM_MS, "shaking");
    at(SHAKE_MS, "dropped");
    at(DROP_MS, "landed");
    at(LAND_MS, "shown");
  };

  const draw = () => {
    if (que || phase !== "idle") return;
    runDraw();
  };

  const redraw = () => {
    if (!que || phase !== "shown") return;
    runDraw();
  };

  const save = async () => {
    if (!cardRef.current) return;
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#F5F0E6", cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${content.extra.fileName}-${que.id}.png`;
      a.click();
      notify(content.toasts.saved);
    } catch {
      notify(content.extra.saveFailed);
    }
  };

  const share = async () => {
    const link = window.location.href.split("#")[0];
    const text = fill(content.share.caption, { link });
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await copyText(text);
      notify(content.toasts.linkCopied);
    } catch (err) {
      if (err && err.name === "AbortError") return; // người dùng tự huỷ
      try {
        await copyText(text);
        notify(content.toasts.linkCopied);
      } catch {
        notify(content.toasts.networkError);
      }
    }
  };

  const tone = que ? TONE[que.id] || TONE.chung : TONE.chung;
  const showCard = phase === "shown" && que;
  const drawn = phase !== "idle";
  const stickLabel = que ? fill(T.cardLabel, { group: que.group }) : "";
  const tubeGone = phase === "dropped" || phase === "landed";
  const statusText = phase === "zoom" || phase === "shaking" ? T.shaking : tubeGone ? T.dropped : "";

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-10 md:py-16" aria-labelledby="stage4-h">
      <div className="text-center">
        <h2 id="stage4-h" className="riso-text font-display text-4xl leading-tight text-sen md:text-6xl">
          {T.headline}
        </h2>
        {!drawn && <p className="mx-auto mt-3 max-w-md text-[15px]">{T.intro}</p>}
      </div>

      <div
        className={`mt-8 grid items-center gap-8 ${
          drawn ? "md:grid-cols-[280px_minmax(0,1fr)] md:gap-12" : "justify-items-center"
        }`}
      >
        {/* Chưa xin: ống quẻ. Đã xin: ống biến mất, chỉ còn que rớt ra (có chữ) */}
        <div className="flex flex-col items-center">
          {!drawn && (
            <div className="relative h-64 w-44">
              <motion.div layoutId="ong-que" className="absolute inset-0" transition={{ duration: 0.6, ease: [0.3, 0, 0.2, 1] }}>
                <OngQue className="h-full w-full" label={content.extra.tubeAria} />
              </motion.div>
            </div>
          )}

          {/* mobile: que nằm ngang hơi nghiêng; desktop: que dựng đứng, to, chữ dọc */}
          {drawn && (
            <div className="flex min-h-[4.5rem] items-center justify-center md:min-h-[440px]">
              {showCard && (
                <motion.div
                  className="-rotate-3 md:rotate-[4deg]"
                  initial={reduce ? false : { opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  aria-label={stickLabel}
                  role="img"
                >
                  <Stick
                    color={tone.bg}
                    label={stickLabel}
                    layout="h-14 w-[min(78vw,280px)] md:h-[420px] md:w-16 md:flex-col"
                    head="w-[14%] md:h-[14%] md:w-full"
                    text="text-[15px] md:text-[22px] md:[writing-mode:vertical-rl]"
                  />
                </motion.div>
              )}
            </div>
          )}

          {!drawn && (
            <button type="button" onClick={draw} className="btn-chunky mt-8 bg-son text-giay">
              {T.drawCta}
            </button>
          )}
        </div>

        {/* THẺ QUẺ + 3 NÚT */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -40, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: reduce ? 0 : 0.5, type: "spring", stiffness: 140, damping: 17 }}
              className="mx-auto w-full max-w-[400px] md:mx-0"
            >
              <article
                ref={cardRef}
                aria-label={content.extra.cardAria}
                className="relative overflow-hidden rounded-[18px] border-[3px] border-muc bg-giay shadow-[6px_8px_0_#2B1B3D]"
              >
                <div className="relative h-24 overflow-hidden" style={{ background: tone.bg }} aria-hidden="true">
                  <svg viewBox="0 0 400 96" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                    <g opacity="0.9">
                      <Cuc x={40} y={30} r={1} petal="#F5F0E6" ring={tone.band} />
                      <May x={120} y={62} r={1} color="#F5F0E6" />
                      <Sen x={200} y={56} r={1.2} outer="#F5F0E6" inner={tone.band} leaf="#F5F0E6" />
                      <May x={285} y={30} r={0.9} color="#F5F0E6" />
                      <Cuc x={360} y={66} r={1.1} petal="#F5F0E6" ring={tone.band} />
                    </g>
                  </svg>
                </div>
                <div className="h-3" style={{ background: tone.band }} />
                <div className="px-6 pb-8 pt-6 text-center">
                  <p className="eyebrow text-tim">{fill(T.cardLabel, { group: que.group })}</p>
                  <h3 className="riso-text-cam mt-3 font-display text-[1.75rem] leading-tight text-son">{que.headline}</h3>
                  <div className="mx-auto mt-5 w-12 border-t-2 border-dashed border-tim/50" />
                  <p className="mt-5 font-body text-[14px] italic leading-[1.7] text-muc sm:text-[16px]">
                    {que.poem.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </article>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <button type="button" onClick={save} className="btn-chunky bg-nghe text-muc">
                  {T.actions.save}
                </button>
                <button type="button" onClick={share} className="btn-chunky bg-lam text-muc">
                  {T.actions.share}
                </button>
                <button type="button" onClick={redraw} className="btn-chunky bg-sen text-giay">
                  {T.actions.redraw}
                </button>
                <button type="button" onClick={onReplay} className="btn-ghost">
                  {T.actions.replay}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LỚP PHỦ: ống phóng to giữa màn hình, lắc, que văng ra */}
      <AnimatePresence>
        {overlayOn && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-giay/95 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[72svh] w-[min(48svh,82vw)]">
              <motion.div
                layoutId="ong-que"
                className="absolute inset-0"
                transition={{ duration: 0.55, ease: [0.3, 0, 0.2, 1] }}
              >
                {/* ống mờ dần rồi biến mất khi que đã văng ra */}
                <motion.div
                  className="h-full w-full"
                  animate={tubeGone ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                  transition={{ delay: tubeGone ? 0.35 : 0, duration: 0.5 }}
                >
                  <motion.div
                    className="h-full w-full"
                    style={{ originX: 0.5, originY: 0.9 }}
                    animate={
                      phase === "shaking"
                        ? { rotate: [0, -10, 9, -12, 11, -8, 10, -6, 4, 0], y: [0, -14, 0, -18, 0, -12, 0, -8, 0, 0] }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: SHAKE_MS / 1000, ease: "easeInOut" }}
                  >
                    <OngQue className="h-full w-full" label={content.extra.tubeAria} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* que văng lên khỏi miệng ống, rớt xuống nằm giữa, chữ hiện rõ */}
              {tubeGone && (
                <motion.div
                  className="absolute left-1/2 top-[4%] z-10 -ml-[7%] h-[66%] w-[14%]"
                  initial={{ y: "0%", rotate: 0 }}
                  animate={{ y: ["0%", "-45%", "38%"], rotate: [0, 12, -5] }}
                  transition={{ duration: 0.95, times: [0, 0.35, 1], ease: "easeOut" }}
                  role="img"
                  aria-label={stickLabel}
                >
                  <Stick
                    color={tone.bg}
                    label={stickLabel}
                    layout="h-full w-full flex-col"
                    head="h-[11%] w-full"
                    text="text-[clamp(14px,2.3svh,20px)] [writing-mode:vertical-rl]"
                  />
                </motion.div>
              )}
            </div>
            <p className="mt-4 min-h-[2rem] font-display text-2xl text-tim" aria-live="polite">
              {statusText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

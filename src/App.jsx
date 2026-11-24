import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import content from "./content.js";
import Hero from "./components/Hero.jsx";
import Stage1Input from "./components/Stage1Input.jsx";
import Stage2Burn from "./components/Stage2Burn.jsx";
import Stage3Coals from "./components/Stage3Coals.jsx";
import Stage4Que from "./components/Stage4Que.jsx";
import Toast from "./components/Toast.jsx";
import Footer from "./components/Footer.jsx";

/**
 * Luồng 4 chặng. `stage` = chặng cao nhất đã mở khoá:
 * 1 nhập xui -> 2 đốt giấy -> 3 bước qua than -> 4 xin quẻ.
 * Điều xui (`wish`) chỉ nằm trong state, không lưu đâu cả và bị xoá khi đốt xong.
 */
export default function App() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(1);
  const [round, setRound] = useState(0); // tăng mỗi lần "đốt thêm" để làm mới các chặng
  const [wish, setWish] = useState("");
  const [via, setVia] = useState(null);
  const [coalsDone, setCoalsDone] = useState(false);
  const [que, setQue] = useState(null);
  const [toast, setToast] = useState("");
  const [scrollTo, setScrollTo] = useState(null);

  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage4Ref = useRef(null);
  const stepsRef = useRef(null);
  const toastTimer = useRef();

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }, []);

  // Cuộn tới chặng vừa mở sau khi nó đã render
  useEffect(() => {
    if (!scrollTo) return;
    const map = { 1: stage1Ref, 2: stage2Ref, 4: stage4Ref };
    map[scrollTo]?.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setScrollTo(null);
  }, [scrollTo, reduce]);

  // Rời tab giữa lúc đang đốt / đang bước than -> quay lại thì nhắc
  const midway = stage === 2 || (stage === 3 && !coalsDone);
  const midwayRef = useRef(midway);
  midwayRef.current = midway;
  useEffect(() => {
    let left = false;
    const onVis = () => {
      if (document.hidden) left = midwayRef.current;
      else if (left) {
        left = false;
        notify(content.toasts.leaveTab);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [notify]);

  const total = content.stage1.via.options.find((o) => o.id === via)?.nhip ?? 7;

  const ignite = () => {
    setStage(2);
    setScrollTo(2);
  };

  const burnDone = () => {
    setWish(""); // xui đã thành tro: xoá sạch chữ người dùng nhập
    setStage(3);
  };

  const goQue = () => {
    setStage(4);
    setScrollTo(4);
  };

  const replay = () => {
    setWish("");
    setVia(null);
    setQue(null);
    setCoalsDone(false);
    setRound((r) => r + 1);
    setStage(1);
    setScrollTo(1);
  };

  return (
    <>
      <Hero onStart={() => stage1Ref.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })} stepsRef={stepsRef} />

      <main>
        <div ref={stage1Ref} className="scroll-mt-4">
          <Stage1Input
            key={`s1-${round}`}
            wish={wish}
            setWish={setWish}
            via={via}
            setVia={setVia}
            onIgnite={ignite}
            locked={stage > 1}
          />
        </div>

        {stage >= 2 && (
          <div ref={stage2Ref}>
            <Stage2Burn key={`s2-${round}`} wish={wish} onDone={burnDone} />
          </div>
        )}

        {stage >= 3 && (
          <Stage3Coals key={`s3-${round}`} total={total} onStepsDone={() => setCoalsDone(true)} onNext={goQue} />
        )}

        {stage >= 4 && (
          <div ref={stage4Ref}>
            <Stage4Que key={`s4-${round}`} que={que} setQue={setQue} onReplay={replay} notify={notify} />
          </div>
        )}
      </main>

      <Footer />
      <Toast message={toast} />
    </>
  );
}

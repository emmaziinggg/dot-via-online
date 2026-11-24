import { useEffect, useState } from "react";

// Trả về true khi người dùng đứng im (không cuộn/chạm/bấm) quá `seconds` giây.
// Chỉ đếm khi active = true.
export function useIdle(active, seconds) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!active) {
      setIdle(false);
      return undefined;
    }
    let timer;
    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), seconds * 1000);
    };
    const events = ["scroll", "wheel", "touchmove", "keydown", "pointerdown"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [active, seconds]);
  return idle;
}

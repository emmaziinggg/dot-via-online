import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Theo dõi tiến độ cuộn (0..1) của một section cao có phần sticky bên trong.
 * onProgress(value, isBackward) được gọi mỗi khi cuộn.
 */
export function useStageScroll(onProgress) {
  const ref = useRef(null);
  const last = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const backward = v < last.current - 0.002;
    last.current = v;
    onProgress(v, backward);
  });
  return ref;
}

import { useEffect, useState } from "react";

// true nếu là màn hình cảm ứng (điện thoại, tablet) -> dùng hướng dẫn "vuốt"
export function useIsTouch() {
  const query = "(pointer: coarse)";
  const [isTouch, setIsTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsTouch(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isTouch;
}

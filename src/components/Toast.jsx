import { AnimatePresence, motion } from "framer-motion";

// Thông báo nhỏ ở đáy màn hình. Chữ truyền vào từ content.js.
export default function Toast({ message }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="rounded-full border-2 border-muc bg-nghe px-5 py-2.5 text-sm font-bold text-muc shadow-[3px_4px_0_#2B1B3D]"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

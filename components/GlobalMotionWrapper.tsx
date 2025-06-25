"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Custom Cursor
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none w-8 h-8 rounded-full border-2 border-[#00ff9d] bg-[#00ff9d] bg-opacity-10 mix-blend-difference transition-transform duration-150"
      style={{ left: 0, top: 0 }}
    />
  );
};

// Page Transition Wrapper
export default function GlobalMotionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
} 
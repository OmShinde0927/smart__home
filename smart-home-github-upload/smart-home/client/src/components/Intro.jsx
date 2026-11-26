import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const word = "SMART HOME".split("");

// Plays once when the website opens: logo draws in, letters stagger, curtain lifts.
export default function Intro({ onDone }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2300);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="intro" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div className="intro-logo" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}>
            <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M3 11l9-8 9 8v10H3z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1 }} />
              <motion.path d="M9 21v-6h6v6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
            </svg>
          </motion.div>
          <div className="intro-word" aria-label="Smart Home">
            {word.map((c, i) => (
              <motion.span key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}>
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </div>
          <motion.p className="intro-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
            Better days ahead. Good things ahead.
          </motion.p>
          <motion.div className="intro-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

export default function LenisProvider({ children }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.65,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.72,
      touchMultiplier: 0.85,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return children;
}

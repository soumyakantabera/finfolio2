import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isTouch;
}

export default function GlassCursor() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible],
  );

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, textarea, select, [data-glass-hover]',
      );
      setHovering(!!el);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Hide on touch devices or when reduced motion is preferred
  if (isTouch || reducedMotion) return null;

  const size = hovering ? 56 : 32;
  const offset = size / 2;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
        width: size,
        height: size,
        marginLeft: -offset,
        marginTop: -offset,
        borderRadius: '50%',
        background: hovering
          ? 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 30%, rgba(139,92,246,0.18) 55%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 50%, transparent 70%)',
        backdropFilter: hovering ? 'blur(2px) saturate(1.4) contrast(1.05)' : 'blur(4px)',
        WebkitBackdropFilter: hovering ? 'blur(2px) saturate(1.4) contrast(1.05)' : 'blur(4px)',
        border: hovering
          ? '1.5px solid rgba(139,92,246,0.35)'
          : '1px solid rgba(255,255,255,0.35)',
        boxShadow: hovering
          ? '0 0 24px rgba(139,92,246,0.18), inset 0 0 12px rgba(255,255,255,0.25)'
          : '0 0 12px rgba(255,255,255,0.1)',
        mixBlendMode: 'normal',
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.35 : 1,
        width: size,
        height: size,
        marginLeft: -offset,
        marginTop: -offset,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    />
  );
}

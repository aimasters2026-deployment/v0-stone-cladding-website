'use client';

import { useEffect, useRef } from 'react';

export default function CursorTracker() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = (e.clientX - 250) + 'px';
        glowRef.current.style.top = (e.clientY - 250) + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

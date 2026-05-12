'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollAnimator({ children, className = '' }: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-10 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function CursorGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.1) 10%, transparent 80%)`,
      }}
    />
  );
}

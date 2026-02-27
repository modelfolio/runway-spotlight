import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Only show on mouse devices, not touch
  useEffect(() => {
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    let rafId: number;
    let ringX = -200, ringY = -200;
    let targetX = -200, targetY = -200;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Dot snaps instantly via direct DOM write (no React re-render)
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    // Ring trails behind with spring damping
    const tick = () => {
      ringX += (targetX - ringX) * 0.09;
      ringY += (targetY - ringY) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top  = `${ringY}px`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const attachHover = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    // Attach after brief delay so DOM is ready
    const timer = setTimeout(attachHover, 500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: "-200px",
          top: "-200px",
          width: hovered ? "0px" : "5px",
          height: hovered ? "0px" : "5px",
          borderRadius: "50%",
          background: "hsl(38 68% 38%)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s ease, height 0.2s ease",
          willChange: "left, top",
        }}
      />

      {/* Outer ring — lags behind with spring, expands on hover */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: "-200px",
          top: "-200px",
          width: hovered ? "48px" : "26px",
          height: hovered ? "48px" : "26px",
          borderRadius: "50%",
          border: `1px solid hsl(38 68% 38% / ${hovered ? "0.75" : "0.42"})`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.38s cubic-bezier(0.16, 1, 0.3, 1), height 0.38s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s",
          willChange: "left, top",
        }}
      />
    </>
  );
};

export default CursorFollower;

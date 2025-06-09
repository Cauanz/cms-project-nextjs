"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingPage({ onFinish }: { onFinish: () => void}) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onFinish
        });
      },
    });

    tl.fromTo(
      loaderRef.current,
      { y: 0, opacity: 1},
      { y: -100, duration: 1.5, delay: 1}
    );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black text-white flex items-center justify-center text-2xl z-50"
    >
      Loading Page...
    </div>
  );
}

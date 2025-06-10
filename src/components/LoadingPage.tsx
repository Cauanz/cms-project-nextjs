"use client";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export default function LoadingPage({ onFinish }: { onFinish: () => void}) {
  const loaderRef = useRef(null);

  gsap.registerPlugin(SplitText);
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
      { y: -5, duration: 1.5, delay: 1}
    );
  }, []);

  useEffect(() => {

    const split = SplitText.create(".text", 
      {type: "chars"}
    );
    gsap.from(split.chars, {
      duration: 1.5,
      y: -100,
      autoAlpha: 0,
      stagger: 0.05
    })

  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black text-white flex items-center justify-center text-2xl z-50"
    >
      <p className="text">
      Loading Page...
      </p>
    </div>
  );
}

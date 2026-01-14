"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    audioEl.volume = 0.4;
    const tryPlay = async () => {
      try {
        await audioEl.play();
      } catch (err) {
        console.warn("Background audio autoplay was blocked by the browser.");
      }
    };
    tryPlay();
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/Pokemon RubySapphireEmerald- Littleroot Town.mp3"
      autoPlay
      loop
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
}

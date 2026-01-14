"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const storedMuted = typeof window !== "undefined" && localStorage.getItem("bgMusicMuted") === "true";
    audioEl.volume = 0.4;
    audioEl.muted = storedMuted;

    const tryPlay = async () => {
      if (audioEl.muted) return;
      try {
        await audioEl.play();
      } catch (err) {
        console.warn("Background audio autoplay was blocked by the browser.");
      }
    };

    const unlockOnInteraction = () => {
      tryPlay();
      window.removeEventListener("pointerdown", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
      window.removeEventListener("touchstart", unlockOnInteraction);
    };

    const handleToggle = (event) => {
      const muted = event.detail?.muted ?? false;
      audioEl.muted = muted;
      localStorage.setItem("bgMusicMuted", muted ? "true" : "false");
      if (muted) {
        audioEl.pause();
      } else {
        tryPlay();
      }
    };

    window.addEventListener("bg-music-toggle", handleToggle);
    window.addEventListener("pointerdown", unlockOnInteraction, { once: true });
    window.addEventListener("keydown", unlockOnInteraction, { once: true });
    window.addEventListener("touchstart", unlockOnInteraction, { once: true });
    tryPlay();

    return () => {
      window.removeEventListener("bg-music-toggle", handleToggle);
      window.removeEventListener("pointerdown", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
      window.removeEventListener("touchstart", unlockOnInteraction);
    };
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

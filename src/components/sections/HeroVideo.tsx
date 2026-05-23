"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroVideo as HeroVideoContent } from "@/lib/content";

type HeroVideoProps = {
  video: HeroVideoContent;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const syncTime = useCallback(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }

    setCurrentTime(el.currentTime);
    setDuration(el.duration);
  }, []);

  const togglePlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el) {
      return;
    }

    if (el.paused) {
      await el.play();
      setIsPlaying(true);
      setHasStarted(true);
      return;
    }

    el.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setHasStarted(false);
      el.currentTime = 0;
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", syncTime);
    el.addEventListener("loadedmetadata", syncTime);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", syncTime);
      el.removeEventListener("loadedmetadata", syncTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [syncTime]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <figure className="hero-video group mx-auto w-full max-w-5xl">
      <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
        <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-muted uppercase sm:text-xs">
          {video.label}
        </p>
        {duration > 0 ? (
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground tabular-nums sm:text-xs">
            {formatTime(duration)}
          </p>
        ) : null}
      </div>

      <div className="hero-video-frame relative">
        <div className="hero-video-frame-inner relative overflow-hidden rounded-[1.125rem] bg-black sm:rounded-[1.375rem]">
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            playsInline
            preload="metadata"
            className="aspect-video w-full object-cover"
            aria-label={video.label}
          />

          {!hasStarted ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
              <button
                type="button"
                onClick={() => void togglePlay()}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play ${video.label}`}
              >
                <span className="hero-video-play flex size-16 items-center justify-center rounded-full border border-foreground/25 bg-background/90 text-foreground shadow-[var(--shadow-elevated)] backdrop-blur-sm transition-[transform,border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-105 hover:border-foreground hover:bg-background sm:size-20">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="ml-1 size-6 fill-current sm:size-7"
                  >
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </span>
              </button>
            </div>
          ) : (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
              <div
                aria-hidden
                className="mb-3 h-px overflow-hidden rounded-full bg-foreground/15"
              >
                <div
                  className="h-full bg-foreground/70 transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => void togglePlay()}
                  className="inline-flex min-h-[var(--touch-target)] min-w-[var(--touch-target)] items-center justify-center rounded-full border border-foreground/20 bg-background/10 text-foreground backdrop-blur-sm transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-foreground/40 hover:bg-background/20"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
                      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden className="ml-0.5 size-4 fill-current">
                      <path d="M8 5.14v13.72L19 12 8 5.14z" />
                    </svg>
                  )}
                </button>
                <p className="font-mono text-xs tracking-[0.08em] text-foreground/80 tabular-nums">
                  {formatTime(currentTime)}
                  <span className="text-foreground/45"> / </span>
                  {formatTime(duration)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <figcaption className="sr-only">{video.label}</figcaption>
    </figure>
  );
}

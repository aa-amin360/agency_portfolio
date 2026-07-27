// File: src/components/AsciiArt.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Strictly small letters only (a-z)
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyz";

export default function AsciiArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 9 });

  const [mediaSource, setMediaSource] = useState<{
    type: "video" | "image";
    src: string;
  } | null>(null);

  const [isMediaReady, setIsMediaReady] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Auto-detect media source (tries profile.mp4 first)
  useEffect(() => {
    let isMounted = true;

    const checkMedia = async () => {
      // 1. Try MP4 video
      try {
        const res = await fetch("/profile.mp4", { method: "HEAD" });
        if (res.ok && isMounted) {
          setMediaSource({ type: "video", src: "/profile.mp4" });
          return;
        }
      } catch (e) {}

      // 2. Try PNG
      try {
        const res = await fetch("/profile.png", { method: "HEAD" });
        if (res.ok && isMounted) {
          setMediaSource({ type: "image", src: "/profile.png" });
          return;
        }
      } catch (e) {}

      // 3. Fallback to JPG
      if (isMounted) {
        setMediaSource({ type: "image", src: "/profile.jpg" });
      }
    };

    checkMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  // Force video playback when video is ready
  useEffect(() => {
    if (mediaSource?.type === "video" && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsMediaReady(true))
          .catch(() => {
            setIsMediaReady(true);
          });
      }
    }
  }, [mediaSource]);

  // Load static image fallback if no video
  useEffect(() => {
    if (!mediaSource || mediaSource.type !== "image") return;

    const img = new Image();
    img.src = mediaSource.src;
    img.onload = () => {
      imgRef.current = img;
      setIsMediaReady(true);
    };
    img.onerror = () => {
      if (mediaSource.src === "/profile.png") {
        const fallbackJpg = new Image();
        fallbackJpg.src = "/profile.jpg";
        fallbackJpg.onload = () => {
          imgRef.current = fallbackJpg;
          setIsMediaReady(true);
        };
      }
    };
  }, [mediaSource]);

  // Continuous Canvas Render Loop with Matrix Character Shuffle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let currentElement: HTMLImageElement | HTMLVideoElement | null = null;

      if (mediaSource?.type === "video" && videoRef.current) {
        currentElement = videoRef.current;
      } else if (mediaSource?.type === "image" && imgRef.current && isMediaReady) {
        currentElement = imgRef.current;
      }

      if (currentElement && offCtx) {
        const naturalW =
          (currentElement as HTMLVideoElement).videoWidth ||
          (currentElement as HTMLImageElement).naturalWidth ||
          1;
        const naturalH =
          (currentElement as HTMLVideoElement).videoHeight ||
          (currentElement as HTMLImageElement).naturalHeight ||
          1;

        if (naturalW > 1 && naturalH > 1) {
          const cols = 85;
          const imgRatio = naturalW / naturalH;
          const rows = Math.round((cols / imgRatio) * 0.55);

          offCanvas.width = cols;
          offCanvas.height = rows;

          try {
            offCtx.clearRect(0, 0, cols, rows);
            offCtx.drawImage(currentElement, 0, 0, cols, rows);

            const imgData = offCtx.getImageData(0, 0, cols, rows);
            const data = imgData.data;

            const maxW = canvas.width;
            const maxH = canvas.height;

            let renderW = maxW;
            let renderH = maxW / imgRatio;

            if (renderH > maxH) {
              renderH = maxH;
              renderW = maxH * imgRatio;
            }

            const stepX = renderW / cols;
            const stepY = renderH / rows;

            const offsetX = (canvas.width - renderW) / 2;
            const offsetY = (canvas.height - renderH) / 2;

            const fontSize = stepY * 0.9;
            ctx.font = `${fontSize}px monospace`;

            // Time factor driving the constant matrix character shuffle
            const timeFactor = Math.floor(Date.now() / 70);

            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const idx = (r * cols + c) * 4;
                const red = data[idx];
                const green = data[idx + 1];
                const blue = data[idx + 2];
                const alpha = data[idx + 3];

                // Skip transparent pixels
                if (alpha < 30) continue;

                // Skip white video background
                const isWhiteBg = red > 215 && green > 215 && blue > 215;
                const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

                if (isWhiteBg || brightness > 0.82) continue;

                // Continuous Matrix Character Shuffle offset
                const shuffleOffset = (r * 3 + c * 7 + timeFactor) % ASCII_CHARS.length;
                const baseIdx = Math.floor((1 - brightness) * (ASCII_CHARS.length - 1));
                const charIdx = (baseIdx + shuffleOffset) % ASCII_CHARS.length;
                const char = ASCII_CHARS[charIdx] || "a";

                const charX = offsetX + c * stepX;
                const charY = offsetY + r * stepY + fontSize * 0.8;

                const distToMouse = Math.hypot(
                  charX - mouseRef.current.x,
                  charY - mouseRef.current.y
                );

                if (distToMouse < mouseRef.current.radius) {
                  const intensity = 1 - distToMouse / mouseRef.current.radius;
                  ctx.fillStyle = `#ffffff`; // Bright white micro highlight
                  ctx.font = `bold ${fontSize + intensity * 1.5}px monospace`;
                } else {
                  const softOpacity = 0.2 + (1 - brightness) * 0.8;
                  ctx.fillStyle = `rgba(168, 85, 247, ${softOpacity})`;
                  ctx.font = `${fontSize}px monospace`;
                }

                ctx.fillText(char, charX, charY);
              }
            }
          } catch (err) {}
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mediaSource, isMediaReady]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[550px] flex items-center justify-center">
      {mediaSource?.type === "video" && (
        <video
          ref={videoRef}
          src={mediaSource.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none -z-50"
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
              setIsMediaReady(true);
            }
          }}
        />
      )}

      <canvas ref={canvasRef} className="w-full h-full cursor-default" />
    </div>
  );
}
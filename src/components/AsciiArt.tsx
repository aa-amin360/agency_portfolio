// File: src/components/AsciiArt.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Strictly small letters only (a-z)
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyz";

interface PixelGrid {
  cols: number;
  rows: number;
  data: Uint8ClampedArray;
  imgRatio: number;
}

export default function AsciiArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 14 });
  const [grid, setGrid] = useState<PixelGrid | null>(null);

  // Extract image pixels into memory once
  useEffect(() => {
    let isCancelled = false;

    const processImage = (src: string, isFallback = false) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (isCancelled) return;
        const sampleCanvas = document.createElement("canvas");
        const sampleCtx = sampleCanvas.getContext("2d");
        if (!sampleCtx) return;

        const cols = 85;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const rows = Math.round((cols / imgRatio) * 0.55);

        sampleCanvas.width = cols;
        sampleCanvas.height = rows;
        sampleCtx.clearRect(0, 0, cols, rows);
        sampleCtx.drawImage(img, 0, 0, cols, rows);

        try {
          const imgData = sampleCtx.getImageData(0, 0, cols, rows);
          setGrid({
            cols,
            rows,
            data: imgData.data,
            imgRatio,
          });
        } catch (err) {
          console.error("Canvas pixel error:", err);
        }
      };

      img.onerror = () => {
        if (!isFallback && !isCancelled) {
          processImage("/profile.jpg", true);
        }
      };
    };

    processImage("/profile.png");

    return () => {
      isCancelled = true;
    };
  }, []);

  // Continuous Fast Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
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

      if (grid) {
        const { cols, rows, data, imgRatio } = grid;

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

        // Render photo with delicate, soft opacity
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = (r * cols + c) * 4;
            const red = data[idx];
            const green = data[idx + 1];
            const blue = data[idx + 2];
            const alpha = data[idx + 3];

            // Skip transparent PNG background pixels
            if (alpha < 30) continue;

            const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

            // Skip dark/shadow pixels to keep portrait thin and ethereal
            if (brightness < 0.12) continue;

            const charIdx = Math.floor(brightness * (ASCII_CHARS.length - 1));
            const char = ASCII_CHARS[charIdx] || "a";

            const charX = offsetX + c * stepX;
            const charY = offsetY + r * stepY + fontSize * 0.8;

            const distToMouse = Math.hypot(
              charX - mouseRef.current.x,
              charY - mouseRef.current.y
            );

            if (distToMouse < mouseRef.current.radius) {
              // Vibrant Hover Spotlight
              const intensity = 1 - distToMouse / mouseRef.current.radius;
              ctx.fillStyle = `rgba(129, 140, 248, ${0.85 + intensity * 0.15})`; // Indigo Glow
              ctx.font = `bold ${fontSize + intensity * 1.5}px monospace`;
            } else {
              // Soft, subtle default character opacity (8% - 35%)
              const softOpacity = 0.08 + brightness * 0.32;
              ctx.fillStyle = `rgba(168, 85, 247, ${softOpacity})`; // Delicate Purple
              ctx.font = `${fontSize}px monospace`;
            }

            ctx.fillText(char, charX, charY);
          }
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
  }, [grid]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[550px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
    </div>
  );
}
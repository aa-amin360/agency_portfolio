// File: src/components/HeroCanvas.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent Canvas from rendering on SSR to fix Hydration Mismatch
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-60 md:opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ec4899" />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
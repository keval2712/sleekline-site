'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { SceneObjects } from '@/lib/buildScene';
import { animateByProgress, initAnimState } from '@/lib/animateScene';

interface Hero3DProps {
  onProgressChange: (p: number) => void;
  onSceneStage: (stage: number) => void;
  onReady: () => void;
}

export default function Hero3D({ onProgressChange, onSceneStage, onReady }: Hero3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneObjects | null>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const scrollYRef = useRef(0);
  const totalHeightRef = useRef(0);
  const isReadyRef = useRef(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    let obj: SceneObjects | null = null;

    const init = async () => {
      // Dynamic import — ensures server-side safety
      const { buildScene, resizeScene } = await import('@/lib/buildScene');
      obj = buildScene(canvas);
      sceneRef.current = obj;
      initAnimState(obj);

      isReadyRef.current = true;
      onReady();

      // Render loop
      const render = () => {
        rafRef.current = requestAnimationFrame(render);
        if (!obj) return;

        // Smooth scroll interpolation
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) > 0.0001) {
          progressRef.current += diff * 0.08; // smooth lag
          onProgressChange(progressRef.current);
          animateByProgress(obj, progressRef.current);
        }

        obj.renderer.render(obj.scene, obj.camera);
      };
      render();

      // Resize handler
      const handleResize = () => {
        if (!canvas || !obj) return;
        resizeScene(obj, canvas);
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    };

    init();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (obj) {
        obj.renderer.dispose();
      }
    };
  }, [onReady, onProgressChange]);

  // Scroll handler — calculates 0-1 progress from scroll position
  useEffect(() => {
    const scrollEl = document.getElementById('install-scroll');
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const maxScroll = scrollHeight - clientHeight;
      const p = maxScroll > 0 ? Math.max(0, Math.min(1, scrollTop / maxScroll)) : 0;
      targetProgressRef.current = p;

      // Determine installation stage (1–6)
      if (p < 0.08) onSceneStage(0);
      else if (p < 0.32) onSceneStage(1);
      else if (p < 0.42) onSceneStage(2);
      else if (p < 0.78) onSceneStage(3);
      else if (p < 0.88) onSceneStage(4);
      else if (p < 0.94) onSceneStage(5);
      else onSceneStage(6);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [onSceneStage]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ display: 'block' }}
    />
  );
}

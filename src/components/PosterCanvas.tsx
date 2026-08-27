import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Eye, Camera } from 'lucide-react';
import { POSTER_CONFIG } from '../constants/posterConfig';
import { renderPoster } from '../utils/canvasRenderer';
import type { PhotoTransform } from '../utils/canvasRenderer';

interface PosterCanvasProps {
  posterImage: HTMLImageElement | null;
  userImage: HTMLImageElement | null;
  devoteeName: string;
  photoTransform: PhotoTransform;
  onUpdateTransform: (transform: Partial<PhotoTransform>) => void;
  fontFamily: string;
  onOpenFullscreen?: () => void;
}

export const PosterCanvas: React.FC<PosterCanvasProps> = ({
  posterImage,
  userImage,
  devoteeName,
  photoTransform,
  onUpdateTransform,
  fontFamily,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; startPanX: number; startPanY: number }>({
    x: 0,
    y: 0,
    startPanX: 0,
    startPanY: 0,
  });
  const [showHelper, setShowHelper] = useState(false);

  // Render canvas whenever inputs change
  const performRender = useCallback(() => {
    if (!canvasRef.current || !posterImage) return;

    renderPoster({
      canvas: canvasRef.current,
      posterImage,
      userImage,
      name: devoteeName,
      photoTransform,
      fontFamily,
      scale: 1, // Native preview (1194x1600)
    });

    // If helper guides are requested, draw subtle overlay on preview canvas
    if (showHelper && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.save();
        // Circle guide
        const cx = POSTER_CONFIG.photoCircle.centerX * canvasRef.current.width;
        const cy = POSTER_CONFIG.photoCircle.centerY * canvasRef.current.height;
        const r = (POSTER_CONFIG.photoCircle.diameter * canvasRef.current.width) / 2;
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Name box guide
        const bx = POSTER_CONFIG.nameBox.left * canvasRef.current.width;
        const by = POSTER_CONFIG.nameBox.top * canvasRef.current.height;
        const bw = POSTER_CONFIG.nameBox.width * canvasRef.current.width;
        const bh = POSTER_CONFIG.nameBox.height * canvasRef.current.height;
        ctx.strokeStyle = '#ffdd00';
        ctx.strokeRect(bx, by, bw, bh);
        ctx.restore();
      }
    }
  }, [posterImage, userImage, devoteeName, photoTransform, fontFamily, showHelper]);

  useEffect(() => {
    performRender();
  }, [performRender]);

  // Pointer drag to pan photo directly on the canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      startPanX: photoTransform.panX || 0,
      startPanY: photoTransform.panY || 0,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const containerWidth = canvasRef.current?.getBoundingClientRect().width || 400;
    const estimatedCircleDisplayDiameter = containerWidth * POSTER_CONFIG.photoCircle.diameter;

    const deltaNormX = dx / (estimatedCircleDisplayDiameter || 80);
    const deltaNormY = dy / (estimatedCircleDisplayDiameter || 80);

    onUpdateTransform({
      panX: Math.max(-1.5, Math.min(1.5, dragStart.startPanX + deltaNormX)),
      panY: Math.max(-1.5, Math.min(1.5, dragStart.startPanY + deltaNormY)),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore if not captured
      }
      setIsDragging(false);
    }
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
    const newZoom = Math.max(0.5, Math.min(3.5, (photoTransform.zoom || 1.0) + zoomDelta));
    onUpdateTransform({ zoom: Number(newZoom.toFixed(2)) });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl p-4 md:p-8 flex items-center justify-center overflow-auto'
          : 'w-full'
      }`}
    >
      {/* Poster Canvas Frame with Apple Glass styling */}
      <div className="relative w-full max-w-[480px] sm:max-w-[520px] rounded-3xl overflow-hidden glass-panel p-2.5 sm:p-3.5 shadow-2xl border border-amber-500/30 group">
        {/* Glow halo */}
        <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/20 via-transparent to-red-900/30 rounded-3xl blur-xl pointer-events-none opacity-75"></div>

        {/* Live Badge */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-[11px] font-semibold text-amber-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Live HD Preview</span>
        </div>

        {/* Canvas Display */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-[1194/1600] bg-[#1a0408] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={POSTER_CONFIG.nativeWidth}
            height={POSTER_CONFIG.nativeHeight}
            className={`w-full h-full object-contain select-none touch-none ${
              userImage ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
          />

          {/* Interactive hint overlay when user hasn't uploaded photo yet */}
          {!userImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[2px] pointer-events-none p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                <Camera className="w-7 h-7" />
              </div>
              <p className="text-white font-medium text-sm sm:text-base drop-shadow-md">
                તમારો ફોટો અને નામ ઉમેરો
              </p>
              <p className="text-amber-200/80 text-xs mt-1">
                લાઈવ પ્રીવ્યૂ અહીં જોવા મળશે
              </p>
            </div>
          )}
        </div>

        {/* Interactive Floating Quick Toolbar on Canvas */}
        <div className="mt-3 flex items-center justify-between gap-2 px-1 text-xs text-amber-200/80">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-amber-300/70 font-mono">1194 × 1600px</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Helper Toggle */}
            <button
              onClick={() => setShowHelper(!showHelper)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                showHelper
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-white/5 border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white'
              }`}
              title="Toggle Alignment Guides"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Quick Zoom In/Out for photo */}
            {userImage && (
              <>
                <button
                  onClick={() => onUpdateTransform({ zoom: Math.max(0.5, (photoTransform.zoom || 1) - 0.1) })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Zoom Out Photo"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateTransform({ zoom: Math.min(3.5, (photoTransform.zoom || 1) + 0.1) })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Zoom In Photo"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateTransform({ panX: 0, panY: 0, zoom: 1.0, rotation: 0 })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Reset Photo Position"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {/* Fullscreen view toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* User photo gesture hint */}
        {userImage && !isFullscreen && (
          <p className="text-center text-[11px] text-amber-300/60 mt-1.5 flex items-center justify-center gap-1">
            <span>👆 ફોટો એડજસ્ટ કરવા માટે ઉપર ડ્રેગ અથવા ઝૂમ કરો</span>
          </p>
        )}
      </div>
    </div>
  );
};

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

  const baseWidth = posterImage?.naturalWidth && posterImage.naturalWidth > 0 
    ? posterImage.naturalWidth 
    : POSTER_CONFIG.nativeWidth;
  const baseHeight = posterImage?.naturalHeight && posterImage.naturalHeight > 0 
    ? posterImage.naturalHeight 
    : POSTER_CONFIG.nativeHeight;
  const aspectStyle = { aspectRatio: `${baseWidth} / ${baseHeight}` };

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
      scale: 1,
    });

    // If helper guides are requested, draw subtle overlay on preview canvas
    if (showHelper && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.save();
        // Circle guide (Equal pixel radius on both axes)
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

    const containerWidth = canvasRef.current?.getBoundingClientRect().width || 340;
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
      className={`relative flex flex-col items-center justify-center transition-all duration-300 w-full ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl p-4 md:p-8 flex items-center justify-center overflow-auto'
          : ''
      }`}
    >
      {/* Poster Canvas Frame with Responsive Sizing */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden glass-panel p-2 sm:p-3 shadow-2xl border border-[#FFCD82]/30 group mx-auto transition-all ${
          isFullscreen
            ? 'max-w-[500px]'
            : 'max-w-[290px] xs:max-w-[320px] sm:max-w-[380px] lg:max-w-[440px]'
        }`}
      >
        {/* Glow halo */}
        <div className="absolute -inset-1 bg-gradient-to-b from-[#C68F41]/20 via-transparent to-[#E60168]/20 rounded-3xl blur-xl pointer-events-none opacity-75"></div>

        {/* Live Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FFCD82]/40 text-[10px] sm:text-[11px] font-semibold text-[#FFCD82] shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Live HD Preview</span>
        </div>

        {/* Canvas Display Locked to Exact Poster Aspect Ratio */}
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1a0105] flex items-center justify-center"
          style={aspectStyle}
        >
          <canvas
            ref={canvasRef}
            width={baseWidth}
            height={baseHeight}
            style={aspectStyle}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] pointer-events-none p-4 text-center">
              <div className="w-12 h-12 rounded-full aspect-square bg-[#C68F41]/20 border border-[#FFCD82]/40 flex items-center justify-center text-[#FFCD82] mb-2.5 shadow-lg">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-white font-medium text-xs sm:text-sm drop-shadow-md">
                તમારો ફોટો અને નામ ઉમેરો
              </p>
              <p className="text-[#FFCD82]/80 text-[11px] mt-0.5">
                લાઈવ પ્રીવ્યૂ અહીં જોવા મળશે
              </p>
            </div>
          )}
        </div>

        {/* Interactive Floating Quick Toolbar on Canvas */}
        <div className="mt-2.5 flex items-center justify-between gap-2 px-1 text-xs text-[#FFCD82]/80">
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-[11px] text-[#FFCD82]/70 font-mono">
              {baseWidth} × {baseHeight}px
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Helper Toggle */}
            <button
              onClick={() => setShowHelper(!showHelper)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                showHelper
                  ? 'bg-[#C68F41]/40 border-[#FFCD82] text-[#FFCD82]'
                  : 'bg-white/5 border-white/10 text-[#FFCD82]/70 hover:bg-white/10 hover:text-white'
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
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#FFCD82]/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Zoom Out Photo"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateTransform({ zoom: Math.min(3.5, (photoTransform.zoom || 1) + 0.1) })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#FFCD82]/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Zoom In Photo"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateTransform({ panX: 0, panY: 0, zoom: 1.0, rotation: 0 })}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#FFCD82]/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  title="Reset Photo Position"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {/* Fullscreen view toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#FFCD82]/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* User photo gesture hint */}
        {userImage && !isFullscreen && (
          <p className="text-center text-[10px] sm:text-[11px] text-[#FFCD82]/70 mt-1 flex items-center justify-center gap-1">
            <span>👆 ફોટો એડજસ્ટ કરવા માટે ઉપર ડ્રેગ અથવા ઝૂમ કરો</span>
          </p>
        )}
      </div>
    </div>
  );
};

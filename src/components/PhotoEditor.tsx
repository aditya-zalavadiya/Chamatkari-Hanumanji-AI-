import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, RotateCcw, X, Sliders, SunMedium, Move } from 'lucide-react';
import type { PhotoTransform } from '../utils/canvasRenderer';

interface PhotoEditorProps {
  userImage: HTMLImageElement | null;
  onImageSelected: (image: HTMLImageElement | null) => void;
  photoTransform: PhotoTransform;
  onUpdateTransform: (transform: Partial<PhotoTransform>) => void;
}

export const PhotoEditor: React.FC<PhotoEditorProps> = ({
  userImage,
  onImageSelected,
  photoTransform,
  onUpdateTransform,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadLocalFile(file);
  };

  const loadLocalFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('કૃપા કરીને ફોટો ફાઈલ (JPG, PNG, WebP) પસંદ કરો.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onImageSelected(img);
        onUpdateTransform({ zoom: 1.0, panX: 0, panY: 0, rotation: 0 });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadLocalFile(file);
    }
  };

  const panStep = 0.05;

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>તમારો ફોટો પસંદ કરો</span>
              <span className="text-xs font-normal text-amber-300/80">(Devotee Photo)</span>
            </h2>
            <p className="text-xs text-amber-200/60">
              ગોળ ફ્રેમમાં પરફેક્ટ સેટ કરવા માટે ડ્રેગ અને ઝૂમ કરો
            </p>
          </div>
        </div>

        {userImage && (
          <button
            onClick={() => onImageSelected(null)}
            className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-400/30 flex items-center gap-1 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>દૂર કરો</span>
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Zone */}
      {!userImage ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDraggingOver
              ? 'border-amber-400 bg-amber-500/20 scale-[1.01]'
              : 'border-amber-400/30 hover:border-amber-400/60 bg-amber-950/20 hover:bg-amber-950/40'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 shadow-inner group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-white">
            ફોટો અપલોડ કરવા ક્લિક અથવા ડ્રેગ કરો
          </h3>
          <p className="text-xs text-amber-200/70 mt-1 max-w-xs">
            ગેલેરીમાંથી કોઈપણ સારો સેલ્ફી કે પાસપોર્ટ સાઇઝ ફોટો પસંદ કરો
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-400/30 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              JPG / PNG / WebP સપોર્ટ
            </span>
          </div>
        </div>
      ) : (
        /* Image Controls when Photo is Uploaded */
        <div className="space-y-4 bg-black/30 rounded-2xl p-4 border border-amber-500/20">
          {/* Zoom Slider */}
          <div>
            <div className="flex items-center justify-between text-xs text-amber-200 mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                <span>ઝૂમ કંટ્રોલ (Zoom Scale)</span>
              </span>
              <span className="font-mono text-amber-300 font-bold">
                {Math.round((photoTransform.zoom || 1.0) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateTransform({ zoom: Math.max(0.5, (photoTransform.zoom || 1.0) - 0.1) })}
                className="p-1.5 rounded-lg bg-white/10 text-amber-200 hover:bg-white/20 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.02"
                value={photoTransform.zoom || 1.0}
                onChange={(e) => onUpdateTransform({ zoom: parseFloat(e.target.value) })}
                className="w-full h-2 bg-amber-950/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <button
                onClick={() => onUpdateTransform({ zoom: Math.min(3.0, (photoTransform.zoom || 1.0) + 0.1) })}
                className="p-1.5 rounded-lg bg-white/10 text-amber-200 hover:bg-white/20 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pan & Rotation Controls */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* 4-Way Direction Pan */}
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-[11px] font-semibold text-amber-300/90 block text-center mb-2 flex items-center justify-center gap-1">
                <Move className="w-3 h-3 text-amber-400" />
                <span>સ્થાન એડજસ્ટ (Pan)</span>
              </span>
              <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto">
                <div></div>
                <button
                  onClick={() => onUpdateTransform({ panY: (photoTransform.panY || 0) - panStep })}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500/30 text-amber-200 hover:text-white transition text-xs font-bold text-center cursor-pointer"
                  title="Move Up"
                >
                  ▲
                </button>
                <div></div>
                <button
                  onClick={() => onUpdateTransform({ panX: (photoTransform.panX || 0) - panStep })}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500/30 text-amber-200 hover:text-white transition text-xs font-bold text-center cursor-pointer"
                  title="Move Left"
                >
                  ◀
                </button>
                <button
                  onClick={() => onUpdateTransform({ panX: 0, panY: 0 })}
                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition text-[10px] font-bold text-center cursor-pointer"
                  title="Center"
                >
                  ●
                </button>
                <button
                  onClick={() => onUpdateTransform({ panX: (photoTransform.panX || 0) + panStep })}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500/30 text-amber-200 hover:text-white transition text-xs font-bold text-center cursor-pointer"
                  title="Move Right"
                >
                  ▶
                </button>
                <div></div>
                <button
                  onClick={() => onUpdateTransform({ panY: (photoTransform.panY || 0) + panStep })}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-500/30 text-amber-200 hover:text-white transition text-xs font-bold text-center cursor-pointer"
                  title="Move Down"
                >
                  ▼
                </button>
                <div></div>
              </div>
            </div>

            {/* Quick Rotate & Action Tools */}
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-amber-300/90 block text-center mb-1 flex items-center justify-center gap-1">
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>ટૂલ્સ (Tools)</span>
              </span>

              <div className="space-y-1.5">
                <button
                  onClick={() =>
                    onUpdateTransform({
                      rotation: ((photoTransform.rotation || 0) + 90) % 360,
                    })
                  }
                  className="w-full py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>ફેરવો 90°</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateTransform({
                      zoom: 1.0,
                      panX: 0,
                      panY: 0,
                      rotation: 0,
                      brightness: 100,
                      contrast: 100,
                      warmth: 0,
                    })
                  }
                  className="w-full py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>રીસેટ પોઝિશન</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>બીજો ફોટો બદલો</span>
                </button>
              </div>
            </div>
          </div>

          {/* Devotional Warmth Filter Toggle */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs text-amber-300 flex items-center justify-between w-full font-medium py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                <span>ફોટો કલર અને ગોલ્ડન ગ્લો એડજસ્ટ</span>
              </span>
              <span className="text-[11px] text-amber-400/80">{showFilters ? 'છુપાવો ▲' : 'ખોલો ▼'}</span>
            </button>

            {showFilters && (
              <div className="mt-2.5 space-y-2.5 p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-amber-200/80 mb-1">
                    <span>ગોલ્ડન વોર્મથ (Golden Tone Glow)</span>
                    <span className="font-mono text-amber-400">{photoTransform.warmth || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={photoTransform.warmth || 0}
                    onChange={(e) => onUpdateTransform({ warmth: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-amber-950/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-amber-200/80 mb-1">
                    <span>બ્રાઇટનેસ (Brightness)</span>
                    <span className="font-mono text-amber-400">{photoTransform.brightness || 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="130"
                    step="2"
                    value={photoTransform.brightness || 100}
                    onChange={(e) => onUpdateTransform({ brightness: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-amber-950/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

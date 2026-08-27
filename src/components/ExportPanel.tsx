import React, { useState } from 'react';
import { Download, Share2, CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportPosterBlob, triggerDownload } from '../utils/canvasRenderer';
import type { PhotoTransform } from '../utils/canvasRenderer';
import { TEMPLE_INFO } from '../constants/posterConfig';

interface ExportPanelProps {
  posterImage: HTMLImageElement | null;
  userImage: HTMLImageElement | null;
  devoteeName: string;
  photoTransform: PhotoTransform;
  fontFamily: string;
  onResetAll: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  posterImage,
  userImage,
  devoteeName,
  photoTransform,
  fontFamily,
  onResetAll,
}) => {
  const [scale, setScale] = useState<number>(2); // Default to 2x Ultra HD
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!posterImage) return;

    try {
      setIsExporting(true);
      setDownloadSuccess(false);

      const blob = await exportPosterBlob(
        posterImage,
        userImage,
        devoteeName,
        photoTransform,
        fontFamily,
        scale
      );

      triggerDownload(blob, devoteeName);

      // Trigger Festive Confetti Burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fde08d', '#d4af37', '#b28224', '#ff4d4d', '#ff9900'],
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Export failed:', err);
      alert('પોસ્ટર ડાઉનલોડ કરવામાં સમસ્યા આવી. ફરી પ્રયાસ કરો.');
    } finally {
      setIsExporting(false);
    }
  };

  // WhatsApp share message helper
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🚩 *${TEMPLE_INFO.trust}* - ${TEMPLE_INFO.eventTitle}\n\nમેં શ્રી ચમત્કારિક હનુમાનજી મંદિર ગણેશ મહોત્સવનું મારું ઓફિશિયલ પોસ્ટર બનાવ્યું છે!\n\nતમે પણ તમારો ફોટો અને નામ મૂકીને સ્પેશિયલ પોસ્ટર બનાવો.\nઇન્સ્ટાગ્રામ: ${TEMPLE_INFO.instagramUrl}\n\n${TEMPLE_INFO.mantra}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Web Share API support
  const handleNativeShare = async () => {
    if (!posterImage) return;
    try {
      setIsExporting(true);
      const blob = await exportPosterBlob(
        posterImage,
        userImage,
        devoteeName,
        photoTransform,
        fontFamily,
        scale
      );

      const file = new File(
        [blob],
        `chamatkarik-dham-${devoteeName || 'bhakt'}.png`,
        { type: 'image/png' }
      );

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${TEMPLE_INFO.trust} - ${TEMPLE_INFO.eventTitle}`,
          text: `મેં શ્રી ચમત્કારિક હનુમાનજી મંદિર ગણેશ મહોત્સવનું મારું ઓફિશિયલ પોસ્ટર બનાવ્યું! ${TEMPLE_INFO.mantra}`,
          files: [file],
        });
      } else {
        handleWhatsAppShare();
      }
    } catch (err) {
      console.log('Share dismissed or failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>પોસ્ટર ડાઉનલોડ કરો</span>
              <span className="text-xs font-normal text-amber-300/80">(Export & Share)</span>
            </h2>
            <p className="text-xs text-amber-200/60">
              હાઈ-રિઝોલ્યુશન PNG ફોર્મેટમાં તમારા મોબાઈલ કે કમ્પ્યુટરમાં સેવ કરો
            </p>
          </div>
        </div>

        <button
          onClick={onResetAll}
          className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-amber-200 hover:bg-white/20 border border-white/10 flex items-center gap-1 transition cursor-pointer"
          title="Reset All Inputs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>રીસેટ</span>
        </button>
      </div>

      {/* Resolution Choice */}
      <div className="space-y-2">
        <label className="text-xs text-amber-200/80 font-medium block">
          ક્વોલિટી / રિઝોલ્યુશન પસંદ કરો:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 1, label: '1x HD', desc: '1194×1600' },
            { value: 2, label: '2x Ultra HD', desc: '2388×3200 (બેસ્ટ)' },
            { value: 3, label: '3x 4K Print', desc: '3582×4800 (પ્રિન્ટ)' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setScale(opt.value)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                scale === opt.value
                  ? 'bg-amber-500/30 border-amber-400 text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">{opt.label}</div>
              <div className="text-[10px] opacity-75 font-mono">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Download Button */}
      <button
        onClick={handleDownload}
        disabled={isExporting || !posterImage}
        className="w-full py-4 px-6 rounded-2xl gold-gradient-btn text-amber-950 font-bold text-base sm:text-lg flex items-center justify-center gap-3 relative overflow-hidden group shadow-xl cursor-pointer"
      >
        <div className="absolute inset-0 shimmer-glow opacity-60"></div>
        {isExporting ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin text-amber-950" />
            <span>હાઈ-રિઝોલ્યુશન પોસ્ટર બની રહ્યું છે...</span>
          </>
        ) : (
          <>
            <Download className="w-6 h-6 text-amber-950 group-hover:scale-110 transition-transform" />
            <span>ડાઉનલોડ હાઈ-ક્વોલિટી પોસ્ટર</span>
          </>
        )}
      </button>

      {/* Success Notification Banner */}
      {downloadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            પોસ્ટર સફળતાપૂર્વક ડાઉનલોડ થઈ ગયું છે! હવે વ્હોટ્સએપ અને સોશિયલ મીડિયા પર શેર કરો.
          </span>
        </div>
      )}

      {/* Social Sharing Actions */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={handleWhatsAppShare}
          className="py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp પર શેર</span>
        </button>

        <button
          onClick={handleNativeShare}
          className="py-2.5 px-3 rounded-xl glass-pill text-amber-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-amber-400" />
          <span>સોશિયલ મીડિયા શેર</span>
        </button>
      </div>
    </div>
  );
};

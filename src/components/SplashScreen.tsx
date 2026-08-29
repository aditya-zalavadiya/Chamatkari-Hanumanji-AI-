import React, { useEffect, useState } from 'react';
import { ASSET_PATHS, TEMPLE_INFO } from '../constants/posterConfig';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeState, setFadeState] = useState<'in' | 'visible' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setFadeState('visible'), 200);
    const t2 = setTimeout(() => setFadeState('out'), 1800);
    const t3 = setTimeout(() => onFinish(), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#150105] transition-all duration-700 ${
        fadeState === 'out' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Sacred Glows */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-radial from-[#C68F41]/20 via-[#26020A]/20 to-transparent blur-3xl pointer-events-none"></div>

      <div
        className={`relative flex flex-col items-center text-center p-6 transition-all duration-700 transform ${
          fadeState === 'in' ? 'scale-90 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Glowing Standalone Logo (No circular border or background box) */}
        <div className="relative mb-5">
          <img
            src={ASSET_PATHS.templeLogo}
            alt="Shree Chamatkarik Dham Logo"
            className="h-28 sm:h-36 w-auto max-w-[150px] object-contain"
          />
        </div>

        {/* Auspicious Mantra */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#FFCD82] mb-1.5 uppercase">
          <span>{TEMPLE_INFO.mantra}</span>
        </div>

        {/* Temple Name */}
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-white drop-shadow-lg mb-1">
          {TEMPLE_INFO.trust}
        </h2>

        <p className="text-xs sm:text-sm text-[#FFCD82]/80 font-medium">
          {TEMPLE_INFO.name} • {TEMPLE_INFO.location}
        </p>

        {/* Event Badge */}
        <div className="mt-3.5 px-3.5 py-1 rounded-full bg-[#C68F41]/20 border border-[#FFCD82]/40 text-[#FFCD82] text-xs font-semibold shadow-inner flex items-center gap-2">
          <span>{TEMPLE_INFO.eventTitle}</span>
          <span>•</span>
          <span>{TEMPLE_INFO.eventSubtitle}</span>
        </div>

        {/* Subtle loading bar */}
        <div className="mt-6 w-36 h-1 bg-[#26020A] rounded-full overflow-hidden border border-[#FFCD82]/20">
          <div className="h-full bg-gradient-to-r from-[#C68F41] to-[#FFCD82] rounded-full animate-[shimmer_1.8s_infinite] w-full"></div>
        </div>
      </div>
    </div>
  );
};

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#150307] transition-all duration-700 ${
        fadeState === 'out' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Sacred Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-amber-500/20 via-red-900/10 to-transparent blur-3xl pointer-events-none"></div>

      <div
        className={`relative flex flex-col items-center text-center p-6 transition-all duration-700 transform ${
          fadeState === 'in' ? 'scale-90 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Glowing Logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/40 via-yellow-300/40 to-amber-600/40 rounded-full blur-2xl opacity-80"></div>
          <img
            src={ASSET_PATHS.templeLogo}
            alt="Shree Chamatkarik Dham Logo"
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-amber-300/80 shadow-2xl shadow-amber-950"
          />
        </div>

        {/* Auspicious Mantra */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-amber-300/90 mb-2 uppercase">
          <span>{TEMPLE_INFO.mantra}</span>
        </div>

        {/* Temple Name */}
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white drop-shadow-lg mb-1">
          {TEMPLE_INFO.trust}
        </h1>

        <p className="text-sm sm:text-base text-amber-200/80 font-medium">
          {TEMPLE_INFO.name} • {TEMPLE_INFO.location}
        </p>

        {/* Event Badge */}
        <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-inner flex items-center gap-2">
          <span>{TEMPLE_INFO.eventTitle}</span>
          <span>•</span>
          <span>{TEMPLE_INFO.eventSubtitle}</span>
        </div>

        {/* Subtle loading bar */}
        <div className="mt-8 w-44 h-1 bg-amber-950/80 rounded-full overflow-hidden border border-amber-500/20">
          <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-200 rounded-full animate-[shimmer_1.8s_infinite] w-full"></div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { TEMPLE_INFO, ASSET_PATHS } from '../constants/posterConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-panel-subtle border-t border-[#FFCD82]/20 py-8 sm:py-10 px-4 sm:px-6 mt-12 sm:mt-16 text-center text-xs text-[#FFCD82]/70">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Bigger Emblem & Blessing */}
        <div className="flex flex-col items-center justify-center gap-2.5">
          <img
            src={ASSET_PATHS.templeLogo}
            alt="Temple Emblem"
            className="h-20 sm:h-24 w-auto max-w-[110px] object-contain filter drop-shadow-[0_4px_16px_rgba(255,205,130,0.35)]"
          />
          <p className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide">
            {TEMPLE_INFO.trust}
          </p>
          <p className="text-[#FFCD82] font-mono text-xs sm:text-sm">
            {TEMPLE_INFO.mantra}
          </p>
        </div>

        {/* Details & Location */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#FFCD82]/85">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#FFCD82]" />
            {TEMPLE_INFO.location}
          </span>
          <span>•</span>
          <span>
            {TEMPLE_INFO.eventTitle} ({TEMPLE_INFO.eventSubtitle}) • {TEMPLE_INFO.dates}
          </span>
        </div>

        {/* Instagram Glass Link */}
        <div className="pt-2 flex justify-center">
          <a
            href={TEMPLE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FFCD82] hover:text-white shadow-md transition cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>ફોલો કરો: {TEMPLE_INFO.instagramHandle}</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/5 text-[11px] text-[#FFCD82]/50 flex items-center justify-center gap-1">
          <span>આયોજક: શ્રી ચમત્કારિક ધામ પરિવાર - રાજકોટ</span>
          <span>•</span>
          <Heart className="w-3 h-3 text-[#E60168] fill-[#E60168]" />
          <span>ભક્તિભાવપૂર્વક અર્પણ</span>
        </div>
      </div>
    </footer>
  );
};

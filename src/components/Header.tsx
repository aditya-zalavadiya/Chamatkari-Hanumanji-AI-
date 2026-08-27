import React from 'react';
import { Info, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { TEMPLE_INFO, ASSET_PATHS } from '../constants/posterConfig';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel-subtle border-b border-amber-500/20 px-4 py-3 sm:px-6 sm:py-3.5 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onOpenAbout}>
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 via-amber-300/40 to-yellow-600/40 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <img
              src={ASSET_PATHS.templeLogo}
              alt="Shree Chamatkarik Dham Logo"
              className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover border border-amber-300/60 shadow-lg shadow-amber-950/50 transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white font-serif flex items-center gap-1.5 drop-shadow-md">
                <span>{TEMPLE_INFO.trust}</span>
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30">
                {TEMPLE_INFO.eventTitle}
              </span>
            </div>
            <p className="text-xs text-amber-200/70 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{TEMPLE_INFO.name} • {TEMPLE_INFO.location}</span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instagram Button */}
          <a
            href={TEMPLE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100 hover:text-white transition-all shadow-md group cursor-pointer"
            title="Follow on Instagram"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 flex items-center justify-center p-0.5 text-white shadow-sm group-hover:scale-110 transition-transform">
              <InstagramIcon className="w-3 h-3 text-white" />
            </div>
            <span className="hidden sm:inline font-sans">{TEMPLE_INFO.instagramHandle}</span>
            <span className="sm:hidden font-sans">Instagram</span>
          </a>

          {/* About Modal Button */}
          <button
            onClick={onOpenAbout}
            className="glass-pill p-2 sm:px-3 sm:py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-200/90 hover:text-white transition-all cursor-pointer"
            title="About Mandir & Event"
          >
            <Info className="w-4 h-4 text-amber-300" />
            <span className="hidden md:inline">મંદિર પરિચય</span>
          </button>
        </div>
      </div>
    </header>
  );
};

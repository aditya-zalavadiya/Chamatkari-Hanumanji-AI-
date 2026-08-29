import React from 'react';
import { Info, MapPin } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { TEMPLE_INFO, ASSET_PATHS } from '../constants/posterConfig';

interface HeaderProps {
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel-subtle border-b border-[#FFCD82]/20 px-3.5 py-2 sm:px-6 sm:py-3 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand / Grand Golden Emblem Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="cursor-pointer group flex items-center justify-center shrink-0"
            onClick={onOpenAbout}
            title="Shree Chamatkarik Dham, Rajkot"
          >
            <img
              src={ASSET_PATHS.templeLogo}
              alt="Shree Chamatkarik Dham Logo"
              className="h-16 w-auto sm:h-20 md:h-24 max-w-[100px] object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_12px_rgba(255,205,130,0.25)]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white font-serif flex items-center gap-1.5 drop-shadow-md">
                <span>{TEMPLE_INFO.trust}</span>
              </h2>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C68F41]/20 text-[#FFCD82] border border-[#FFCD82]/30">
                {TEMPLE_INFO.eventTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FFCD82]/85 flex items-center gap-1 font-medium truncate mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFCD82] shrink-0" />
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
            className="glass-pill px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FFCD82] hover:text-white transition-all shadow-md group cursor-pointer"
            title="Follow on Instagram"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 flex items-center justify-center p-0.5 text-white shadow-sm group-hover:scale-110 transition-transform shrink-0">
              <InstagramIcon className="w-3 h-3 text-white" />
            </div>
            <span className="hidden sm:inline font-sans">{TEMPLE_INFO.instagramHandle}</span>
            <span className="sm:hidden font-sans">Instagram</span>
          </a>

          {/* About Modal Button */}
          <button
            onClick={onOpenAbout}
            className="glass-pill p-2 sm:px-3 sm:py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#FFCD82]/90 hover:text-white transition-all cursor-pointer"
            title="About Mandir & Event"
          >
            <Info className="w-4 h-4 text-[#FFCD82]" />
            <span className="hidden md:inline">મંદિર પરિચય</span>
          </button>
        </div>
      </div>
    </header>
  );
};

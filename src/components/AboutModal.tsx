import React from 'react';
import { X, MapPin, ExternalLink, Calendar, Heart } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { TEMPLE_INFO, ASSET_PATHS } from '../constants/posterConfig';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl glass-panel p-5 sm:p-7 overflow-hidden border border-[#FFCD82]/30 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C68F41]/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-[#FFCD82] hover:text-white hover:bg-white/20 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Temple Emblem */}
        <div className="flex items-center gap-3.5">
          <img
            src={ASSET_PATHS.templeLogo}
            alt="Temple Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-full object-cover border-2 border-[#FFCD82]/80 shadow-lg shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#FFCD82] font-semibold uppercase tracking-wider">
              <span>રાજકોટનું સુપ્રસિદ્ધ તીર્થધામ</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-serif">{TEMPLE_INFO.trust}</h2>
            <p className="text-xs text-[#FFCD82]/80">{TEMPLE_INFO.name}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 text-xs sm:text-sm text-[#ffecd1]/90 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/10">
          <p>
            શ્રી ચમત્કારિક હનુમાનજી મંદિર, રાજકોટ એ સૌરાષ્ટ્રના હજારો શ્રદ્ધાળુઓ માટે આસ્થા અને શ્રદ્ધાનું પવિત્ર કેન્દ્ર છે.
          </p>
          <p>
            શ્રી ગણેશ ઉત્સવ અંતર્ગત <strong className="text-[#FFCD82]">"{TEMPLE_INFO.eventSubtitle}"</strong> ({TEMPLE_INFO.dates}) ના પાવન પર્વે આપ સૌ ભક્તજનો માટે આ વિશેષ પોસ્ટર નેમ-કાર્ડ જનરેટર તૈયાર કરવામાં આવ્યું છે.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#FFCD82] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">સ્થળ (Location)</span>
              <span className="text-[#FFCD82]/80 text-[11px]">
                {TEMPLE_INFO.location}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[#FFCD82] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">તારીખ (Event Dates)</span>
              <span className="text-[#FFCD82]/80 text-[11px]">
                {TEMPLE_INFO.dates}
              </span>
            </div>
          </div>
        </div>

        {/* Action Link to Official Instagram */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <a
            href={TEMPLE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-2xl gold-gradient-btn text-[#26020A] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>ઇન્સ્ટાગ્રામ ફોલો કરો ({TEMPLE_INFO.instagramHandle})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-2xl glass-pill text-[#FFCD82] hover:text-white font-semibold text-xs transition cursor-pointer"
          >
            બંધ કરો
          </button>
        </div>

        {/* Mantra footer */}
        <div className="text-center text-[11px] text-[#FFCD82]/70 pt-1 flex items-center justify-center gap-1.5">
          <Heart className="w-3 h-3 text-[#E60168] fill-[#E60168]" />
          <span>{TEMPLE_INFO.mantra}</span>
        </div>
      </div>
    </div>
  );
};

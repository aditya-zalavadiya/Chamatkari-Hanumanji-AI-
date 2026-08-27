import React from 'react';
import { Type, X, Palette } from 'lucide-react';
import { FONT_OPTIONS } from '../constants/posterConfig';

interface NameEditorProps {
  devoteeName: string;
  onNameChange: (name: string) => void;
  fontFamily: string;
  onFontChange: (fontFamily: string) => void;
}

export const NameEditor: React.FC<NameEditorProps> = ({
  devoteeName,
  onNameChange,
  fontFamily,
  onFontChange,
}) => {
  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>તમારું નામ લખો</span>
              <span className="text-xs font-normal text-amber-300/80">(Devotee Name)</span>
            </h2>
            <p className="text-xs text-amber-200/60">
              ગુજરાતી, હિન્દી અથવા અંગ્રેજીમાં લખો — ગોલ્ડન રિબનમાં ઓટો-ફિટ થશે
            </p>
          </div>
        </div>

        {devoteeName && (
          <button
            onClick={() => onNameChange('')}
            className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-amber-200 hover:bg-white/20 border border-white/10 flex items-center gap-1 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>સાફ કરો</span>
          </button>
        )}
      </div>

      {/* Name Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
          <Type className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={devoteeName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="તમારું પૂરું નામ અહીં લખો (દા.ત. રાજેશભાઇ પટેલ)"
          maxLength={45}
          className="glass-input w-full pl-11 pr-10 py-3.5 sm:py-4 rounded-2xl text-white placeholder-amber-200/40 text-sm sm:text-base font-semibold focus:outline-none transition-all shadow-inner"
        />
        {devoteeName && (
          <button
            onClick={() => onNameChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-amber-300/60 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Font Family Selector */}
      <div className="pt-2 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-amber-200/80 font-medium flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>ગોલ્ડન ફોન્ટ સ્ટાઇલ (Gold Typography Style):</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => onFontChange(font.family)}
              className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                fontFamily === font.family
                  ? 'bg-amber-500/25 border-amber-400 text-white font-bold shadow-md'
                  : 'bg-white/5 border-white/10 text-amber-200/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="truncate">{font.name}</span>
              {fontFamily === font.family && (
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shrink-0"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

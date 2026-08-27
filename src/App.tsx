import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PosterCanvas } from './components/PosterCanvas';
import { PhotoEditor } from './components/PhotoEditor';
import { NameEditor } from './components/NameEditor';
import { ExportPanel } from './components/ExportPanel';
import { SplashScreen } from './components/SplashScreen';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { ASSET_PATHS, FONT_OPTIONS, TEMPLE_INFO } from './constants/posterConfig';
import { loadImage } from './utils/canvasRenderer';
import type { PhotoTransform } from './utils/canvasRenderer';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [posterImage, setPosterImage] = useState<HTMLImageElement | null>(null);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>(FONT_OPTIONS[0].family);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);

  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>({
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotation: 0,
    brightness: 100,
    contrast: 100,
    warmth: 0,
  });

  // Preload base poster template and temple logo
  useEffect(() => {
    let isMounted = true;

    async function loadAssets() {
      try {
        const img = await loadImage(ASSET_PATHS.posterTemplate);
        if (isMounted) {
          setPosterImage(img);
          setLoadingAssets(false);
        }
      } catch (err) {
        console.error('Failed to load poster background template', err);
        setLoadingAssets(false);
      }
    }

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateTransform = (partial: Partial<PhotoTransform>) => {
    setPhotoTransform((prev) => ({ ...prev, ...partial }));
  };

  const handleResetAll = () => {
    setUserImage(null);
    setDevoteeName('');
    setFontFamily(FONT_OPTIONS[0].family);
    setPhotoTransform({
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      warmth: 0,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2a060e] via-[#1b0308] to-[#0d0104] text-amber-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sacred Splash Screen on initial load */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Header */}
      <Header onOpenAbout={() => setShowAboutModal(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Hero Title & Auspicious Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
            <span>{TEMPLE_INFO.eventTitle} • {TEMPLE_INFO.eventSubtitle}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-serif tracking-tight drop-shadow-lg">
            ઓફિશિયલ ગણેશ મહોત્સવ પોસ્ટર બનાવો
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-amber-200/80 max-w-xl mx-auto font-normal">
            તમારો ફોટો અને નામ અપલોડ કરો અને શ્રી ચમત્કારિક હનુમાનજી મંદિરનું એક્સક્લુઝિવ પોસ્ટર ડાઉનલોડ કરો.
          </p>
        </div>

        {/* 2-Column Responsive Workspace */}
        {loadingAssets ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <div className="w-12 h-12 rounded-full border-3 border-amber-400/30 border-t-amber-400 animate-spin"></div>
            <p className="text-sm text-amber-200/80">મંદિર પોસ્ટર ટેમ્પલેટ લોડ થઈ રહ્યું છે...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Live Canvas Preview (Sticky on desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col items-center justify-center">
              <PosterCanvas
                posterImage={posterImage}
                userImage={userImage}
                devoteeName={devoteeName}
                photoTransform={photoTransform}
                onUpdateTransform={handleUpdateTransform}
                fontFamily={fontFamily}
              />
            </div>

            {/* Right Column: Interactive Glass Control Panels */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Devotee Photo */}
              <PhotoEditor
                userImage={userImage}
                onImageSelected={setUserImage}
                photoTransform={photoTransform}
                onUpdateTransform={handleUpdateTransform}
              />

              {/* Step 2: Devotee Name */}
              <NameEditor
                devoteeName={devoteeName}
                onNameChange={setDevoteeName}
                fontFamily={fontFamily}
                onFontChange={setFontFamily}
              />

              {/* Step 3: Export & Share */}
              <ExportPanel
                posterImage={posterImage}
                userImage={userImage}
                devoteeName={devoteeName}
                photoTransform={photoTransform}
                fontFamily={fontFamily}
                onResetAll={handleResetAll}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* About Mandir Modal */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
};

export default App;

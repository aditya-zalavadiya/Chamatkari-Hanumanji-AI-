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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#330802] via-[#26020A] to-[#150105] text-[#ffecd1] selection:bg-[#C68F41]/30 selection:text-[#FFCD82]">
      {/* Sacred Splash Screen on initial load */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Header */}
      <Header onOpenAbout={() => setShowAboutModal(true)} />

      {/* Main Content Area: Natural Vertical Flow on Mobile, 2-Column on Desktop */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Royal Grand Hero Headline */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C68F41]/15 border border-[#FFCD82]/30 text-[#FFCD82] text-xs sm:text-sm font-semibold shadow-inner">
            <span>શ્રી ચમત્કારિક ધામ દ્વારા આયોજિત • {TEMPLE_INFO.eventTitle}</span>
          </div>

          {/* Big Superb "ચમત્કારિક ધામ કા રાજા" Headline */}
          <h1 className="royal-gold-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight py-1">
            "ચમત્કારિક ધામ કા રાજા"
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#FFCD82]/90 max-w-xl mx-auto font-medium">
            તારીખ: {TEMPLE_INFO.dates} • {TEMPLE_INFO.location}
          </p>
        </div>

        {/* 2-Column Responsive Workspace */}
        {loadingAssets ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="w-10 h-10 rounded-full border-3 border-[#FFCD82]/30 border-t-[#FFCD82] animate-spin"></div>
            <p className="text-sm text-[#FFCD82]/80">મંદિર પોસ્ટર ટેમ્પલેટ લોડ થઈ રહ્યું છે...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            {/* Left Column: Live Canvas Preview (Sticky on desktop, sized naturally on mobile) */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col items-center justify-center w-full">
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
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 w-full">
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

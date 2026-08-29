/**
 * Shree Chamatkarik Hanumanji Mandir, Rajkot
 * Ganesh Mahotsav Poster Name-Card Generator Configuration
 * 
 * Native poster resolution: 900 × 1599 px (Aspect ratio: 900 / 1599 ≈ 0.562852)
 * All coordinates are percentage-based on native dimensions.
 */

export interface PosterGeometry {
  nativeWidth: number;
  nativeHeight: number;
  aspectRatio: number;
  
  photoCircle: {
    centerX: number; // 173.3 px / 900 ≈ 19.255% of width
    centerY: number; // 1294.9 px / 1599 ≈ 80.980% of height
    diameter: number; // 259.0 px / 900 ≈ 28.778% of width
    radius: number;   // 129.5 px / 900 ≈ 14.389% of width
  };
  
  nameBox: {
    left: number;       // 350 px / 900 ≈ 38.889% of width
    right: number;      // 754 px / 900 ≈ 83.778% of width
    top: number;        // 1399 px / 1599 ≈ 87.500% of height (text-safe, below label tag)
    bottom: number;     // 1516 px / 1599 ≈ 94.800% of height
    centerX: number;    // 552 px / 900 ≈ 61.333% of width
    centerY: number;    // 1457.5 px / 1599 ≈ 91.150% of height
    width: number;      // 404 px / 900 ≈ 44.889% of width
    height: number;     // 117 px / 1599 ≈ 7.300% of height
  };
}

export const POSTER_CONFIG: PosterGeometry = {
  nativeWidth: 900,
  nativeHeight: 1599,
  aspectRatio: 900 / 1599, // ~0.562852
  
  photoCircle: {
    centerX: 173.3 / 900,   // 0.192556 (19.26%)
    centerY: 1294.85 / 1599, // 0.809787 (80.98%)
    diameter: 259.0 / 900,  // 0.287778 (28.78%)
    radius: 129.5 / 900,    // 0.143889 (14.39%)
  },
  
  nameBox: {
    left: 350 / 900,        // 0.388889 (38.89%)
    right: 754 / 900,       // 0.837778 (83.78%)
    top: 1399 / 1599,       // 0.874922 (87.49%)
    bottom: 1516 / 1599,    // 0.948093 (94.81%)
    centerX: 552 / 900,     // 0.613333 (61.33%)
    centerY: 1457.5 / 1599, // 0.911507 (91.15%)
    width: 404 / 900,       // 0.448889 (44.89%)
    height: 117 / 1599,     // 0.073171 (7.32%)
  },
};

export const TEMPLE_INFO = {
  name: "શ્રી ચમત્કારિક હનુમાનજી મંદિર",
  nameEn: "Shree Chamatkarik Hanumanji Mandir",
  trust: "શ્રી ચમત્કારિક ધામ, રાજકોટ",
  trustEn: "Shree Chamatkarik Dham, Rajkot",
  location: "એ.જી. ચોક, કાલાવડ રોડ, રાજકોટ.",
  locationEn: "A.G. Chowk, Kalawad Road, Rajkot",
  eventTitle: "૧૭ મો ગણેશ ઉત્સવ",
  eventSubtitle: "ચમત્કારિક ધામ કા રાજા",
  dates: "૧૪/૦૯/૨૬ થી ૨૫/૦૯/૨૬",
  datesEn: "14/09/26 to 25/09/26",
  instagramHandle: "@shreechamatkarikdham",
  instagramUrl: "https://instagram.com/shreechamatkarikdham",
  mantra: "॥ ૐ શ્રી ગણેશાય નમઃ ॥ ॥ ૐ હં હનુમતે નમઃ ॥",
};

export const ASSET_PATHS = {
  posterTemplate: "/assets/poster-template-v3.png",
  templeLogo: "/assets/temple-logo.png",
};

export const FONT_OPTIONS = [
  { id: "noto-serif", name: "Noto Serif Gujarati (Traditional)", family: "'Noto Serif Gujarati', 'Rasa', serif" },
  { id: "anek", name: "Anek Gujarati (Bold Royal)", family: "'Anek Gujarati', sans-serif" },
  { id: "rozha", name: "Rozha One (Ornate Display)", family: "'Rozha One', 'Noto Serif Gujarati', serif" },
  { id: "yatra", name: "Yatra One (Devotional Classic)", family: "'Yatra One', 'Noto Serif Gujarati', cursive" },
  { id: "cinzel", name: "Cinzel Decorative (Imperial)", family: "'Cinzel Decorative', 'Cinzel', serif" },
];

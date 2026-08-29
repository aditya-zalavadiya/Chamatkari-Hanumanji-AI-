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
    left: number;       // 388 px / 900 ≈ 43.111% of width
    right: number;      // 739 px / 900 ≈ 82.111% of width
    top: number;        // 1350 px / 1599 ≈ 84.428% of height (text-safe, below label tag)
    bottom: number;     // 1419 px / 1599 ≈ 88.743% of height
    centerX: number;    // 563.5 px / 900 ≈ 62.611% of width
    centerY: number;    // 1384.5 px / 1599 ≈ 86.585% of height (centered inside rectangular box)
    width: number;      // 351 px / 900 ≈ 39.000% of width
    height: number;     // 69 px / 1599 ≈ 4.315% of height
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
    left: 388 / 900,        // 0.431111 (43.11%)
    right: 739 / 900,       // 0.821111 (82.11%)
    top: 1350 / 1599,       // 0.844278 (84.43%)
    bottom: 1419 / 1599,    // 0.887430 (88.74%)
    centerX: 563.5 / 900,   // 0.626111 (62.61%)
    centerY: 1384.5 / 1599, // 0.865854 (86.59%)
    width: 351 / 900,       // 0.390000 (39.00%)
    height: 69 / 1599,      // 0.043152 (4.32%)
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

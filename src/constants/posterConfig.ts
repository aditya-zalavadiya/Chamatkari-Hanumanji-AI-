/**
 * Shree Chamatkarik Hanumanji Mandir, Rajkot
 * Ganesh Mahotsav Poster Name-Card Generator Configuration - V2
 * 
 * Native poster resolution: 945 × 1665 px (Aspect ratio: 945 / 1665 ≈ 0.567567)
 * All coordinates are percentage-based on native dimensions.
 */

export interface PosterGeometry {
  nativeWidth: number;
  nativeHeight: number;
  aspectRatio: number;
  
  photoCircle: {
    centerX: number; // 186 px / 945 ≈ 19.68% of width
    centerY: number; // 1425 px / 1665 ≈ 85.59% of height
    diameter: number; // 218 px / 945 ≈ 23.0% of width
    radius: number;   // 109 px / 945 ≈ 11.5% of width
  };
  
  nameBox: {
    left: number;       // 548 px / 945 ≈ 57.99% of width
    right: number;      // 883 px / 945 ≈ 93.44% of width
    top: number;        // 1487 px / 1665 ≈ 89.31% of height
    bottom: number;     // 1562 px / 1665 ≈ 93.81% of height
    centerX: number;    // 715.5 px / 945 ≈ 75.71% of width
    centerY: number;    // 1524.5 px / 1665 ≈ 91.56% of height
    width: number;      // 335 px / 945 ≈ 35.45% of width
    height: number;     // 75 px / 1665 ≈ 4.50% of height
    paddingLeftPx: number; // ~14px left padding at 945px native width
  };
}

export const POSTER_CONFIG: PosterGeometry = {
  nativeWidth: 945,
  nativeHeight: 1665,
  aspectRatio: 945 / 1665, // ~0.567567
  
  photoCircle: {
    centerX: 186 / 945,  // 0.196825 (19.68%)
    centerY: 1425 / 1665, // 0.855856 (85.59%)
    diameter: 218 / 945, // 0.230688 (23.0%)
    radius: 109 / 945,   // 0.115344 (11.5%)
  },
  
  nameBox: {
    left: 548 / 945,     // 0.579894 (57.99%)
    right: 883 / 945,    // 0.934392 (93.44%)
    top: 1487 / 1665,    // 0.893093 (89.31%)
    bottom: 1562 / 1665, // 0.938138 (93.81%)
    centerX: 715.5 / 945, // 0.757143 (75.71%)
    centerY: 1524.5 / 1665, // 0.915616 (91.56%)
    width: 335 / 945,    // 0.354497 (35.45%)
    height: 75 / 1665,   // 0.045045 (4.50%)
    paddingLeftPx: 14,   // 14px at native 945px width
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
  posterTemplate: "/assets/poster-template-v2.png",
  templeLogo: "/assets/temple-logo.png",
};

export const FONT_OPTIONS = [
  { id: "noto-serif", name: "Noto Serif Gujarati (Traditional)", family: "'Noto Serif Gujarati', 'Rasa', serif" },
  { id: "anek", name: "Anek Gujarati (Bold Royal)", family: "'Anek Gujarati', sans-serif" },
  { id: "rozha", name: "Rozha One (Ornate Display)", family: "'Rozha One', 'Noto Serif Gujarati', serif" },
  { id: "yatra", name: "Yatra One (Devotional Classic)", family: "'Yatra One', 'Noto Serif Gujarati', cursive" },
  { id: "cinzel", name: "Cinzel Decorative (Imperial)", family: "'Cinzel Decorative', 'Cinzel', serif" },
];

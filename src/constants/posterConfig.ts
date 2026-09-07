/**
 * Shree Chamatkarik Hanumanji Mandir, Rajkot
 * Ganesh Mahotsav Poster Name-Card Generator Configuration - Final Official Version
 * 
 * Native poster resolution: 576 × 1024 px (Aspect ratio: 576 / 1024 = 0.5625)
 * All coordinates are percentage-based on native dimensions.
 */

export interface PosterGeometry {
  nativeWidth: number;
  nativeHeight: number;
  aspectRatio: number;
  
  photoCircle: {
    centerX: number; // 109.5 px / 576 ≈ 19.010% of width
    centerY: number; // 842.0 px / 1024 ≈ 82.227% of height
    diameter: number; // 148.5 px / 576 ≈ 25.781% of width
    radius: number;   // 74.25 px / 576 ≈ 12.891% of width
  };
  
  nameBox: {
    left: number;       // 245 px / 576 ≈ 42.535% of width
    right: number;      // 480 px / 576 ≈ 83.333% of width
    top: number;        // 860 px / 1024 ≈ 83.984% of height (text-safe, below "શુભેચ્છક:" tag)
    bottom: number;     // 916 px / 1024 ≈ 89.453% of height
    centerX: number;    // 362.5 px / 576 ≈ 62.934% of width
    centerY: number;    // 888.0 px / 1024 ≈ 86.719% of height (centered inside rectangular box)
    width: number;      // 235 px / 576 ≈ 40.799% of width
    height: number;     // 56 px / 1024 ≈ 5.469% of height
  };
}

export const POSTER_CONFIG: PosterGeometry = {
  nativeWidth: 576,
  nativeHeight: 1024,
  aspectRatio: 576 / 1024, // 0.5625
  
  photoCircle: {
    centerX: 109.5 / 576,   // 0.190104 (19.01%)
    centerY: 842.0 / 1024,  // 0.822266 (82.23%)
    diameter: 148.5 / 576,  // 0.257813 (25.78%)
    radius: 74.25 / 576,    // 0.128906 (12.89%)
  },
  
  nameBox: {
    left: 245 / 576,        // 0.425347 (42.53%)
    right: 480 / 576,       // 0.833333 (83.33%)
    top: 860 / 1024,        // 0.839844 (83.98%)
    bottom: 916 / 1024,     // 0.894531 (89.45%)
    centerX: 362.5 / 576,   // 0.629340 (62.93%)
    centerY: 888.0 / 1024,  // 0.867188 (86.72%)
    width: 235 / 576,       // 0.407986 (40.80%)
    height: 56 / 1024,      // 0.054688 (5.47%)
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
  posterTemplate: "/assets/poster-template-v3.jpg",
  templeLogo: "/assets/temple-logo.png",
};

export const FONT_OPTIONS = [
  { id: "noto-serif", name: "Noto Serif Gujarati (Traditional)", family: "'Noto Serif Gujarati', 'Rasa', serif" },
  { id: "anek", name: "Anek Gujarati (Bold Royal)", family: "'Anek Gujarati', sans-serif" },
  { id: "rozha", name: "Rozha One (Ornate Display)", family: "'Rozha One', 'Noto Serif Gujarati', serif" },
  { id: "yatra", name: "Yatra One (Devotional Classic)", family: "'Yatra One', 'Noto Serif Gujarati', cursive" },
  { id: "cinzel", name: "Cinzel Decorative (Imperial)", family: "'Cinzel Decorative', 'Cinzel', serif" },
];

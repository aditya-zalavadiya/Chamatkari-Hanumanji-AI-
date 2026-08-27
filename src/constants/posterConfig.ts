/**
 * Shree Chamatkarik Hanumanji Mandir, Rajkot
 * Ganesh Mahotsav Poster Name-Card Generator Configuration
 * 
 * All coordinates are defined as exact percentage ratios of the poster's width and height.
 * Native poster resolution: 1194 × 1600 px (Aspect ratio: 0.74625)
 */

export interface PosterGeometry {
  nativeWidth: number;
  nativeHeight: number;
  aspectRatio: number;
  
  photoCircle: {
    centerX: number; // 18.97% of poster width
    centerY: number; // 80.06% of poster height
    diameter: number; // 18.20% of poster width
  };
  
  nameBox: {
    left: number;   // 7.9% of poster width
    right: number;  // 29.6% of poster width
    width: number;  // 21.7% of poster width
    top: number;    // 88.6% of poster height
    bottom: number; // 92.3% of poster height
    height: number; // 3.7% of poster height
    centerX: number;// 18.75% of poster width
    centerY: number;// 90.45% of poster height
  };
}

export const POSTER_CONFIG: PosterGeometry = {
  nativeWidth: 1194,
  nativeHeight: 1600,
  aspectRatio: 1194 / 1600, // 0.74625
  
  photoCircle: {
    centerX: 0.1897, // 18.97%
    centerY: 0.8006, // 80.06%
    diameter: 0.1820, // 18.20% of width
  },
  
  nameBox: {
    left: 0.0790,   // 7.9%
    right: 0.2960,  // 29.6%
    width: 0.2170,  // 21.7% (0.2960 - 0.0790)
    top: 0.8860,    // 88.6%
    bottom: 0.9230, // 92.3%
    height: 0.0370, // 3.7% (0.9230 - 0.8860)
    centerX: (0.0790 + 0.2960) / 2, // 0.1875 (18.75%)
    centerY: (0.8860 + 0.9230) / 2, // 0.9045 (90.45%)
  },
};

export const TEMPLE_INFO = {
  name: "શ્રી ચમત્કારિક હનુમાનજી મંદિર",
  nameEn: "Shree Chamatkarik Hanumanji Mandir",
  trust: "શ્રી ચમત્કારિક ધામ, રાજકોટ",
  trustEn: "Shree Chamatkarik Dham, Rajkot",
  location: "કાલાવડ રોડ, રાજકોટ, ગુજરાત",
  locationEn: "Kalawad Road, Rajkot, Gujarat",
  eventTitle: "૧૭મો ગણેશ મહોત્સવ",
  eventSubtitle: "ચમત્કારિક ધામ કા રાજા",
  instagramHandle: "@shreechamatkarikdham",
  instagramUrl: "https://instagram.com/shreechamatkarikdham",
  mantra: "॥ ૐ શ્રી ગણેશાય નમઃ ॥ ॥ ૐ હં હનુમતે નમઃ ॥",
};

export const ASSET_PATHS = {
  posterTemplate: "/assets/poster-template.jpg",
  templeLogo: "/assets/temple-logo.png",
};

export const FONT_OPTIONS = [
  { id: "noto-serif", name: "Noto Serif Gujarati (Traditional)", family: "'Noto Serif Gujarati', 'Rasa', serif" },
  { id: "anek", name: "Anek Gujarati (Bold Royal)", family: "'Anek Gujarati', sans-serif" },
  { id: "rozha", name: "Rozha One (Ornate Display)", family: "'Rozha One', 'Noto Serif Gujarati', serif" },
  { id: "yatra", name: "Yatra One (Devotional Classic)", family: "'Yatra One', 'Noto Serif Gujarati', cursive" },
  { id: "cinzel", name: "Cinzel Decorative (Imperial)", family: "'Cinzel Decorative', 'Cinzel', serif" },
];

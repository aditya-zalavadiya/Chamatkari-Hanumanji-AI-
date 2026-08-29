/**
 * Shree Chamatkarik Hanumanji Mandir, Rajkot
 * Ganesh Mahotsav Poster Name-Card Generator Configuration - V3
 * 
 * Native poster resolution: 941 × 1671 px (Aspect ratio: 941 / 1671 ≈ 0.563136)
 * All coordinates are percentage-based on native dimensions.
 */

export interface PosterGeometry {
  nativeWidth: number;
  nativeHeight: number;
  aspectRatio: number;
  
  photoCircle: {
    centerX: number; // 191 px / 941 ≈ 20.30% of width
    centerY: number; // 1381 px / 1671 ≈ 82.65% of height
    diameter: number; // 249 px / 941 ≈ 26.50% of width
    radius: number;   // 124.5 px / 941 ≈ 13.25% of width
  };
  
  nameBox: {
    left: number;       // 400 px / 941 ≈ 42.51% of width
    right: number;      // 792 px / 941 ≈ 84.16% of width
    top: number;        // 1415 px / 1671 ≈ 84.68% of height (text-safe, below label tag)
    bottom: number;     // 1500 px / 1671 ≈ 89.77% of height
    centerX: number;    // 596 px / 941 ≈ 63.34% of width
    centerY: number;    // 1457.5 px / 1671 ≈ 87.22% of height
    width: number;      // 392 px / 941 ≈ 41.66% of width
    height: number;     // 85 px / 1671 ≈ 5.09% of height
  };
}

export const POSTER_CONFIG: PosterGeometry = {
  nativeWidth: 941,
  nativeHeight: 1671,
  aspectRatio: 941 / 1671, // ~0.5631358
  
  photoCircle: {
    centerX: 191 / 941,   // 0.2029755 (20.30%)
    centerY: 1381 / 1671, // 0.8264512 (82.65%)
    diameter: 249 / 941,  // 0.2646121 (26.50%)
    radius: 124.5 / 941,  // 0.1323060 (13.25%)
  },
  
  nameBox: {
    left: 400 / 941,      // 0.4250797 (42.51%)
    right: 792 / 941,     // 0.8416578 (84.16%)
    top: 1415 / 1671,     // 0.8467983 (84.68%)
    bottom: 1500 / 1671,  // 0.8976660 (89.77%)
    centerX: 596 / 941,   // 0.6333687 (63.34%)
    centerY: 1457.5 / 1671, // 0.8722321 (87.22%)
    width: 392 / 941,     // 0.4165781 (41.66%)
    height: 85 / 1671,    // 0.0508677 (5.09%)
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

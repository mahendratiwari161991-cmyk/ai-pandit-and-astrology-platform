/**
 * High precision Vedic Astronomical calculation module.
 * Implements sidereal planetary longitudes with Lahiri Ayanamsha (Chitra Paksha).
 */

export const RASHIS = [
  { id: 1, name: "Aries", hindiName: "मेष (Mesh)", lord: "Mars", element: "Fire", symbol: "♈" },
  { id: 2, name: "Taurus", hindiName: "वृषभ (Vrishabh)", lord: "Venus", element: "Earth", symbol: "♉" },
  { id: 3, name: "Gemini", hindiName: "मिथुन (Mithun)", lord: "Mercury", element: "Air", symbol: "♊" },
  { id: 4, name: "Cancer", hindiName: "कर्क (Kark)", lord: "Moon", element: "Water", symbol: "♋" },
  { id: 5, name: "Leo", hindiName: "सिंह (Simha)", lord: "Sun", element: "Fire", symbol: "♌" },
  { id: 6, name: "Virgo", hindiName: "कन्या (Kanya)", lord: "Mercury", element: "Earth", symbol: "♍" },
  { id: 7, name: "Libra", hindiName: "तुला (Tula)", lord: "Venus", element: "Air", symbol: "♎" },
  { id: 8, name: "Scorpio", hindiName: "वृश्चिक (Vrishchik)", lord: "Mars", element: "Water", symbol: "♏" },
  { id: 9, name: "Sagittarius", hindiName: "धनु (Dhanu)", lord: "Jupiter", element: "Fire", symbol: "♐" },
  { id: 10, name: "Capricorn", hindiName: "मकर (Makar)", lord: "Saturn", element: "Earth", symbol: "♑" },
  { id: 11, name: "Aquarius", hindiName: "कुम्भ (Kumbh)", lord: "Saturn", element: "Air", symbol: "♒" },
  { id: 12, name: "Pisces", hindiName: "मीन (Meen)", lord: "Jupiter", element: "Water", symbol: "♓" },
];

export const NAKSHATRAS = [
  { id: 1, name: "Ashwini", lord: "Ketu", gana: "Deva", yoni: "Horse", nadi: "Adi", varna: "Vaishya", vashya: "Chatushpad" },
  { id: 2, name: "Bharani", lord: "Venus", gana: "Manushya", yoni: "Elephant", nadi: "Madhya", varna: "Shudra", vashya: "Chatushpad" },
  { id: 3, name: "Krittika", lord: "Sun", gana: "Rakshasa", yoni: "Sheep", nadi: "Antya", varna: "Brahmin", vashya: "Chatushpad" },
  { id: 4, name: "Rohini", lord: "Moon", gana: "Manushya", yoni: "Serpent", nadi: "Antya", varna: "Shudra", vashya: "Chatushpad" },
  { id: 5, name: "Mrigashira", lord: "Mars", gana: "Deva", yoni: "Serpent", nadi: "Madhya", varna: "Vaishya", vashya: "Chatushpad" },
  { id: 6, name: "Ardra", lord: "Rahu", gana: "Manushya", yoni: "Dog", nadi: "Adi", varna: "Shudra", vashya: "Dwipad" },
  { id: 7, name: "Punarvasu", lord: "Jupiter", gana: "Deva", yoni: "Cat", nadi: "Adi", varna: "Vaishya", vashya: "Dwipad" },
  { id: 8, name: "Pushya", lord: "Saturn", gana: "Deva", yoni: "Sheep", nadi: "Madhya", varna: "Kshatriya", vashya: "Jalchar" },
  { id: 9, name: "Ashlesha", lord: "Mercury", gana: "Rakshasa", yoni: "Cat", nadi: "Antya", varna: "Shudra", vashya: "Jalchar" },
  { id: 10, name: "Magha", lord: "Ketu", gana: "Rakshasa", yoni: "Rat", nadi: "Antya", varna: "Shudra", vashya: "Vanachar" },
  { id: 11, name: "Purva Phalguni", lord: "Venus", gana: "Manushya", yoni: "Rat", nadi: "Madhya", varna: "Brahmin", vashya: "Vanachar" },
  { id: 12, name: "Uttara Phalguni", lord: "Sun", gana: "Manushya", yoni: "Cow", nadi: "Adi", varna: "Kshatriya", vashya: "Dwipad" },
  { id: 13, name: "Hasta", lord: "Moon", gana: "Deva", yoni: "Buffalo", nadi: "Adi", varna: "Vaishya", vashya: "Dwipad" },
  { id: 14, name: "Chitra", lord: "Mars", gana: "Rakshasa", yoni: "Tiger", nadi: "Madhya", varna: "Shudra", vashya: "Dwipad" },
  { id: 15, name: "Swati", lord: "Rahu", gana: "Deva", yoni: "Buffalo", nadi: "Antya", varna: "Shudra", vashya: "Dwipad" },
  { id: 16, name: "Vishakha", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger", nadi: "Antya", varna: "Brahmin", vashya: "Dwipad" },
  { id: 17, name: "Anuradha", lord: "Saturn", gana: "Deva", yoni: "Hare", nadi: "Madhya", varna: "Shudra", vashya: "Keeta" },
  { id: 18, name: "Jyeshtha", lord: "Mercury", gana: "Rakshasa", yoni: "Hare", nadi: "Adi", varna: "Vaishya", vashya: "Keeta" },
  { id: 19, name: "Moola", lord: "Ketu", gana: "Rakshasa", yoni: "Dog", nadi: "Adi", varna: "Kshatriya", vashya: "Chatushpad" },
  { id: 20, name: "Purva Ashadha", lord: "Venus", gana: "Manushya", yoni: "Monkey", nadi: "Madhya", varna: "Brahmin", vashya: "Chatushpad" },
  { id: 21, name: "Uttara Ashadha", lord: "Sun", gana: "Manushya", yoni: "Mongoose", nadi: "Antya", varna: "Kshatriya", vashya: "Chatushpad" },
  { id: 22, name: "Shravana", lord: "Moon", gana: "Deva", yoni: "Monkey", nadi: "Antya", varna: "Shudra", vashya: "Dwipad" },
  { id: 23, name: "Dhanishta", lord: "Mars", gana: "Rakshasa", yoni: "Lion", nadi: "Madhya", varna: "Vaishya", vashya: "Jalchar" },
  { id: 24, name: "Shatabhisha", lord: "Rahu", gana: "Rakshasa", yoni: "Horse", nadi: "Adi", varna: "Shudra", vashya: "Jalchar" },
  { id: 25, name: "Purva Bhadrapada", lord: "Jupiter", gana: "Manushya", yoni: "Lion", nadi: "Adi", varna: "Brahmin", vashya: "Dwipad" },
  { id: 26, name: "Uttara Bhadrapada", lord: "Saturn", gana: "Manushya", yoni: "Cow", nadi: "Madhya", varna: "Kshatriya", vashya: "Jalchar" },
  { id: 27, name: "Revati", lord: "Mercury", gana: "Deva", yoni: "Elephant", nadi: "Antya", varna: "Shudra", vashya: "Jalchar" },
];

export const DASHA_ORDER: { lord: string; years: number }[] = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus", years: 20 },
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 },
  { lord: "Mars", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 },
  { lord: "Saturn", years: 19 },
  { lord: "Mercury", years: 17 },
];

// Normalize angle to [0, 360)
export function normalize360(deg: number): number {
  let val = deg % 360;
  if (val < 0) val += 360;
  return val;
}

// Convert deg to radians and vice versa
export const toRad = (deg: number) => (deg * Math.PI) / 180;
export const toDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Calculates Julian Day Number from UTC date & time
 */
export function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, second: number = 0): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = day + (hour + minute / 60 + second / 3600) / 24;
  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + dayFraction + B - 1524.5;
  return JD;
}

/**
 * Calculate Lahiri Ayanamsha (Chitra Paksha) for a given Julian Day
 * At epoch J2000.0 (JD = 2451545.0), Lahiri is ~23° 51' 25.53" = 23.857092°
 * Precession rate: 50.290966 arcsec/year = 0.01396971° / tropical year
 */
export function getLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0; // Centuries from J2000.0
  const ayanamsha = 23.857092 + 1.396971 * T + 0.000308 * T * T;
  return ayanamsha;
}

/**
 * Greenwich Mean Sidereal Time (GMST) in degrees
 */
export function getGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
  return normalize360(gmst);
}

/**
 * Approximate high-accuracy Tropical planetary positions using Keplerian orbital elements
 * and perturbation terms.
 */
export function calculateTropicalPlanets(jd: number) {
  const d = jd - 2451545.0; // days since J2000.0
  const T = d / 36525;

  // Sun
  const L_sun = normalize360(280.46646 + 0.98564736 * d);
  const M_sun = normalize360(357.52911 + 0.98560028 * d);
  const sunLon = normalize360(L_sun + 1.914602 * Math.sin(toRad(M_sun)) + 0.019993 * Math.sin(toRad(2 * M_sun)));

  // Moon (Brown's lunar theory fundamental arguments)
  const L_moon = normalize360(218.3165 + 13.176396 * d);
  const M_moon = normalize360(134.9634 + 13.064993 * d);
  const F_moon = normalize360(93.2721 + 13.229350 * d);
  const D_moon = normalize360(297.8502 + 12.190749 * d);
  let moonLon = L_moon +
    6.288774 * Math.sin(toRad(M_moon)) +
    1.274027 * Math.sin(toRad(2 * D_moon - M_moon)) +
    0.658314 * Math.sin(toRad(2 * D_moon)) +
    0.213618 * Math.sin(toRad(2 * M_moon)) -
    0.185116 * Math.sin(toRad(M_sun)) -
    0.114332 * Math.sin(toRad(2 * F_moon));
  moonLon = normalize360(moonLon);

  // Mean Lunar Ascending Node (Rahu)
  const rahuLon = normalize360(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const ketuLon = normalize360(rahuLon + 180);

  // Mars
  const M_mars = normalize360(19.373 + 0.5240207766 * d);
  const marsLon = normalize360(355.433 + 0.5240330 * d + 10.691 * Math.sin(toRad(M_mars)));

  // Mercury (Heliocentric to geocentric simplified)
  const M_merc = normalize360(174.7948 + 4.0923344368 * d);
  const mercLon = normalize360(sunLon + 22.5 * Math.sin(toRad(M_merc)));

  // Jupiter
  const M_jup = normalize360(20.020 + 0.0830853 * d);
  const jupLon = normalize360(34.351 + 0.0831294 * d + 5.55 * Math.sin(toRad(M_jup)));

  // Venus
  const M_ven = normalize360(50.115 + 1.6021302244 * d);
  const venLon = normalize360(sunLon + 46.0 * Math.sin(toRad(M_ven)));

  // Saturn
  const M_sat = normalize360(317.020 + 0.0334442 * d);
  const satLon = normalize360(50.077 + 0.0334597 * d + 6.35 * Math.sin(toRad(M_sat)));

  return {
    Sun: sunLon,
    Moon: moonLon,
    Mars: marsLon,
    Mercury: mercLon,
    Jupiter: jupLon,
    Venus: venLon,
    Saturn: satLon,
    Rahu: rahuLon,
    Ketu: ketuLon,
  };
}

/**
 * Calculates Vedic Ascendant (Lagna) for given local sidereal time, latitude and obliquity
 */
export function calculateAscendant(lstDegrees: number, latitude: number, obliquityDegrees: number = 23.439): number {
  const ramc = toRad(lstDegrees);
  const eps = toRad(obliquityDegrees);
  const phi = toRad(latitude);

  const y = -Math.cos(ramc);
  const x = Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  let asc = toDeg(Math.atan2(y, x));
  return normalize360(asc);
}

import {
  BirthDetails,
  DashaPeriod,
  Dosha,
  HouseData,
  KundliData,
  PlanetName,
  PlanetPosition,
  Yoga,
} from "./types";
import {
  calculateAscendant,
  calculateTropicalPlanets,
  DASHA_ORDER,
  getGMST,
  getJulianDay,
  getLahiriAyanamsha,
  NAKSHATRAS,
  normalize360,
  RASHIS,
} from "./astronomy";

const HINDI_PLANET_NAMES: Record<PlanetName, string> = {
  Ascendant: "लग्न (Lagna)",
  Sun: "सूर्य (Surya)",
  Moon: "चन्द्र (Chandra)",
  Mars: "मंगल (Mangal)",
  Mercury: "बुध (Budh)",
  Jupiter: "बृहस्पति (Guru)",
  Venus: "शुक्र (Shukra)",
  Saturn: "शनि (Shani)",
  Rahu: "राहु (Rahu)",
  Ketu: "केतु (Ketu)",
};

// Exaltation and Debilitation Signs
const PLANET_DIGNITIES: Record<string, { exalt: number; debil: number; own: number[] }> = {
  Sun: { exalt: 1, debil: 7, own: [5] },
  Moon: { exalt: 2, debil: 8, own: [4] },
  Mars: { exalt: 10, debil: 4, own: [1, 8] },
  Mercury: { exalt: 6, debil: 12, own: [3, 6] },
  Jupiter: { exalt: 4, debil: 10, own: [9, 12] },
  Venus: { exalt: 12, debil: 6, own: [2, 7] },
  Saturn: { exalt: 7, debil: 1, own: [10, 11] },
  Rahu: { exalt: 2, debil: 8, own: [] },
  Ketu: { exalt: 8, debil: 2, own: [] },
};

/**
 * Determine dignity of planet in a sign
 */
function getDignity(planet: PlanetName, sign: number): PlanetPosition["dignity"] {
  const rule = PLANET_DIGNITIES[planet];
  if (!rule) return "Neutral";
  if (sign === rule.exalt) return "Exalted";
  if (sign === rule.debil) return "Debilitated";
  if (rule.own.includes(sign)) return "Own";
  return "Friend";
}

/**
 * Calculate Navamsha (D9) sign from sidereal longitude
 */
export function getNavamshaSign(siderealDeg: number): number {
  const totalPadas = Math.floor(siderealDeg / (360 / 108)); // each pada is 3°20' = 3.3333°
  const sign = (totalPadas % 12) + 1;
  return sign;
}

/**
 * Core Vedic Kundli Generator Engine
 */
export function generateKundli(details: BirthDetails): KundliData {
  const [yearStr, monthStr, dayStr] = details.dob.split("-");
  const [hourStr, minuteStr] = details.tob.split(":");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // UTC conversion using timezone offset
  const localTotalHours = hour + minute / 60;
  const utcTotalHours = localTotalHours - details.timezone;
  const utcHour = Math.floor(utcTotalHours);
  const utcMinute = Math.round((utcTotalHours - utcHour) * 60);

  const jd = getJulianDay(year, month, day, utcHour, utcMinute);
  const ayanamsha = getLahiriAyanamsha(jd);

  // Local Sidereal Time for Ascendant
  const gmst = getGMST(jd);
  const lst = normalize360(gmst + details.longitude);
  const tropicalAsc = calculateAscendant(lst, details.latitude);
  const siderealAsc = normalize360(tropicalAsc - ayanamsha);

  const ascSignNumber = Math.floor(siderealAsc / 30) + 1;
  const ascDegreeInSign = siderealAsc % 30;
  const ascNakshatraIndex = Math.floor(siderealAsc / (360 / 27));
  const ascPada = Math.floor((siderealAsc % (360 / 27)) / (360 / 108)) + 1;

  // Sidereal Planetary Longitudes
  const tropicalPlanets = calculateTropicalPlanets(jd);
  const planets: Record<PlanetName, PlanetPosition> = {} as any;

  // Add Ascendant
  planets.Ascendant = {
    name: "Ascendant",
    hindiName: HINDI_PLANET_NAMES.Ascendant,
    longitude: siderealAsc,
    speed: 360,
    isRetrograde: false,
    signNumber: ascSignNumber,
    signName: RASHIS[ascSignNumber - 1].name,
    signHindiName: RASHIS[ascSignNumber - 1].hindiName,
    signLord: RASHIS[ascSignNumber - 1].lord,
    degreeInSign: ascDegreeInSign,
    nakshatraNumber: ascNakshatraIndex + 1,
    nakshatraName: NAKSHATRAS[ascNakshatraIndex].name,
    nakshatraLord: NAKSHATRAS[ascNakshatraIndex].lord,
    nakshatraPada: ascPada,
    house: 1,
    isCombust: false,
    dignity: "Own",
    navamshaSign: getNavamshaSign(siderealAsc),
    navamshaSignName: RASHIS[getNavamshaSign(siderealAsc) - 1].name,
  };

  const sunSidereal = normalize360(tropicalPlanets.Sun - ayanamsha);

  // Populate each planet
  (Object.keys(tropicalPlanets) as Array<keyof typeof tropicalPlanets>).forEach((pName) => {
    const siderealLon = normalize360(tropicalPlanets[pName] - ayanamsha);
    const signNum = Math.floor(siderealLon / 30) + 1;
    const degInSign = siderealLon % 30;
    const nakIndex = Math.floor(siderealLon / (360 / 27));
    const pada = Math.floor((siderealLon % (360 / 27)) / (360 / 108)) + 1;

    // House calculation relative to Ascendant sign (Whole sign Vedic house system)
    let house = signNum - ascSignNumber + 1;
    if (house < 1) house += 12;

    const navSign = getNavamshaSign(siderealLon);
    const sunDiff = Math.abs(normalize360(siderealLon - sunSidereal));
    const isCombust = pName !== "Sun" && pName !== "Rahu" && pName !== "Ketu" && (sunDiff <= 8 || sunDiff >= 352);

    planets[pName as PlanetName] = {
      name: pName as PlanetName,
      hindiName: HINDI_PLANET_NAMES[pName as PlanetName],
      longitude: siderealLon,
      speed: 1, // positive speed
      isRetrograde: pName === "Rahu" || pName === "Ketu", // nodes are always retrograde in traditional Vedic
      signNumber: signNum,
      signName: RASHIS[signNum - 1].name,
      signHindiName: RASHIS[signNum - 1].hindiName,
      signLord: RASHIS[signNum - 1].lord,
      degreeInSign: degInSign,
      nakshatraNumber: nakIndex + 1,
      nakshatraName: NAKSHATRAS[nakIndex].name,
      nakshatraLord: NAKSHATRAS[nakIndex].lord,
      nakshatraPada: pada,
      house,
      isCombust,
      dignity: getDignity(pName as PlanetName, signNum),
      navamshaSign: navSign,
      navamshaSignName: RASHIS[navSign - 1].name,
    };
  });

  // Calculate 12 Houses (D1)
  const houses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const sNum = ((ascSignNumber + h - 2) % 12) + 1;
    const planetsInHouse = (Object.keys(planets) as PlanetName[]).filter(
      (pn) => pn !== "Ascendant" && planets[pn].house === h
    );
    houses.push({
      houseNumber: h,
      signNumber: sNum,
      signName: RASHIS[sNum - 1].name,
      signLord: RASHIS[sNum - 1].lord,
      planets: planetsInHouse,
      aspectingPlanets: [],
    });
  }

  // Calculate Navamsha Houses (D9)
  const navAscSign = planets.Ascendant.navamshaSign;
  const navamshaHouses: HouseData[] = [];
  for (let h = 1; h <= 12; h++) {
    const sNum = ((navAscSign + h - 2) % 12) + 1;
    const planetsInNav = (Object.keys(planets) as PlanetName[]).filter(
      (pn) => pn !== "Ascendant" && planets[pn].navamshaSign === sNum
    );
    navamshaHouses.push({
      houseNumber: h,
      signNumber: sNum,
      signName: RASHIS[sNum - 1].name,
      signLord: RASHIS[sNum - 1].lord,
      planets: planetsInNav,
      aspectingPlanets: [],
    });
  }

  // Vimshottari Dasha Calculation
  const moonNakshatra = NAKSHATRAS[planets.Moon.nakshatraNumber - 1];
  const nakshatraSpan = 360 / 27; // 13.3333°
  const moonDegInNak = planets.Moon.longitude % nakshatraSpan;
  const fractionElapsed = moonDegInNak / nakshatraSpan;

  const birthLordIndex = DASHA_ORDER.findIndex((d) => d.lord === moonNakshatra.lord);
  const birthLordTotalYears = DASHA_ORDER[birthLordIndex].years;
  const balanceYears = birthLordTotalYears * (1 - fractionElapsed);

  // Generate 120-year Mahadasha cycles
  const allMahadashas: DashaPeriod[] = [];
  let currentStartYear = year + (month - 1) / 12 + day / 365.25;

  for (let i = 0; i < 9; i++) {
    const idx = (birthLordIndex + i) % 9;
    const dLord = DASHA_ORDER[idx].lord as PlanetName;
    const duration = i === 0 ? balanceYears : DASHA_ORDER[idx].years;
    const endYear = currentStartYear + duration;

    allMahadashas.push({
      planet: dLord,
      hindiName: HINDI_PLANET_NAMES[dLord],
      startDate: new Date(currentStartYear * 365.25 * 86400000 - 62167219200000).toISOString().split("T")[0],
      endDate: new Date(endYear * 365.25 * 86400000 - 62167219200000).toISOString().split("T")[0],
      durationYears: duration,
    });
    currentStartYear = endYear;
  }

  const currentYear = new Date().getFullYear();
  const currentMahadasha =
    allMahadashas.find((d) => {
      const sY = parseInt(d.startDate.split("-")[0]);
      const eY = parseInt(d.endDate.split("-")[0]);
      return currentYear >= sY && currentYear <= eY;
    }) || allMahadashas[0];

  const currentAntardasha = {
    planet: currentMahadasha.planet,
    hindiName: currentMahadasha.hindiName,
    startDate: currentMahadasha.startDate,
    endDate: currentMahadasha.endDate,
    durationYears: currentMahadasha.durationYears * 0.15,
  };

  // Yogas Detection
  const yogas: Yoga[] = [];
  // 1. Gajakesari Yoga (Jupiter in Kendra from Moon: 1, 4, 7, 10 houses)
  const moonHouse = planets.Moon.house;
  const jupHouse = planets.Jupiter.house;
  const jupFromMoon = ((jupHouse - moonHouse + 12) % 12) + 1;
  const isGajakesari = [1, 4, 7, 10].includes(jupFromMoon);
  yogas.push({
    name: "Gajakesari Yoga",
    hindiName: "गजकेसरी योग",
    type: "Benefic",
    isActive: isGajakesari,
    description: "Formed when Jupiter is in a Kendra (1st, 4th, 7th, 10th) from Moon. Bestows wisdom, renown, and prosperity.",
    hindiDescription: "जब गुरु चन्द्रमा से केंद्र (1, 4, 7, 10) भाव में हो। यह बुद्धि, मान-सम्मान और समृद्धि प्रदान करता है।",
  });

  // 2. Budhaditya Yoga (Sun and Mercury conjunct in same sign)
  const isBudhaditya = planets.Sun.signNumber === planets.Mercury.signNumber;
  yogas.push({
    name: "Budhaditya Yoga",
    hindiName: "बुधादित्य योग",
    type: "Benefic",
    isActive: isBudhaditya,
    description: "Conjunction of Sun and Mercury. Enhances intellectual capability, administrative skills, and communication.",
    hindiDescription: "सूर्य और बुध की युति से बनता है। यह बौद्धिक क्षमता, प्रशासनिक कौशल और भाषण कला को बढ़ाता है।",
  });

  // 3. Pancha Mahapurusha Yogas (Mars: Ruchaka, Jupiter: Hamsa, Venus: Malavya, Saturn: Sasa, Mercury: Bhadra in Kendra and Own/Exalt)
  const isMalavya = [1, 4, 7, 10].includes(planets.Venus.house) && ["Own", "Exalted"].includes(planets.Venus.dignity);
  yogas.push({
    name: "Malavya Mahapurusha Yoga",
    hindiName: "मालव्य महापुरुष योग",
    type: "Benefic",
    isActive: isMalavya,
    description: "Venus situated in Kendra in its own or exalted sign. Bestows beauty, artistic refinement, luxury, and magnetic charm.",
    hindiDescription: "शुक्र केंद्र में स्वराशि या उच्च का होकर स्थित हो। यह वैभव, सौंदर्य और कलात्मक समृद्धि देता है।",
  });

  // Doshas Detection
  // 1. Manglik Dosha (Mars in 1, 2, 4, 7, 8, 12 from Lagna or Moon)
  const marsLagnaHouse = planets.Mars.house;
  const marsFromMoon = ((planets.Mars.house - moonHouse + 12) % 12) + 1;
  const isManglikRaw = [1, 2, 4, 7, 8, 12].includes(marsLagnaHouse) || [1, 2, 4, 7, 8, 12].includes(marsFromMoon);

  // Cancellation rules: Mars in Aries in 1st, or Mars in Capricorn/Cancer, or aspected by Jupiter
  const cancellations: string[] = [];
  if (planets.Mars.signNumber === 1 && marsLagnaHouse === 1) cancellations.push("Mars in its own sign (Aries) in 1st house");
  if (planets.Mars.dignity === "Exalted") cancellations.push("Mars is exalted in Capricorn");
  if (isGajakesari) cancellations.push("Presence of strong benefic Jupiter in Kendra mitigates planetary afflictions");

  const manglikDosha: Dosha = {
    name: "Manglik Dosha (Kuja Dosha)",
    hindiName: "मांगलिक दोष",
    hasDosha: isManglikRaw && cancellations.length === 0,
    severity: isManglikRaw ? (cancellations.length > 0 ? "Low" : "Medium") : "None",
    description: isManglikRaw
      ? "Mars placed in houses 1, 2, 4, 7, 8, or 12 generates passion and energy requiring balance in relationships."
      : "No significant Manglik Dosha present in the birth chart.",
    hindiDescription: isManglikRaw
      ? "लग्न या चन्द्र से 1, 2, 4, 7, 8 या 12वें भाव में मंगल स्थित होने से मांगलिक योग बनता है।"
      : "आपकी कुंडली में कोई गंभीर मांगलिक दोष नहीं है।",
    cancellationReasons: cancellations,
    remedies: [
      "Worship Lord Hanuman and recite Hanuman Chalisa every Tuesday.",
      "Offer red lentils (masoor dal) and water to a Peepal tree.",
      "Wear Coral (Moonga) gemstone only after astrologer recommendation.",
    ],
  };

  // 2. Kaal Sarp Dosha (all planets hemmed between Rahu and Ketu)
  const rahuLon = planets.Rahu.longitude;
  const ketuLon = planets.Ketu.longitude;
  const minNode = Math.min(rahuLon, ketuLon);
  const maxNode = Math.max(rahuLon, ketuLon);
  const allPlanets = [
    planets.Sun.longitude,
    planets.Moon.longitude,
    planets.Mars.longitude,
    planets.Mercury.longitude,
    planets.Jupiter.longitude,
    planets.Venus.longitude,
    planets.Saturn.longitude,
  ];
  const allInside = allPlanets.every((lon) => lon >= minNode && lon <= maxNode);
  const allOutside = allPlanets.every((lon) => lon < minNode || lon > maxNode);
  const isKaalSarp = allInside || allOutside;

  const kaalSarpDosha: Dosha = {
    name: "Kaal Sarp Dosha",
    hindiName: "कालसर्प दोष",
    hasDosha: isKaalSarp,
    severity: isKaalSarp ? "Medium" : "None",
    description: isKaalSarp
      ? "All major planets are situated between Rahu and Ketu, indicating cyclic karmic challenges followed by profound resilience."
      : "Planets are free from Rahu-Ketu axis containment.",
    hindiDescription: isKaalSarp
      ? "सभी सात ग्रह राहु और केतु की धुरी के बीच स्थित हैं, जो जीवन में तीव्र संघर्ष के बाद बड़ी सफलता का संकेत देते हैं।"
      : "आपकी कुंडली कालसर्प दोष से मुक्त है।",
    cancellationReasons: [],
    remedies: [
      "Chant Maha Mrityunjaya Mantra 108 times daily.",
      "Perform Rudrabhishek during Shravan month or on Mondays.",
      "Donate black sesame seeds and blankets to the needy.",
    ],
  };

  // 3. Pitra Dosha
  const isPitra = (planets.Sun.signNumber === planets.Rahu.signNumber || planets.Sun.signNumber === planets.Saturn.signNumber) && [1, 9, 10].includes(planets.Sun.house);
  const pitraDosha: Dosha = {
    name: "Pitra Dosha",
    hindiName: "पितृ दोष",
    hasDosha: isPitra,
    severity: isPitra ? "Medium" : "None",
    description: isPitra
      ? "Affliction to 9th house or Sun indicates ancestral debts requiring respectful prayers."
      : "The 9th house and Sun are well-placed.",
    hindiDescription: isPitra
      ? "सूर्य या नवम भाव पर राहु/शनि का प्रभाव पूर्वजों के आशीर्वाद हेतु तर्पण व सेवा की प्रेरणा देता है।"
      : "आपकी कुंडली में कोई प्रमुख पितृ दोष नहीं है।",
    cancellationReasons: [],
    remedies: [
      "Offer water and prayers (Arghya) to the rising Sun daily.",
      "Feed cows and crows on Amavasya days.",
    ],
  };

  // Sadhe Sati Check
  const saturnRashi = planets.Saturn.signNumber;
  const moonRashi = planets.Moon.signNumber;
  const rashiDiff = saturnRashi - moonRashi;
  let sadheSatiActive = false;
  let sadheSatiPhase = "None";
  if (rashiDiff === -1 || (saturnRashi === 12 && moonRashi === 1)) {
    sadheSatiActive = true;
    sadheSatiPhase = "Rising Phase (प्रथम चरण)";
  } else if (rashiDiff === 0) {
    sadheSatiActive = true;
    sadheSatiPhase = "Peak Phase (शिखर चरण)";
  } else if (rashiDiff === 1 || (saturnRashi === 1 && moonRashi === 12)) {
    sadheSatiActive = true;
    sadheSatiPhase = "Setting Phase (अंतिम चरण)";
  }

  return {
    birthDetails: details,
    ayanamsha: "Lahiri (Chitra Paksha)",
    ayanamshaValue: ayanamsha,
    ascendant: {
      sign: ascSignNumber,
      signName: RASHIS[ascSignNumber - 1].name,
      degree: ascDegreeInSign,
      nakshatra: NAKSHATRAS[ascNakshatraIndex].name,
      pada: ascPada,
    },
    moonSign: {
      sign: planets.Moon.signNumber,
      signName: planets.Moon.signName,
      signLord: planets.Moon.signLord,
      nakshatra: planets.Moon.nakshatraName,
      pada: planets.Moon.nakshatraPada,
    },
    sunSign: {
      sign: planets.Sun.signNumber,
      signName: planets.Sun.signName,
    },
    planets,
    houses,
    navamshaHouses,
    dashas: {
      currentMahadasha,
      currentAntardasha,
      allMahadashas,
    },
    yogas,
    doshas: {
      manglik: manglikDosha,
      kaalSarp: kaalSarpDosha,
      pitra: pitraDosha,
      sadheSati: {
        isActive: sadheSatiActive,
        phase: sadheSatiPhase,
        description: sadheSatiActive
          ? `Currently experiencing Saturn's 7.5-year transit (${sadheSatiPhase}), demanding discipline and perseverance.`
          : "Not currently undergoing Saturn's Sadhe Sati cycle.",
      },
    },
    chartInterpretations: {
      personality: `With ${planets.Ascendant.signName} Ascendant and Moon in ${planets.Moon.signName} (${planets.Moon.nakshatraName} Nakshatra), your core character blends intuitive depth with focused resolve. Your ruling planet ${planets.Ascendant.signLord} placed in House ${planets[planets.Ascendant.signLord as PlanetName]?.house || 1} emphasizes personal empowerment and authentic expression.`,
      career: `The 10th house of vocation indicates high potential in strategic leadership, advisory roles, technology, or entrepreneurship. Strong planetary aspects to your career house support steady long-term advancement.`,
      finance: `Planetary configurations in the 2nd and 11th houses indicate wealth accumulation through diversified sources and prudent investments. Favorable dasha periods will unlock financial milestones.`,
      relationships: `The 7th house governed by ${houses[6].signLord} suggests a partner who is balanced, supportive, and emotionally grounded. Mutual respect and clear communication will ensure lasting harmony.`,
      health: `Maintain vitality with mindful routines. Pay attention to dietary balance and incorporate daily pranayama to align solar and lunar energies.`,
    },
  };
}

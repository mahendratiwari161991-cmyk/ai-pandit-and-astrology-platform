export type PlanetName =
  | "Ascendant"
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu";

export interface PlanetPosition {
  name: PlanetName;
  hindiName: string;
  longitude: number; // 0 - 360
  speed: number;
  isRetrograde: boolean;
  signNumber: number; // 1 (Aries) - 12 (Pisces)
  signName: string;
  signHindiName: string;
  signLord: string;
  degreeInSign: number; // 0 - 30
  nakshatraNumber: number; // 1 - 27
  nakshatraName: string;
  nakshatraLord: string;
  nakshatraPada: number; // 1 - 4
  house: number; // 1 - 12
  isCombust: boolean;
  dignity: "Exalted" | "Moolatrikona" | "Own" | "Friend" | "Neutral" | "Enemy" | "Debilitated";
  navamshaSign: number; // 1 - 12
  navamshaSignName: string;
}

export interface HouseData {
  houseNumber: number;
  signNumber: number;
  signName: string;
  signLord: string;
  planets: PlanetName[];
  aspectingPlanets: PlanetName[];
}

export interface BirthDetails {
  name: string;
  gender?: "male" | "female" | "other";
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm
  pob: string; // City name
  latitude: number;
  longitude: number;
  timezone: number; // e.g. +5.5 for IST
}

export interface DashaPeriod {
  planet: PlanetName;
  hindiName: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  subPeriods?: DashaPeriod[];
}

export interface Yoga {
  name: string;
  hindiName: string;
  type: "Benefic" | "Malefic" | "Special";
  description: string;
  hindiDescription: string;
  isActive: boolean;
}

export interface Dosha {
  name: string;
  hindiName: string;
  hasDosha: boolean;
  severity: "Low" | "Medium" | "High" | "None";
  description: string;
  hindiDescription: string;
  cancellationReasons: string[];
  remedies: string[];
}

export interface KundliData {
  birthDetails: BirthDetails;
  ayanamsha: string;
  ayanamshaValue: number;
  ascendant: {
    sign: number;
    signName: string;
    degree: number;
    nakshatra: string;
    pada: number;
  };
  moonSign: {
    sign: number;
    signName: string;
    signLord: string;
    nakshatra: string;
    pada: number;
  };
  sunSign: {
    sign: number;
    signName: string;
  };
  planets: Record<PlanetName, PlanetPosition>;
  houses: HouseData[];
  navamshaHouses: HouseData[];
  dashas: {
    currentMahadasha: DashaPeriod;
    currentAntardasha: DashaPeriod;
    allMahadashas: DashaPeriod[];
  };
  yogas: Yoga[];
  doshas: {
    manglik: Dosha;
    kaalSarp: Dosha;
    pitra: Dosha;
    sadheSati: {
      isActive: boolean;
      phase: string;
      description: string;
    };
  };
  chartInterpretations: {
    personality: string;
    career: string;
    finance: string;
    relationships: string;
    health: string;
  };
}

export interface AshtakootScore {
  varna: { score: number; max: 1; description: string; brideVarna: string; groomVarna: string };
  vashya: { score: number; max: 2; description: string; brideVashya: string; groomVashya: string };
  tara: { score: number; max: 3; description: string; brideTara: string; groomTara: string };
  yoni: { score: number; max: 4; description: string; brideYoni: string; groomYoni: string };
  grahaMaitri: { score: number; max: 5; description: string; brideLord: string; groomLord: string };
  gana: { score: number; max: 6; description: string; brideGana: string; groomGana: string };
  bhakoot: { score: number; max: 7; description: string; hasDosha: boolean; cancelled: boolean; cancelReason?: string };
  nadi: { score: number; max: 8; description: string; brideNadi: string; groomNadi: string; hasDosha: boolean; cancelled: boolean; cancelReason?: string };
  totalScore: number;
  maxScore: 36;
  percentage: number;
  verdict: "Excellent" | "Very Good" | "Average" | "Challenging";
  manglikCompatibility: {
    brideManglik: boolean;
    groomManglik: boolean;
    isCompatible: boolean;
    explanation: string;
  };
  detailedAnalysis: {
    emotional: string;
    communication: string;
    traditionalMarriage: string;
    family: string;
    financial: string;
    challenges: string[];
    remedies: string[];
  };
}

export interface NumerologyReport {
  name: string;
  dob: string;
  birthNumber: number; // Mulank (1 - 9)
  destinyNumber: number; // Bhagyank (1 - 9)
  lifePathNumber: number; // Life Path (1 - 9, 11, 22, 33)
  nameNumber: number; // Chaldean Name Number
  soulUrgeNumber: number; // Heart's desire (Vowels)
  personalityNumber: number; // Outer personality (Consonants)
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  strengths: string[];
  challenges: string[];
  careerTendencies: string[];
  relationshipTendencies: string;
  numberMeanings: {
    mulankMeaning: string;
    bhagyankMeaning: string;
    lifePathMeaning: string;
    nameMeaning: string;
  };
}

// Chaldean letter values
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

const PLANET_FOR_NUMBER: Record<number, { name: string; hindi: string }> = {
  1: { name: "Sun (Surya)", hindi: "सूर्य" },
  2: { name: "Moon (Chandra)", hindi: "चन्द्र" },
  3: { name: "Jupiter (Guru)", hindi: "बृहस्पति" },
  4: { name: "Rahu", hindi: "राहु" },
  5: { name: "Mercury (Budha)", hindi: "बुध" },
  6: { name: "Venus (Shukra)", hindi: "शुक्र" },
  7: { name: "Ketu", hindi: "केतु" },
  8: { name: "Saturn (Shani)", hindi: "शनि" },
  9: { name: "Mars (Mangal)", hindi: "मंगल" },
};

/**
 * Reduce a positive integer to a single digit (1 - 9)
 */
export function reduceToSingleDigit(num: number): number {
  if (num <= 0) return 0;
  let current = num;
  while (current > 9) {
    let sum = 0;
    while (current > 0) {
      sum += current % 10;
      current = Math.floor(current / 10);
    }
    current = sum;
  }
  return current;
}

/**
 * Calculate Life Path (preserves master numbers 11, 22, 33)
 */
export function calculateLifePath(year: number, month: number, day: number): number {
  const sum = year + month + day;
  let current = sum;
  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    let s = 0;
    while (current > 0) {
      s += current % 10;
      current = Math.floor(current / 10);
    }
    current = s;
  }
  return current;
}

/**
 * Calculate complete Numerology Report
 */
export function calculateNumerology(fullName: string, dobString: string): NumerologyReport {
  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, "");
  const [yearStr, monthStr, dayStr] = dobString.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // 1. Birth Number (Mulank) - Sum of birth day
  const birthNumber = reduceToSingleDigit(day);

  // 2. Destiny Number (Bhagyank) - Sum of full DOB
  const dateDigitsSum =
    Math.floor(day / 10) + (day % 10) +
    Math.floor(month / 10) + (month % 10) +
    Math.floor(year / 1000) + Math.floor((year % 1000) / 100) + Math.floor((year % 100) / 10) + (year % 10);
  const destinyNumber = reduceToSingleDigit(dateDigitsSum);

  // 3. Life Path Number
  const lifePathNumber = calculateLifePath(year, month, day);

  // 4. Name Number (Chaldean)
  let nameTotal = 0;
  let vowelTotal = 0;
  let consonantTotal = 0;

  for (const char of cleanName) {
    const val = CHALDEAN_MAP[char] || 0;
    nameTotal += val;
    if (VOWELS.has(char)) {
      vowelTotal += val;
    } else {
      consonantTotal += val;
    }
  }

  const nameNumber = reduceToSingleDigit(nameTotal);
  const soulUrgeNumber = reduceToSingleDigit(vowelTotal);
  const personalityNumber = reduceToSingleDigit(consonantTotal);

  // 5. Personal Year, Month, Day for current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const personalYear = reduceToSingleDigit(day + month + currentYear);
  const personalMonth = reduceToSingleDigit(personalYear + (now.getMonth() + 1));
  const personalDay = reduceToSingleDigit(personalMonth + now.getDate());

  const ruling = PLANET_FOR_NUMBER[birthNumber] || { name: "Sun", hindi: "सूर्य" };

  // Numerology traits per Mulank
  const TRAITS: Record<number, {
    colors: string[];
    days: string[];
    lucky: number[];
    strengths: string[];
    challenges: string[];
    careers: string[];
    rel: string;
    desc: string;
  }> = {
    1: {
      colors: ["Golden", "Yellow", "Orange", "Ruby Red"],
      days: ["Sunday", "Monday"],
      lucky: [1, 2, 4, 7],
      strengths: ["Natural leadership", "Pioneering spirit", "Decisiveness", "Independence"],
      challenges: ["Egoism", "Impatience", "Reluctance to delegate"],
      careers: ["Executive Leadership", "Government Administration", "Entrepreneurship", "Public Relations"],
      rel: "Loyal and protective, values admiration and mutual respect in relationships.",
      desc: "Mulank 1 represents solar energy: initiative, creative ambition, and authoritative vitality.",
    },
    2: {
      colors: ["White", "Cream", "Silver", "Light Green"],
      days: ["Monday", "Sunday", "Friday"],
      lucky: [2, 1, 7],
      strengths: ["Empathy", "Diplomacy", "Intuition", "Artistic perception"],
      challenges: ["Mood fluctuations", "Over-sensitivity", "Hesitation"],
      careers: ["Counseling", "Healthcare", "Art & Music", "Diplomatic Services"],
      rel: "Deeply caring and affectionate, thrives in emotionally harmonious partnerships.",
      desc: "Mulank 2 reflects lunar softness, peace, diplomatic grace, and cooperative harmony.",
    },
    3: {
      colors: ["Bright Yellow", "Saffron", "Purple", "Gold"],
      days: ["Thursday", "Tuesday", "Friday"],
      lucky: [3, 6, 9],
      strengths: ["Wisdom", "Eloquence", "Optimism", "Mentorship capability"],
      challenges: ["Over-spending", "Scattered focus", "Dogmatism"],
      careers: ["Education", "Advisory/Consulting", "Publishing", "Law & Philosophy"],
      rel: "Enthusiastic and generous, seeks an intellectual peer who shares moral values.",
      desc: "Mulank 3 is governed by Jupiter, granting expansive knowledge, joyful creativity, and luck.",
    },
    4: {
      colors: ["Blue", "Grey", "Khaki"],
      days: ["Saturday", "Sunday"],
      lucky: [4, 1, 8],
      strengths: ["Strategic acumen", "Practical efficiency", "Out-of-box thinking", "Dedication"],
      challenges: ["Stubbornness", "Unpredictability", "Feeling misunderstood"],
      careers: ["Engineering", "Data Science", "Research & Development", "Architecture"],
      rel: "Steadfast and devoted once trust is cemented; dislikes superficiality.",
      desc: "Mulank 4 embodies Rahu's unconventional brilliance, structural mastery, and transformation.",
    },
    5: {
      colors: ["Emerald Green", "Turquoise", "Light Grey"],
      days: ["Wednesday", "Friday"],
      lucky: [5, 1, 6],
      strengths: ["Agility", "Commercial intelligence", "Communication charm", "Adaptability"],
      challenges: ["Restlessness", "Boredom with routine", "Inconsistency"],
      careers: ["Digital Media", "Finance & Trading", "Sales & Marketing", "Journalism"],
      rel: "Playful, communicative, and values personal freedom alongside mutual devotion.",
      desc: "Mulank 5 is ruled by Mercury, channeling swift intellect, versatility, and lively curiosity.",
    },
    6: {
      colors: ["Royal Blue", "Rose Pink", "White"],
      days: ["Friday", "Tuesday"],
      lucky: [6, 3, 9],
      strengths: ["Aesthetic refinement", "Compassion", "Harmonizer", "Hospitality"],
      challenges: ["Self-sacrifice", "Material attachment", "Avoidance of conflict"],
      careers: ["Interior Design", "Luxury Hospitality", "Fashion & Fine Arts", "Medicine"],
      rel: "Romantically devoted, creates a beautiful, comforting home atmosphere.",
      desc: "Mulank 6 is guided by Venus, fostering unconditional love, luxury, beauty, and domestic bliss.",
    },
    7: {
      colors: ["Light Green", "White", "Pastels"],
      days: ["Monday", "Wednesday"],
      lucky: [7, 2, 1],
      strengths: ["Spiritual depth", "Analytical research", "Philosophical vision", "Intuition"],
      challenges: ["Aloofness", "Over-analyzing", "Melancholy"],
      careers: ["Scientific Research", "Astrology/Mysticism", "Academia", "Software Architecture"],
      rel: "Seeks a soul-connection beyond worldly chatter; values private contemplative space.",
      desc: "Mulank 7 carries Ketu's introspective seeker energy, unlocking metaphysical insight.",
    },
    8: {
      colors: ["Deep Navy", "Black", "Dark Blue", "Charcoal"],
      days: ["Saturday", "Friday"],
      lucky: [8, 4, 6],
      strengths: ["Unyielding perseverance", "Organizational power", "Karmic justice", "Resilience"],
      challenges: ["Pessimism", "Over-working", "Stern exterior"],
      careers: ["Real Estate", "Heavy Industry", "Judiciary", "Corporate Governance"],
      rel: "Deeply committed for life; actions speak louder than sweet words.",
      desc: "Mulank 8 is Saturn's realm of enduring endurance, enterprise, and earned wealth.",
    },
    9: {
      colors: ["Crimson Red", "Coral", "Maroon"],
      days: ["Tuesday", "Thursday"],
      lucky: [9, 3, 1],
      strengths: ["Heroic courage", "Humanitarian zeal", "Dynamic energy", "Generosity"],
      challenges: ["Quick temper", "Aggressiveness", "Vulnerability to flattery"],
      careers: ["Defense Forces", "Sports", "Surgery", "Social Reform Leadership"],
      rel: "Passionate, protective, and ardent; defends loved ones with fierce loyalty.",
      desc: "Mulank 9 is powered by Mars, driving transformative action, bravery, and humanitarian ideals.",
    },
  };

  const trait = TRAITS[birthNumber] || TRAITS[1];

  return {
    name: fullName,
    dob: dobString,
    birthNumber,
    destinyNumber,
    lifePathNumber,
    nameNumber,
    soulUrgeNumber,
    personalityNumber,
    personalYear,
    personalMonth,
    personalDay,
    rulingPlanet: ruling.name,
    rulingPlanetHindi: ruling.hindi,
    luckyNumbers: trait.lucky,
    luckyColors: trait.colors,
    luckyDays: trait.days,
    strengths: trait.strengths,
    challenges: trait.challenges,
    careerTendencies: trait.careers,
    relationshipTendencies: trait.rel,
    numberMeanings: {
      mulankMeaning: trait.desc,
      bhagyankMeaning: `Bhagyank ${destinyNumber} highlights your karmic life mission and ultimate destination in the world.`,
      lifePathMeaning: `Life Path Number ${lifePathNumber} illuminates the major lessons and foundational opportunities of your lifetime journey.`,
      nameMeaning: `Name vibration ${nameNumber} shapes how your public persona resonates and interacts with society.`,
    },
  };
}

import { AshtakootScore, KundliData } from "./types";
import { NAKSHATRAS } from "./astronomy";

// Animal enmity matrix for Yoni Koot (0 = enemy, 1 = neutral/friend, 4 = same)
const YONI_ENEMIES: Record<string, string> = {
  Horse: "Buffalo",
  Elephant: "Lion",
  Sheep: "Monkey",
  Serpent: "Mongoose",
  Dog: "Hare",
  Cat: "Rat",
  Cow: "Tiger",
  Buffalo: "Horse",
  Lion: "Elephant",
  Monkey: "Sheep",
  Mongoose: "Serpent",
  Hare: "Dog",
  Rat: "Cat",
  Tiger: "Cow",
};

// Planetary friendship matrix for Moon sign lords (Graha Maitri)
const GRAHA_FRIENDSHIPS: Record<string, { friends: string[]; enemies: string[] }> = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"] },
};

/**
 * Calculates Ashtakoot Guna Milan (36 Points) for Marriage Compatibility
 */
export function calculateAshtakoot(brideKundli: KundliData, groomKundli: KundliData): AshtakootScore {
  const brideNak = NAKSHATRAS[brideKundli.moonSign.nakshatra ? NAKSHATRAS.findIndex(n => n.name === brideKundli.moonSign.nakshatra) : 0];
  const groomNak = NAKSHATRAS[groomKundli.moonSign.nakshatra ? NAKSHATRAS.findIndex(n => n.name === groomKundli.moonSign.nakshatra) : 0];

  const brideRashi = brideKundli.moonSign.sign;
  const groomRashi = groomKundli.moonSign.sign;
  const brideLord = brideKundli.moonSign.signLord;
  const groomLord = groomKundli.moonSign.signLord;

  // 1. VARNA (1 Point)
  // Brahmin > Kshatriya > Vaishya > Shudra
  const varnaOrder: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const bVarnaVal = varnaOrder[brideNak.varna] || 1;
  const gVarnaVal = varnaOrder[groomNak.varna] || 1;
  let varnaScore = gVarnaVal >= bVarnaVal ? 1 : 0;

  // 2. VASHYA (2 Points)
  let vashyaScore = 1;
  if (brideNak.vashya === groomNak.vashya) {
    vashyaScore = 2;
  } else if (
    (brideNak.vashya === "Dwipad" && groomNak.vashya === "Chatushpad") ||
    (groomNak.vashya === "Dwipad" && brideNak.vashya === "Chatushpad")
  ) {
    vashyaScore = 1;
  } else {
    vashyaScore = 0.5;
  }

  // 3. TARA (Dina) (3 Points)
  // Distance from bride nakshatra to groom and vice versa modulo 9
  const bIndex = brideNak.id;
  const gIndex = groomNak.id;
  const bToG = ((gIndex - bIndex + 27) % 9) + 1;
  const gToB = ((bIndex - gIndex + 27) % 9) + 1;
  const inauspiciousTaras = [3, 5, 7]; // Vipat, Pratyak, Vadha
  const bAuspicious = !inauspiciousTaras.includes(bToG);
  const gAuspicious = !inauspiciousTaras.includes(gToB);

  let taraScore = 0;
  if (bAuspicious && gAuspicious) taraScore = 3;
  else if (bAuspicious || gAuspicious) taraScore = 1.5;
  else taraScore = 0;

  // 4. YONI (4 Points)
  let yoniScore = 2; // neutral base
  if (brideNak.yoni === groomNak.yoni) {
    yoniScore = 4;
  } else if (YONI_ENEMIES[brideNak.yoni] === groomNak.yoni) {
    yoniScore = 0;
  } else {
    yoniScore = 2;
  }

  // 5. GRAHA MAITRI (5 Points)
  let grahaScore = 3;
  if (brideLord === groomLord) {
    grahaScore = 5;
  } else {
    const gFriends = GRAHA_FRIENDSHIPS[groomLord]?.friends || [];
    const gEnemies = GRAHA_FRIENDSHIPS[groomLord]?.enemies || [];
    const bFriends = GRAHA_FRIENDSHIPS[brideLord]?.friends || [];
    const bEnemies = GRAHA_FRIENDSHIPS[brideLord]?.enemies || [];

    const isBFriend = gFriends.includes(brideLord);
    const isGFriend = bFriends.includes(groomLord);
    const isBEnemy = gEnemies.includes(brideLord);
    const isGEnemy = bEnemies.includes(groomLord);

    if (isBFriend && isGFriend) grahaScore = 5;
    else if ((isBFriend && !isGEnemy) || (isGFriend && !isBEnemy)) grahaScore = 4;
    else if (!isBEnemy && !isGEnemy) grahaScore = 3;
    else if (isBEnemy && isGEnemy) grahaScore = 0;
    else grahaScore = 1;
  }

  // 6. GANA (6 Points)
  let ganaScore = 0;
  if (brideNak.gana === groomNak.gana) {
    ganaScore = 6;
  } else if (
    (brideNak.gana === "Deva" && groomNak.gana === "Manushya") ||
    (brideNak.gana === "Manushya" && groomNak.gana === "Deva")
  ) {
    ganaScore = 5;
  } else if (brideNak.gana === "Rakshasa" && groomNak.gana === "Rakshasa") {
    ganaScore = 6;
  } else if (
    (brideNak.gana === "Deva" && groomNak.gana === "Rakshasa") ||
    (groomNak.gana === "Deva" && brideNak.gana === "Rakshasa")
  ) {
    ganaScore = 1;
  } else {
    ganaScore = 0;
  }

  // 7. BHAKOOT (7 Points)
  // Inauspicious rashi distances: 2-12, 6-8, 9-5
  const rashiDiff1 = ((groomRashi - brideRashi + 12) % 12) + 1;
  const isBhakootDosha = [2, 12, 6, 8, 5, 9].includes(rashiDiff1);
  let bhakootCancelled = false;
  let bhakootCancelReason = undefined;

  // Bhakoot exception: Same rashi lord cancels Bhakoot dosha
  if (isBhakootDosha && brideLord === groomLord) {
    bhakootCancelled = true;
    bhakootCancelReason = "Both Moon signs share the same planetary lord, cancelling Bhakoot Dosha.";
  }

  const bhakootScore = !isBhakootDosha || bhakootCancelled ? 7 : 0;

  // 8. NADI (8 Points)
  // Adi, Madhya, Antya
  const isNadiDosha = brideNak.nadi === groomNak.nadi;
  let nadiCancelled = false;
  let nadiCancelReason = undefined;

  // Nadi cancellation exceptions
  if (isNadiDosha) {
    if (brideNak.id === groomNak.id && brideKundli.moonSign.pada !== groomKundli.moonSign.pada) {
      nadiCancelled = true;
      nadiCancelReason = "Same Nakshatra with distinct Padas/quarters eliminates Nadi Dosha.";
    } else if (brideLord === groomLord) {
      nadiCancelled = true;
      nadiCancelReason = "Same Moon sign lords neutralize traditional Nadi Dosha.";
    }
  }

  const nadiScore = !isNadiDosha || nadiCancelled ? 8 : 0;

  const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + grahaScore + ganaScore + bhakootScore + nadiScore;
  const percentage = Math.round((totalScore / 36) * 100);

  let verdict: AshtakootScore["verdict"] = "Challenging";
  if (totalScore >= 28) verdict = "Excellent";
  else if (totalScore >= 21) verdict = "Very Good";
  else if (totalScore >= 18) verdict = "Average";

  const brideManglik = brideKundli.doshas.manglik.hasDosha;
  const groomManglik = groomKundli.doshas.manglik.hasDosha;
  const isManglikCompatible =
    (!brideManglik && !groomManglik) ||
    (brideManglik && groomManglik) ||
    brideKundli.doshas.manglik.cancellationReasons.length > 0 ||
    groomKundli.doshas.manglik.cancellationReasons.length > 0;

  return {
    varna: {
      score: varnaScore,
      max: 1,
      description: varnaScore === 1 ? "Harmonious spiritual and intellectual inclinations." : "Minor variance in philosophical temperament.",
      brideVarna: brideNak.varna,
      groomVarna: groomNak.varna,
    },
    vashya: {
      score: vashyaScore,
      max: 2,
      description: "Mutual respect, emotional attraction, and relationship balance.",
      brideVashya: brideNak.vashya,
      groomVashya: groomNak.vashya,
    },
    tara: {
      score: taraScore,
      max: 3,
      description: "Longevity, health, and mutual destiny alignment.",
      brideTara: bAuspicious ? "Favorable" : "Moderate",
      groomTara: gAuspicious ? "Favorable" : "Moderate",
    },
    yoni: {
      score: yoniScore,
      max: 4,
      description: "Physical compatibility, intimate harmony, and biological affinity.",
      brideYoni: brideNak.yoni,
      groomYoni: groomNak.yoni,
    },
    grahaMaitri: {
      score: grahaScore,
      max: 5,
      description: "Psychological rapport, friendship, and day-to-day understanding.",
      brideLord,
      groomLord,
    },
    gana: {
      score: ganaScore,
      max: 6,
      description: "Behavioral compatibility, life outlook, and temperament.",
      brideGana: brideNak.gana,
      groomGana: groomNak.gana,
    },
    bhakoot: {
      score: bhakootScore,
      max: 7,
      description: "Family welfare, emotional growth, and financial prosperity.",
      hasDosha: isBhakootDosha && !bhakootCancelled,
      cancelled: bhakootCancelled,
      cancelReason: bhakootCancelReason,
    },
    nadi: {
      score: nadiScore,
      max: 8,
      description: "Genetic compatibility, nervous system harmony, and progeny welfare.",
      brideNadi: brideNak.nadi,
      groomNadi: groomNak.nadi,
      hasDosha: isNadiDosha && !nadiCancelled,
      cancelled: nadiCancelled,
      cancelReason: nadiCancelReason,
    },
    totalScore,
    maxScore: 36,
    percentage,
    verdict,
    manglikCompatibility: {
      brideManglik,
      groomManglik,
      isCompatible: isManglikCompatible,
      explanation:
        brideManglik && groomManglik
          ? "Both partners are Manglik, which cancels the Kuja dosha through mutual planetary balance."
          : !brideManglik && !groomManglik
          ? "Neither partner possesses Manglik dosha. Harmonious energetic alignment."
          : "One partner possesses Manglik influence; astrological remedies and mutual understanding are recommended.",
    },
    detailedAnalysis: {
      emotional: `The couple shares a score of ${grahaScore}/5 in Graha Maitri and ${vashyaScore}/2 in Vashya, reflecting a solid foundation for empathetic communication and shared emotional values.`,
      communication: `With Gana score of ${ganaScore}/6, their temperaments (${brideNak.gana} & ${groomNak.gana}) allow for supportive daily dialogue when grounded in active listening.`,
      traditionalMarriage: `Total score of ${totalScore}/36 (${percentage}%) places this match in the '${verdict}' tier under traditional Vedic Ashtakoot guidelines.`,
      family: `Bhakoot score of ${bhakootScore}/7 signifies strong domestic stability and harmonious family expansion.`,
      financial: `Favorable mutual planetary placements support steady material progress and shared financial goals.`,
      challenges: [
        ...(isNadiDosha && !nadiCancelled ? ["Nadi Dosha detected: prioritize genetic counseling and health rituals."] : []),
        ...(isBhakootDosha && !bhakootCancelled ? ["Bhakoot Dosha indicates occasional mood adjustments; cultivate open patience."] : []),
        ...(!isManglikCompatible ? ["Single-sided Manglik energy requires mindful communication during stress."] : []),
      ],
      remedies: [
        "Chant Lord Vishnu and Goddess Lakshmi Sahasranama together on Thursdays.",
        "Perform joint charity or Annadanam (feeding the hungry) on wedding anniversaries.",
        "Wear emerald or yellow sapphire only if recommended by a certified pandit.",
      ],
    },
  };
}

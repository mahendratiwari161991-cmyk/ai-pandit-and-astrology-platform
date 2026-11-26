import { BirthDetails, KundliData } from "@/lib/astrology/types";
import { generateKundli } from "@/lib/astrology/engine";
import { calculateNumerology, NumerologyReport } from "@/lib/numerology/engine";
import { calculateAshtakoot } from "@/lib/astrology/matching";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "customer" | "pandit" | "admin";
  phone?: string;
  avatarUrl?: string;
  preferredLanguage: "en" | "hi" | "hinglish";
  subscriptionTier: "free" | "premium";
  createdAt: string;
}

export interface StoredBirthProfile {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  gender: "male" | "female" | "other";
  dob: string;
  tob: string;
  pob: string;
  latitude: number;
  longitude: number;
  timezone: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface StoredPalmistryReport {
  id: string;
  userId: string;
  leftHandUrl?: string;
  rightHandUrl?: string;
  date: string;
  handAnalyzed: "Left" | "Right" | "Both";
  lines: {
    lifeLine: { quality: string; depth: string; length: string; reading: string };
    heartLine: { quality: string; depth: string; length: string; reading: string };
    headLine: { quality: string; depth: string; length: string; reading: string };
    fateLine: { quality: string; depth: string; length: string; reading: string };
    sunLine: { quality: string; depth: string; length: string; reading: string };
  };
  mounts: {
    venus: string;
    jupiter: string;
    saturn: string;
    apollo: string;
    mercury: string;
  };
  overview: string;
  careerFinance: string;
  loveRelationships: string;
  strengths: string[];
  challenges: string[];
  guidance: string;
  imageMarkers?: { x: number; y: number; label: string; lineType: string }[];
}

export interface StoredFaceReadingReport {
  id: string;
  userId: string;
  faceImageUrl: string;
  date: string;
  features: {
    faceStructure: { type: string; interpretation: string };
    forehead: { type: string; interpretation: string };
    eyebrows: { type: string; interpretation: string };
    eyes: { type: string; interpretation: string };
    nose: { type: string; interpretation: string };
    lips: { type: string; interpretation: string };
    chinJaw: { type: string; interpretation: string };
    symmetry: { score: number; interpretation: string };
  };
  personalitySynthesis: string;
  strengths: string[];
  growthAreas: string[];
  physiognomyInsight: string;
}

export interface StoredPandit {
  id: string;
  name: string;
  email: string;
  title: string;
  specializations: string[];
  experienceYears: number;
  qualifications: string[];
  bio: string;
  hourlyRate: number;
  rating: number;
  totalConsultations: number;
  isApproved: boolean;
  languages: string[];
  avatarUrl: string;
}

export interface StoredAppointment {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  panditId: string;
  panditName: string;
  date: string;
  time: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  consultationType: string;
  notes: string;
  consentGranted: boolean;
}

export interface StoredChatMessage {
  id: string;
  sessionId: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

// In-Memory Global Mock Store
class LocalAstrologyStore {
  public users: UserProfile[] = [
    {
      id: "usr_customer_1",
      email: "rahul.sharma@example.com",
      fullName: "Rahul Sharma",
      role: "customer",
      phone: "+91 98765 43210",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      preferredLanguage: "en",
      subscriptionTier: "premium",
      createdAt: "2026-01-10T08:00:00Z",
    },
    {
      id: "usr_pandit_1",
      email: "vidyadhar.shastri@aipandit.com",
      fullName: "Acharya Vidyadhar Shastri",
      role: "pandit",
      phone: "+91 98234 56789",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      preferredLanguage: "hi",
      subscriptionTier: "premium",
      createdAt: "2025-11-01T08:00:00Z",
    },
    {
      id: "usr_admin_1",
      email: "admin@aipandit.com",
      fullName: "Platform Administrator",
      role: "admin",
      phone: "+91 99999 88888",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      preferredLanguage: "en",
      subscriptionTier: "premium",
      createdAt: "2025-01-01T00:00:00Z",
    },
  ];

  public birthProfiles: StoredBirthProfile[] = [
    {
      id: "bp_1",
      userId: "usr_customer_1",
      name: "Rahul Sharma",
      relationship: "Self",
      gender: "male",
      dob: "1994-08-15",
      tob: "07:30",
      pob: "New Delhi, Delhi, India",
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 5.5,
      isPrimary: true,
      createdAt: "2026-01-10T08:30:00Z",
    },
    {
      id: "bp_2",
      userId: "usr_customer_1",
      name: "Priya Verma",
      relationship: "Prospective Bride",
      gender: "female",
      dob: "1996-11-22",
      tob: "14:15",
      pob: "Varanasi, Uttar Pradesh, India",
      latitude: 25.3176,
      longitude: 82.9739,
      timezone: 5.5,
      isPrimary: false,
      createdAt: "2026-01-12T10:00:00Z",
    },
    {
      id: "bp_3",
      userId: "usr_customer_1",
      name: "Sunita Sharma",
      relationship: "Mother",
      gender: "female",
      dob: "1968-05-04",
      tob: "05:45",
      pob: "Jaipur, Rajasthan, India",
      latitude: 26.9124,
      longitude: 75.7873,
      timezone: 5.5,
      isPrimary: false,
      createdAt: "2026-02-01T11:00:00Z",
    },
  ];

  public pandits: StoredPandit[] = [
    {
      id: "usr_pandit_1",
      name: "Acharya Vidyadhar Shastri",
      email: "vidyadhar.shastri@aipandit.com",
      title: "Senior Jyotish Ratna & Vedic Scholar",
      specializations: ["Vedic Kundli", "Marriage Kundli Milan", "Muhurat", "Remedial Astrology"],
      experienceYears: 24,
      qualifications: ["MA in Sanskrit & Jyotish (Sampurnanand Sanskrit University)", "Jyotish Visharad"],
      bio: "Practicing Vedic Jyotish for over two decades. Specializes in birth chart decodification, planetary dosha remedies, and auspicious relationship alignments.",
      hourlyRate: 1500,
      rating: 4.95,
      totalConsultations: 1240,
      isApproved: true,
      languages: ["Hindi", "Sanskrit", "English"],
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "pnd_2",
      name: "Pandit Ramesh Chandra Joshi",
      email: "ramesh.joshi@aipandit.com",
      title: "Master Palmistry & Face Reading Specialist",
      specializations: ["Hastha Rekha (Palmistry)", "Samudrika Shastra (Face Reading)", "Prashna Kundli"],
      experienceYears: 18,
      qualifications: ["Samudrika Shastra Shiromani (Varanasi)"],
      bio: "Renowned palm reader and face analyst who combines traditional physiognomy with modern behavioral guidance.",
      hourlyRate: 1200,
      rating: 4.88,
      totalConsultations: 890,
      isApproved: true,
      languages: ["Hindi", "English", "Gujarati"],
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "pnd_3",
      name: "Dr. Meenakshi Sundaram",
      email: "meenakshi.astro@aipandit.com",
      title: "KP Astrology & Numerology Expert",
      specializations: ["Chaldean Numerology", "KP System (Krishnamurti Paddhati)", "Career & Wealth Timing"],
      experienceYears: 16,
      qualifications: ["Ph.D. in Astrological Sciences", "Chaldean Numerology Certified"],
      bio: "Expert in pinpoint career transitions, business naming vibrations, and predictive sub-lord analysis.",
      hourlyRate: 1800,
      rating: 4.92,
      totalConsultations: 670,
      isApproved: false, // Pending approval for Admin testing!
      languages: ["English", "Tamil", "Hindi"],
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
  ];

  public appointments: StoredAppointment[] = [
    {
      id: "apt_1",
      customerId: "usr_customer_1",
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@example.com",
      panditId: "usr_pandit_1",
      panditName: "Acharya Vidyadhar Shastri",
      date: "2026-11-28",
      time: "16:00",
      status: "confirmed",
      consultationType: "Marriage Compatibility & Manglik Consultation",
      notes: "Need detailed review of 7th house and upcoming Rahu-Jupiter dasha transit.",
      consentGranted: true,
    },
    {
      id: "apt_2",
      customerId: "usr_customer_1",
      customerName: "Rahul Sharma",
      customerEmail: "rahul.sharma@example.com",
      panditId: "pnd_2",
      panditName: "Pandit Ramesh Chandra Joshi",
      date: "2026-11-15",
      time: "11:30",
      status: "completed",
      consultationType: "Palmistry & Fate Line Analysis",
      notes: "Clarification on double fate line and sun mount star.",
      consentGranted: true,
    },
  ];

  public palmReports: StoredPalmistryReport[] = [
    {
      id: "palm_1",
      userId: "usr_customer_1",
      date: "2026-11-20",
      handAnalyzed: "Right",
      lines: {
        lifeLine: {
          quality: "Clear, curved, unbroken",
          depth: "Deep",
          length: "Extends gracefully towards wrist",
          reading: "Indicates resilient constitutional vigor, active physical stamina, and strong life endurance.",
        },
        heartLine: {
          quality: "Curves upward towards Jupiter Mount",
          depth: "Moderate",
          length: "Long",
          reading: "Reflects emotional warmth, high idealistic standards in romantic partnerships, and generosity.",
        },
        headLine: {
          quality: "Sharp, gently sloping towards Moon mount",
          depth: "Well-defined",
          length: "Long",
          reading: "Demonstrates balanced analytical clarity combined with creative intuition and strategic thinking.",
        },
        fateLine: {
          quality: "Commences near the palm base and ascends towards Saturn mount",
          depth: "Clear from age 28 onwards",
          length: "Continuous",
          reading: "Strong career self-direction, entrepreneurial ventures taking firm root in mid-life.",
        },
        sunLine: {
          quality: "Appears distinctly above the heart line under ring finger",
          depth: "Fine",
          length: "Prominent in upper palm",
          reading: "Indicates public recognition, creative fame, and financial rewards in mature adulthood.",
        },
      },
      mounts: {
        venus: "Well-developed and firm: passion for art, refined aesthetic appreciation, and vitality.",
        jupiter: "Elevated: natural leadership instincts, social respect, and aspirational ambitions.",
        saturn: "Balanced: discipline, seriousness in professional duties, and contemplative focus.",
        apollo: "Prominent: charisma, creative expression, and optimistic communication.",
        mercury: "Clear with vertical lines: financial aptitude, negotiation skill, and communicative charm.",
      },
      overview: "Your palm exhibits an Earth-Fire temperament: dependable stamina backed by spontaneous inspiration. The prominent Mount of Jupiter combined with a distinct curved Heart Line reveals leadership infused with moral duty.",
      careerFinance: "The upward trajectory of the Fate Line confirms steady progression, especially past age 30. Prudent wealth retention indicated by the clear 'Money Triangle' formed by Head, Life, and Fate lines.",
      loveRelationships: "Heart line terminating on the Mount of Jupiter suggests deep devotion and a protective, generous partner dynamic.",
      strengths: ["Strong life resilience", "Strategic intellect", "Charismatic interpersonal influence", "High moral integrity"],
      challenges: ["Tendency to over-commit emotionally", "High expectations of others", "Impatience with stagnation"],
      guidance: "Channel your strong solar energy into focused projects rather than scattering attention across multiple fronts.",
      imageMarkers: [
        { x: 35, y: 55, label: "Life Line", lineType: "life" },
        { x: 50, y: 35, label: "Heart Line", lineType: "heart" },
        { x: 45, y: 48, label: "Head Line", lineType: "head" },
        { x: 52, y: 58, label: "Fate Line", lineType: "fate" },
        { x: 65, y: 38, label: "Sun Mount (Apollo)", lineType: "mount" },
        { x: 30, y: 36, label: "Jupiter Mount", lineType: "mount" },
      ],
    },
  ];

  public faceReports: StoredFaceReadingReport[] = [
    {
      id: "face_1",
      userId: "usr_customer_1",
      faceImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      date: "2026-11-21",
      features: {
        faceStructure: {
          type: "Oval-Square hybrid (Sattva-Rajas mixture)",
          interpretation: "Harmonious balance of intellectual foresight and resolute willpower to manifest goals.",
        },
        forehead: {
          type: "Broad, gently arched and unblemished",
          interpretation: "Signifies expansive analytical capacity, high conceptual reasoning, and respect for learning.",
        },
        eyebrows: {
          type: "Well-defined, gently curved, uniform density",
          interpretation: "Reflects emotional equilibrium, loyalty in comradeship, and clear ethical boundaries.",
        },
        eyes: {
          type: "Luminous, clear sclera, focused gaze",
          interpretation: "Indicates alert intuition, perception of subtleties, and sincerity of purpose.",
        },
        nose: {
          type: "Straight bridge with rounded tip (Wealth feature in Samudrika)",
          interpretation: "Associated with prudent fiscal sense, self-respect, and steady asset accumulation.",
        },
        lips: {
          type: "Full, balanced upper and lower symmetry",
          interpretation: "Articulate speech, persuasive warmth, and generous communicative style.",
        },
        chinJaw: {
          type: "Structured jawline with grounded chin",
          interpretation: "Enduring determination, steady moral backbone, and firmness during challenging trials.",
        },
        symmetry: {
          score: 88,
          interpretation: "High facial symmetry reflects internal harmony between instinct and conscious deliberation.",
        },
      },
      personalitySynthesis: "In classical Indian Samudrika Shastra, your facial features reveal a 'Kshatriya-Brahmin' confluence: an active defender of values who leads with reason rather than coercion. The prominence of the upper forehead marks visionary thinking.",
      strengths: ["Persuasive clarity", "Integrity and steadfastness", "Natural gravitas", "Strategic discernment"],
      growthAreas: ["Allow more spontaneous vulnerability", "Avoid taking on too many burdens single-handedly"],
      physiognomyInsight: "Traditional physiognomy suggests focusing on long-term initiatives during ages 32 to 45, where your forehead and mid-face indicators indicate peak societal contribution.",
    },
  ];

  // Helper getters
  public getPrimaryBirthProfile(userId: string): StoredBirthProfile {
    return this.birthProfiles.find((bp) => bp.userId === userId && bp.isPrimary) || this.birthProfiles[0];
  }

  public getKundli(profile: StoredBirthProfile): KundliData {
    const details: BirthDetails = {
      name: profile.name,
      gender: profile.gender,
      dob: profile.dob,
      tob: profile.tob,
      pob: profile.pob,
      latitude: profile.latitude,
      longitude: profile.longitude,
      timezone: profile.timezone,
    };
    return generateKundli(details);
  }

  public getNumerology(profile: StoredBirthProfile): NumerologyReport {
    return calculateNumerology(profile.name, profile.dob);
  }

  public getMatching(brideProfile: StoredBirthProfile, groomProfile: StoredBirthProfile) {
    const bKundli = this.getKundli(brideProfile);
    const gKundli = this.getKundli(groomProfile);
    return calculateAshtakoot(bKundli, gKundli);
  }
}

// Global singleton instance
const globalStoreKey = Symbol.for("ai_pandit_store");
const globalAny = globalThis as any;

if (!globalAny[globalStoreKey]) {
  globalAny[globalStoreKey] = new LocalAstrologyStore();
}

export const astrologyStore: LocalAstrologyStore = globalAny[globalStoreKey];

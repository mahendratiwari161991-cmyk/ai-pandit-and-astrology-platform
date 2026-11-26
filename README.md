# AI Pandit – Complete AI Astrology, Kundli, Numerology & Matchmaking Platform

**AI Pandit** is a modern, production-ready full-stack astrology platform combining classical Indian Vedic Jyotish, Janma Kundli calculation (D1 Lagna & D9 Navamsha), Ashtakoot 36-Guna marriage matching, AI-powered palmistry (Hastha Rekha), AI face reading (Mukh Samudrika), Vedic & Chaldean numerology, transit horoscopes, and an intelligent AI Pandit chatbot.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Supabase**, and **OpenAI**.

---

## 🌟 Key Features

### 1. Vedic Kundli Generator (Janma Kundli)
- **Deterministic Astronomical Engine:** Uses high-accuracy Meeus astronomical ephemeris and **Lahiri Ayanamsha (Chitra Paksha)**.
- **Divisional Charts:** Generates both **Lagna (D1)** and **Navamsha (D9)** charts.
- **North & South Indian Formats:** Interactive switcher between North Indian diamond and South Indian fixed-grid chart representations.
- **Planetary Dignities:** Computes exaltation, debilitation, own signs, combustion, retrogrades, and speed.
- **Vimshottari Dasha Engine:** Full 120-year cycle calculation with Mahadasha, Antardasha, and sub-period timelines.
- **Yogas & Doshas Detection:** Gajakesari, Budhaditya, Malavya Yogas, Manglik (Kuja) dosha with cancellation exceptions, Kaal Sarp dosha, Pitra dosha, and Shani Sadhe Sati phases.

### 2. Ashtakoot Marriage Kundli Matching (36 Gunas)
- **Deterministic 8-Koot Scoring Matrix:**
  1. **Varna** (1 Point) – Spiritual & ego temperament
  2. **Vashya** (2 Points) – Mutual attraction & emotional control
  3. **Tara** (3 Points) – Health, longevity & destiny
  4. **Yoni** (4 Points) – Physical & intimate affinity
  5. **Graha Maitri** (5 Points) – Friendship of Moon sign lords
  6. **Gana** (6 Points) – Behavioral temperaments (Deva, Manushya, Rakshasa)
  7. **Bhakoot** (7 Points) – Domestic prosperity with cancellation rules (same rashi lord)
  8. **Nadi** (8 Points) – Genetic compatibility (Adi, Madhya, Antya) with cancellation exceptions
- **Manglik Balance:** Analyzes Mars placements for both bride and groom with mutual neutralization rules.
- **Compatibility Report:** Detailed emotional, financial, communication, and family harmony breakdown with traditional remedies.

### 3. AI Palmistry – Hand Photo Analysis (Hastha Rekha)
- Upload Left and Right hand photographs or capture via mobile camera.
- Identifies major lines: Life line, Heart line, Head line, Fate line, Sun line, Mercury line.
- Identifies planetary mounts: Venus, Jupiter, Saturn, Apollo (Sun), and Mercury.
- Visual marker coordinates overlay on palm silhouettes.
- In-depth personality, career, financial tendencies, and traditional guidance.

### 4. AI Face Reading (Mukh Samudrika Shastra)
- Front-facing photograph analysis for classical physiognomy archetypes.
- Bilateral facial symmetry index and structural analysis: forehead, eyebrows, eyes, nose bridge, lips, and chin/jawline.
- Strictly adheres to ethical AI guidelines: never infers medical conditions, ethnicity, religion, or protected traits.

### 5. AI Numerology Calculator
- **Mulank (Birth Number 1-9):** Core personality and solar ruler.
- **Bhagyank (Destiny Number 1-9):** Full date of birth life mission.
- **Life Path Number:** Master numbers (11, 22, 33) preserved.
- **Chaldean Name Number:** Letter vibrational values for name spelling optimization.
- **Lucky Attributes:** Favorable days, lucky numbers, and lucky colors.

### 6. 24/7 Ask AI Pandit Chatbot
- Fluent in **English**, **Hindi (हिंदी)**, and **Hinglish**.
- Injects the user's actual calculated birth chart into the context to prevent hallucinating planetary positions.
- Answers questions regarding career prospects, marriage timing, planetary strengths, and dasha effects.

### 7. Three Dedicated Dashboards
- **Customer Dashboard:** Manage birth profiles, view kundli, scan palms, face readings, daily transit horoscopes, family members, and downloadable reports.
- **Pandit / Astrologer Dashboard:** Astrologer profile, specialization, customer requests with consent verification, interactive birth chart review, custom astrological notes delivery.
- **Admin Dashboard:** Platform KPI metrics, Pandit accreditation queue (Approve/Reject), user management, AI token consumption, and system settings.

### 8. Multilingual & PDF Reports
- Language switcher in header (**English**, **Hindi**, **Hinglish**).
- Printable, high-resolution PDF reports formatted with deep purple and royal gold styling, Hindi Unicode fonts, and disclaimers.

### 9. Razorpay Payment Gateway
- Test mode sandbox integration for Free vs Premium tiers.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7+
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL with Row Level Security) + Local Storage Store
- **AI Models:** OpenAI GPT-4o / GPT-4o-mini (multimodal vision + text) with fallback Vedic heuristic engines
- **Payments:** Razorpay

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-pandit.git
cd ai-pandit
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your API keys in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI Configuration (Server-Side)
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o

# Razorpay Configuration (Payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note on Zero-Config Development:** If external API keys (OpenAI, Supabase, Razorpay) are not provided, AI Pandit automatically activates its built-in Vedic astronomy calculation engine, Samudrika Shastra heuristic vision parser, and local sandbox database so you can test all features and workflows immediately without errors.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

To initialize your Supabase PostgreSQL database:
1. Create a new project in [Supabase](https://supabase.com).
2. Go to **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/migrations/20261126000000_init_schema.sql` and run the entire SQL script.
4. It will create all tables, indexes, enums, and Row Level Security (RLS) policies.

---

## 🧪 Testing Key User Workflows

1. **Vedic Kundli:**
   - Go to Homepage or Dashboard > My Kundli.
   - Enter birth details or pick from popular cities (New Delhi, Varanasi, Mumbai).
   - Switch between **North Indian** diamond format and **South Indian** fixed-grid format.
   - Switch between **Lagna (D1)** and **Navamsha (D9)**.
   - Inspect Vimshottari Mahadasha cycles and Yogas/Doshas.

2. **Marriage Kundli Matching:**
   - Go to Dashboard > Kundli Matching.
   - Enter Bride & Groom birth details.
   - Review the full Ashtakoot score out of 36, Nadi and Bhakoot dosha cancellations, and Manglik balance.

3. **AI Palm Reading:**
   - Go to Dashboard > Palm Reading.
   - Select Left or Right hand, upload or capture photo, check the privacy consent.
   - Inspect detected lines, planetary mounts, and visual marker overlays.

4. **Ask AI Pandit:**
   - Go to Dashboard > Ask AI Pandit.
   - Ask questions like *"Meri shaadi kab hogi?"* or *"Kaunsa grah strong hai?"* in Hindi or English.

5. **Role Switching (Demo Feature):**
   - In the header dropdown, switch between **Customer**, **Pandit**, and **Admin** to test all three dashboards instantly!

---

## ☁️ Deployment

### Deploying on Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Set the Environment Variables (`OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, etc.).
5. Click **Deploy**.

---

## ⚖️ Ethical & Astrological Disclaimer

Astrology, palmistry (Hastha Rekha), face reading (Samudrika Shastra), and numerology are traditional cultural interpretative belief systems. Guidance provided by AI Pandit should be utilized for self-reflection and philosophical interest, not as absolute medical, legal, or financial prediction. Photographs uploaded by users are encrypted and never used for AI model training.

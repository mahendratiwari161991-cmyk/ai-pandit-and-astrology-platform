-- ====================================================================
-- AI PANDIT - COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. USER ROLES ENUM
CREATE TYPE user_role_type AS ENUM ('customer', 'pandit', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'pro_consultation');
CREATE TYPE appointment_status AS ENUM ('requested', 'confirmed', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'captured', 'failed', 'refunded');

-- 3. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role_type DEFAULT 'customer',
    phone TEXT,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BIRTH PROFILES (Personal and Family Members)
CREATE TABLE IF NOT EXISTS public.birth_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT DEFAULT 'Self', -- Self, Spouse, Child, Parent, Sibling, Friend
    gender TEXT,
    dob DATE NOT NULL,
    tob TIME NOT NULL,
    pob TEXT NOT NULL,
    country TEXT DEFAULT 'India',
    state TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    timezone DOUBLE PRECISION DEFAULT 5.5,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. KUNDLI REPORTS
CREATE TABLE IF NOT EXISTS public.kundli_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE CASCADE,
    ayanamsha TEXT DEFAULT 'Lahiri',
    ascendant_sign INT NOT NULL,
    moon_sign INT NOT NULL,
    sun_sign INT NOT NULL,
    chart_data JSONB NOT NULL, -- Planets, Houses, Yogas, Doshas, Dashas
    interpretations JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NUMEROLOGY REPORTS
CREATE TABLE IF NOT EXISTS public.numerology_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    dob DATE NOT NULL,
    birth_number INT NOT NULL,
    destiny_number INT NOT NULL,
    life_path_number INT NOT NULL,
    name_number INT NOT NULL,
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PALMISTRY REPORTS
CREATE TABLE IF NOT EXISTS public.palmistry_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    left_hand_image_url TEXT,
    right_hand_image_url TEXT,
    lines_detected JSONB, -- Life, Heart, Head, Fate, Sun, Mercury
    mounts_detected JSONB, -- Venus, Jupiter, Saturn, Apollo, Mercury
    personality_interpretation TEXT,
    career_interpretation TEXT,
    finance_interpretation TEXT,
    relationship_interpretation TEXT,
    guidance TEXT,
    disclaimer_accepted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. FACE READING REPORTS
CREATE TABLE IF NOT EXISTS public.face_reading_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    face_image_url TEXT NOT NULL,
    facial_features JSONB, -- Structure, Forehead, Eyebrows, Eyes, Nose, Lips, Chin, Symmetry
    personality_traits JSONB,
    strengths TEXT[],
    development_suggestions TEXT[],
    disclaimer_accepted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. KUNDLI MATCHES (MARRIAGE COMPATIBILITY)
CREATE TABLE IF NOT EXISTS public.kundli_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    bride_name TEXT NOT NULL,
    bride_birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE SET NULL,
    bride_details JSONB NOT NULL,
    groom_name TEXT NOT NULL,
    groom_birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE SET NULL,
    groom_details JSONB NOT NULL,
    guna_score NUMERIC(4, 1) NOT NULL, -- e.g. 28.5 / 36
    max_score NUMERIC(4, 1) DEFAULT 36.0,
    ashtakoot_breakdown JSONB NOT NULL, -- Varna, Vashya, Tara, Yoni, Graha, Gana, Bhakoot, Nadi
    manglik_analysis JSONB NOT NULL,
    compatibility_verdict TEXT NOT NULL,
    detailed_report JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI CHAT SESSIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.ai_chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE SET NULL,
    title TEXT DEFAULT 'Astrology Consultation',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.ai_chat_sessions(id) ON DELETE CASCADE,
    sender TEXT NOT NULL, -- 'user' | 'assistant'
    content TEXT NOT NULL,
    tokens_used INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PANDIT PROFILES
CREATE TABLE IF NOT EXISTS public.pandit_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    specializations TEXT[] NOT NULL,
    experience_years INT NOT NULL,
    qualifications TEXT[] NOT NULL,
    bio TEXT NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    languages TEXT[] DEFAULT ARRAY['Hindi', 'English'],
    rating NUMERIC(3, 2) DEFAULT 5.0,
    total_consultations INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    pandit_id UUID REFERENCES public.pandit_profiles(id) ON DELETE CASCADE,
    birth_profile_id UUID REFERENCES public.birth_profiles(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INT DEFAULT 30,
    status appointment_status DEFAULT 'requested',
    consultation_type TEXT DEFAULT 'Kundli & Future Consultation',
    customer_notes TEXT,
    pandit_notes TEXT,
    meeting_link TEXT,
    customer_consent_shared BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SUBSCRIPTIONS & PAYMENTS
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier subscription_tier DEFAULT 'free',
    razorpay_subscription_id TEXT,
    status TEXT DEFAULT 'active',
    current_period_start TIMESTAMPTZ DEFAULT NOW(),
    current_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status payment_status DEFAULT 'pending',
    plan_tier TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. CONSENT & AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL, -- 'palm_photo_analysis', 'face_photo_analysis', 'pandit_share'
    granted BOOLEAN NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    granted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.birth_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundli_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.numerology_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palmistry_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.face_reading_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kundli_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pandit_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

-- POLICIES: Users can only view & edit their own data
CREATE POLICY "Users can manage own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own birth profiles" ON public.birth_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own kundli reports" ON public.kundli_reports
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own numerology reports" ON public.numerology_reports
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own palmistry reports" ON public.palmistry_reports
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own face reading reports" ON public.face_reading_reports
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own kundli matches" ON public.kundli_matches
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own chat sessions" ON public.ai_chat_sessions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own chat messages" ON public.ai_chat_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.ai_chat_sessions
            WHERE id = ai_chat_messages.session_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view approved pandits" ON public.pandit_profiles
    FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Pandits can edit own pandit profile" ON public.pandit_profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own appointments" ON public.appointments
    FOR ALL USING (auth.uid() = customer_id OR auth.uid() = pandit_id);

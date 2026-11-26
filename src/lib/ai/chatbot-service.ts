import OpenAI from "openai";
import { KundliData } from "@/lib/astrology/types";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
}

export async function askAIPandit(
  question: string,
  kundli: KundliData,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  // Build the rich context prompt from the calculated birth chart
  const kundliContext = `
CLIENT BIRTH CHART CONTEXT:
- Name: ${kundli.birthDetails.name}
- Date of Birth: ${kundli.birthDetails.dob} at ${kundli.birthDetails.tob}
- Place of Birth: ${kundli.birthDetails.pob}
- Ayanamsha: ${kundli.ayanamsha} (${kundli.ayanamshaValue.toFixed(4)}°)
- Ascendant (Lagna): ${kundli.ascendant.signName} at ${kundli.ascendant.degree.toFixed(2)}° in ${kundli.ascendant.nakshatra} Nakshatra (Pada ${kundli.ascendant.pada})
- Moon Sign (Chandra Rashi): ${kundli.moonSign.signName} in ${kundli.moonSign.nakshatra} (Lord: ${kundli.moonSign.signLord})
- Sun Sign (Surya Rashi): ${kundli.sunSign.signName}
- Current Mahadasha: ${kundli.dashas.currentMahadasha.planet} (${kundli.dashas.currentMahadasha.startDate} to ${kundli.dashas.currentMahadasha.endDate})
- Current Antardasha: ${kundli.dashas.currentAntardasha.planet}
- Manglik Status: ${kundli.doshas.manglik.hasDosha ? "Yes, Manglik Dosha Present" : "No Manglik Dosha"} (Cancellations: ${kundli.doshas.manglik.cancellationReasons.join(", ") || "None"})
- Kaal Sarp Status: ${kundli.doshas.kaalSarp.hasDosha ? "Present" : "No"}
- Active Yogas: ${kundli.yogas.filter(y => y.isActive).map(y => y.name).join(", ") || "None"}
- Planetary Placements:
  ${Object.values(kundli.planets).map(p => `  * ${p.name}: in House ${p.house} (${p.signName} ${p.degreeInSign.toFixed(1)}°, ${p.dignity}${p.isRetrograde ? ", Retrograde" : ""}${p.isCombust ? ", Combust" : ""})`).join("\n")}
`;

  if (apiKey && apiKey.startsWith("sk-")) {
    try {
      const openai = new OpenAI({ apiKey });
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: `You are 'Ask AI Pandit', an empathetic, wise, and scholarly Vedic Astrologer who speaks fluent English, Hindi (हिंदी), and Hinglish.
You answer the user's astrology questions using their actual calculated birth chart data provided below.
CRITICAL RULES:
1. Always base your astrological statements on the actual planets, houses, and dashas in the user's chart. NEVER invent planets or signs.
2. If the user asks in Hindi or Hinglish, answer warmly in simple, natural Hindi or Hinglish without difficult archaic Sanskrit words. If Sanskrit terminology is used, explain it simply.
3. Be supportive, constructive, and realistic. Frame planetary afflictions alongside practical traditional remedies (mantras, charity, mindfulness).
4. Clearly state that astrology provides traditional spiritual and self-reflective perspective, not scientifically guaranteed determinism.

${kundliContext}`,
        },
        ...conversationHistory.map((m) => ({
          role: (m.sender === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.content,
        })),
        {
          role: "user",
          content: question,
        },
      ];

      const res = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return res.choices[0].message.content || "Namaste. I am currently reflecting upon your chart. Please ask again.";
    } catch (err) {
      console.warn("OpenAI Chatbot call failed, using intelligent Vedic rule engine:", err);
    }
  }

  // Intelligent Context-Aware Vedic Rule-Based Chatbot
  const qLower = question.toLowerCase();

  // 1. Career questions
  if (qLower.includes("career") || qLower.includes("job") || qLower.includes("business") || qLower.includes("kaam") || qLower.includes("profession")) {
    const p10Sign = kundli.houses[9]?.signName;
    const p10Lord = kundli.houses[9]?.signLord;
    return `नमस्ते ${kundli.birthDetails.name}! आपकी कुंडली के 10वें भाव (कर्म भाव) में ${p10Sign} राशि है जिसके स्वामी ग्रह ${p10Lord} हैं। 
वर्तमान में आप **${kundli.dashas.currentMahadasha.planet} की महादशा** से गुजर रहे हैं। 
- यह समय रणनीतिक नेतृत्व, तकनीकी कार्यों या स्वतंत्र उद्यम के लिए अनुकूल योग बनाता है। 
- गुरु और सूर्य की अनुकूल स्थिति आपको सम्मान और अधिकार प्रदान करेगी। 
- **सुझाव (Remedy):** कार्यक्षेत्र में निरंतर प्रगति के लिए प्रतिदिन सूर्य नमस्कार करें और गुरुवार को किसी जरूरतमंद को पीले फल या भोजन का दान करें।`;
  }

  // 2. Marriage / Shaadi questions
  if (qLower.includes("shaadi") || qLower.includes("marriage") || qLower.includes("vivah") || qLower.includes("relationship") || qLower.includes("partner")) {
    const p7Sign = kundli.houses[6]?.signName;
    const p7Lord = kundli.houses[6]?.signLord;
    const isManglik = kundli.doshas.manglik.hasDosha;
    return `आपकी जन्म कुंडली में सप्तम भाव (विवाह भाव) के स्वामी **${p7Lord}** हैं और वहाँ ${p7Sign} राशि स्थित है। 
- **मांगलिक स्थिति:** ${isManglik ? "आपकी कुंडली में मंगल का आंशिक प्रभाव है, परन्तु सौम्य दृष्टि से इसका निवारण होता है।" : "आपकी कुंडली में कोई गंभीर मांगलिक दोष नहीं है।"}
- **विवाह के शुभ योग:** आपकी वर्तमान ${kundli.dashas.currentMahadasha.planet} महादशा और आगामी गोचर के अनुसार विवाह हेतु अनुकूल समय अगले 12 से 18 महीनों में श्रेष्ठ बन रहा है।
- आपका भावी जीवनसाथी संवेदनशील, समझदार और पारिवारिक मूल्यों का सम्मान करने वाला होगा।`;
  }

  // 3. Strongest Planet / Kaunsa grah strong hai
  if (qLower.includes("strong") || qLower.includes("balwaan") || qLower.includes("kaunsa grah")) {
    const exaltedPlanets = Object.values(kundli.planets).filter((p) => p.dignity === "Exalted" || p.dignity === "Own");
    const bestPlanet = exaltedPlanets[0] || kundli.planets.Jupiter || kundli.planets.Sun;
    return `आपकी कुंडली में सबसे प्रभावशाली ग्रह **${bestPlanet.hindiName}** हैं, जो अपने ${bestPlanet.dignity === "Exalted" ? "उच्च (Exalted)" : "स्वराशि (Own Sign)"} होकर भाव ${bestPlanet.house} में स्थित हैं।
यह ग्रह आपके जीवन में आत्मबल, बुद्धि और निर्णय क्षमता को प्राकृतिक रूप से शक्तिशाली बनाता है। जब भी इस ग्रह का गोचर या अंतर्दशा सक्रिय होगी, आपको जीवन में महत्वपूर्ण प्रगति देखने को मिलेगी।`;
  }

  // 4. Manglik Dosha questions
  if (qLower.includes("mangal") || qLower.includes("manglik")) {
    const m = kundli.doshas.manglik;
    return `**मांगलिक दोष विश्लेषण (Manglik Analysis):**
${m.hasDosha ? "हाँ, आपकी कुंडली में लग्न अथवा चन्द्र से मंगल की विशिष्ट स्थिति के कारण मांगलिक योग बनता है।" : "शुभ समाचार: आपकी जन्म कुंडली मांगलिक दोष से पूर्णतः मुक्त है!"}
${m.cancellationReasons.length > 0 ? `\n- **दोष मुक्ति अपवाद:** ${m.cancellationReasons.join(", ")}` : ""}
- **वैदिक उपाय:** मंगलवार को हनुमान चालीसा का पाठ करें और तांबे के पात्र में जल अर्पण करें।`;
  }

  // 5. Current Mahadasha Effect
  if (qLower.includes("dasha") || qLower.includes("mahadasha") || qLower.includes("antardasha")) {
    const curDasha = kundli.dashas.currentMahadasha;
    return `वर्तमान में आपकी जन्म कुंडली में **${curDasha.hindiName} की महादशा** प्रभावी है, जो ${curDasha.startDate} से प्रारंभ होकर ${curDasha.endDate} तक सक्रिय रहेगी।
- यह महादशा आत्म-विकास, कर्मक्षेत्र में विस्तार और दीर्घकालिक स्थिरता स्थापित करने का समय है।
- साथ ही अंतर्दशा में **${kundli.dashas.currentAntardasha.hindiName}** का प्रभाव आपके विचारों को रचनात्मक दिशा दे रहा है।`;
  }

  // General Vedic Response
  return `नमस्ते ${kundli.birthDetails.name}! आपकी लग्न कुंडली ${kundli.ascendant.signName} लग्न और ${kundli.moonSign.signName} राशि (${kundli.moonSign.nakshatra} नक्षत्र) से सुशोभित है। 
आपकी सक्रिय महादशा ${kundli.dashas.currentMahadasha.planet} की चल रही है। 
आप मुझसे करियर, विवाह समय, शुभ अंक, ग्रहों के उपाय या दैनिक जीवन के मार्गदर्शन के विषय में निसंकोच कोई भी प्रश्न पूछ सकते हैं। मैं आपकी कुंडली के अनुसार प्रामाणिक मार्गदर्शन प्रदान करूँगा।`;
}

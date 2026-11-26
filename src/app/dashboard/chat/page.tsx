"use client";

import React, { useState, useRef, useEffect } from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { ChatMessage } from "@/lib/ai/chatbot-service";
import { Sparkles, Send, RefreshCw, User, Bot, HelpCircle } from "lucide-react";

export default function AskAIPanditPage() {
  const { currentUser } = useUserRole();
  const profile = astrologyStore.getPrimaryBirthProfile(currentUser.id);
  const kundli = astrologyStore.getKundli(profile);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_1",
      sender: "assistant",
      content: `प्रणाम ${profile.name}! मैं आपका व्यक्तिगत वैदिक एआई पंडित हूँ। आपकी कुंडली ${kundli.ascendant.signName} लग्न और ${kundli.moonSign.signName} राशि (${kundli.moonSign.nakshatra} नक्षत्र) से संरेखित है। वर्तमान में आप ${kundli.dashas.currentMahadasha.planet} की महादशा से गुजर रहे हैं।\n\nआप मुझसे अपने करियर, विवाह योग, महादशा के प्रभाव, या किसी ग्रह के उपाय के विषय में हिंदी, English या Hinglish में पूछ सकते हैं।`,
      timestamp: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "usr_" + Date.now(),
      sender: "user",
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          profileId: profile.id,
          history: messages,
        }),
      });

      const resJson = await res.json();
      if (resJson.success) {
        const botMsg: ChatMessage = {
          id: "bot_" + Date.now(),
          sender: "assistant",
          content: resJson.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "Meri kundli mein kaunsa grah strong hai?",
    "Mera career aur wealth kaisa rahega?",
    "Meri shaadi kab hone ke yog hain?",
    "Mera mangal dosh hai ya nahi?",
    "Current Mahadasha ka kya effect hai?",
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-celestial-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 to-amber-300 p-0.5 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full bg-celestial-950 rounded-[10px] flex items-center justify-center text-lg">
              🕉️
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white font-serif">Ask AI Pandit</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Chart Context Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active Profile: <span className="text-gold-300 font-semibold">{profile.name}</span> ({kundli.ascendant.signName} Lagna • {kundli.moonSign.signName} Moon)
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "msg_reset",
                sender: "assistant",
                content: `प्रणाम ${profile.name}! नई बातचीत प्रारंभ हुई। कृपया अपना प्रश्न पूछें।`,
                timestamp: "Just now",
              },
            ])
          }
          className="text-xs text-slate-400 hover:text-gold-300 flex items-center gap-1.5 p-2 rounded-lg hover:bg-celestial-900 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Start New Chat
        </button>
      </div>

      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sq)}
            className="px-3 py-1 rounded-full bg-celestial-900/90 border border-gold-500/30 text-gold-300 text-[11px] hover:bg-gold-500/10 transition whitespace-nowrap shrink-0"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-celestial-900/60 border border-gold-500/20">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-gold-500 text-celestial-950"
                    : "bg-celestial-800 text-gold-400 border border-gold-500/40"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? "bg-gold-gradient text-celestial-950 font-medium rounded-tr-none shadow"
                    : "bg-celestial-950/90 border border-gold-500/30 text-slate-200 rounded-tl-none shadow-md"
                }`}
              >
                {m.content}
                <div
                  className={`text-[9px] mt-1.5 ${
                    isUser ? "text-celestial-900/70 text-right" : "text-slate-500 text-right"
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-celestial-800 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-celestial-950 border border-gold-500/20 text-xs text-gold-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
              पंडित जी आपकी कुंडली और ग्रहों का अध्ययन कर रहे हैं...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-celestial-900 border border-gold-500/30 rounded-2xl p-1.5 focus-within:ring-1 focus-within:ring-gold-400"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in Hindi, English, or Hinglish (e.g. Meri shaadi kab hogi?)..."
          className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition disabled:opacity-40 flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          Send
        </button>
      </form>
    </div>
  );
}

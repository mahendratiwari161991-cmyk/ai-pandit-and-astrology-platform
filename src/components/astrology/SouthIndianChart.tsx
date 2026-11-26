"use client";

import React from "react";
import { HouseData, PlanetName, PlanetPosition } from "@/lib/astrology/types";
import { RASHIS } from "@/lib/astrology/astronomy";

interface SouthIndianChartProps {
  houses: HouseData[];
  planets: Record<PlanetName, PlanetPosition>;
  chartTitle?: string;
  size?: number;
}

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  houses,
  planets,
  chartTitle = "Lagna Kundli (D1)",
  size = 460,
}) => {
  // In South Indian Chart format, the 12 signs have FIXED box positions in a 4x4 perimeter grid:
  // Row 0: Pisces (12), Aries (1), Taurus (2), Gemini (3)
  // Row 1: Aquarius (11), [CENTER BOX 2x2], Cancer (4)
  // Row 2: Capricorn (10), [CENTER BOX 2x2], Leo (5)
  // Row 3: Sagittarius (9), Scorpio (8), Libra (7), Virgo (6)

  const signGridSlots: Record<number, { r: number; c: number }> = {
    12: { r: 0, c: 0 },
    1: { r: 0, c: 1 },
    2: { r: 0, c: 2 },
    3: { r: 0, c: 3 },
    4: { r: 1, c: 3 },
    5: { r: 2, c: 3 },
    6: { r: 3, c: 3 },
    7: { r: 3, c: 2 },
    8: { r: 3, c: 1 },
    9: { r: 3, c: 0 },
    10: { r: 2, c: 0 },
    11: { r: 1, c: 0 },
  };

  // Find Lagna sign
  const lagnaSign = planets.Ascendant ? planets.Ascendant.signNumber : 1;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gold-300 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
        {chartTitle} - South Indian Format
      </div>
      <div
        style={{ width: size, height: size }}
        className="relative grid grid-cols-4 grid-rows-4 rounded-xl overflow-hidden p-2 bg-gradient-to-br from-celestial-800 to-celestial-950 border border-gold-500/40 shadow-gold-glow"
      >
        {/* Render each of the 12 fixed sign boxes */}
        {Object.entries(signGridSlots).map(([signStr, slot]) => {
          const sNum = parseInt(signStr, 10);
          const rashi = RASHIS[sNum - 1];
          const isLagna = sNum === lagnaSign;

          // Find planets in this sign
          const planetsInSign = (Object.keys(planets) as PlanetName[]).filter(
            (p) => planets[p].signNumber === sNum && p !== "Ascendant"
          );

          return (
            <div
              key={sNum}
              style={{
                gridRow: slot.r + 1,
                gridColumn: slot.c + 1,
              }}
              className={`border border-gold-500/30 p-1.5 flex flex-col justify-between transition-colors hover:bg-gold-500/10 ${
                isLagna ? "bg-gold-500/15 ring-1 ring-gold-400/50" : ""
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gold-300 font-semibold truncate">
                  {rashi.name.slice(0, 3)}
                </span>
                {isLagna && (
                  <span className="px-1 py-0.2 bg-gold-500 text-celestial-950 font-bold rounded text-[9px]">
                    LAG
                  </span>
                )}
              </div>

              {/* Planets */}
              <div className="flex flex-wrap gap-1 items-center justify-center my-auto">
                {planetsInSign.map((pName) => {
                  const pObj = planets[pName];
                  return (
                    <span
                      key={pName}
                      className={`text-[10px] font-medium px-1 rounded ${
                        pObj.isCombust
                          ? "bg-red-900/60 text-red-200"
                          : pObj.isRetrograde
                          ? "bg-blue-900/60 text-blue-200"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {pName.slice(0, 2)}
                      {pObj.isRetrograde ? "R" : ""}
                    </span>
                  );
                })}
              </div>

              <div className="text-[9px] text-slate-400 text-right">
                {rashi.symbol}
              </div>
            </div>
          );
        })}

        {/* Center Box (spanning cols 2-3 and rows 2-3) */}
        <div
          style={{ gridRow: "2 / span 2", gridColumn: "2 / span 2" }}
          className="border border-gold-500/40 bg-celestial-900/90 flex flex-col items-center justify-center p-3 text-center"
        >
          <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-300 mb-1">
            🕉️
          </div>
          <div className="text-xs font-bold text-gold-200">{chartTitle}</div>
          <div className="text-[10px] text-slate-300 mt-0.5">Sidereal Lahiri</div>
          <div className="text-[9px] text-gold-400/80 mt-1">Lagna: {RASHIS[lagnaSign - 1].name}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-gold-500"></span> LAG = Ascendant
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-blue-400"></span> R = Retrograde
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-red-400"></span> Combust
        </span>
      </div>
    </div>
  );
};

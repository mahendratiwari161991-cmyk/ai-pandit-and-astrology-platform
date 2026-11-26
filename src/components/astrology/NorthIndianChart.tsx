"use client";

import React from "react";
import { HouseData, PlanetName, PlanetPosition } from "@/lib/astrology/types";

interface NorthIndianChartProps {
  houses: HouseData[];
  planets: Record<PlanetName, PlanetPosition>;
  chartTitle?: string;
  size?: number;
}

const SHORT_PLANET_NAMES: Record<PlanetName, string> = {
  Ascendant: "Asc/Lag",
  Sun: "Su/सूर्य",
  Moon: "Mo/चन्द्र",
  Mars: "Ma/मंगल",
  Mercury: "Me/बुध",
  Jupiter: "Ju/गुरु",
  Venus: "Ve/शुक्र",
  Saturn: "Sa/शनि",
  Rahu: "Ra/राहु",
  Ketu: "Ke/केतु",
};

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  houses,
  planets,
  chartTitle = "Lagna Kundli (D1)",
  size = 460,
}) => {
  // North Indian Diamond layout coordinates inside a normalized 400x400 box
  // Houses:
  // 1st House: Center-Top diamond (x: 200, y: 100)
  // 2nd House: Top-Left triangle (x: 100, y: 50)
  // 3rd House: Left-Top triangle (x: 50, y: 100)
  // 4th House: Left center diamond (x: 100, y: 200)
  // 5th House: Left-Bottom triangle (x: 50, y: 300)
  // 6th House: Bottom-Left triangle (x: 100, y: 350)
  // 7th House: Center-Bottom diamond (x: 200, y: 300)
  // 8th House: Bottom-Right triangle (x: 300, y: 350)
  // 9th House: Right-Bottom triangle (x: 350, y: 300)
  // 10th House: Right center diamond (x: 300, y: 200)
  // 11th House: Right-Top triangle (x: 350, y: 100)
  // 12th House: Top-Right triangle (x: 300, y: 50)

  const houseCenters: Record<number, { x: number; y: number; signPos: { x: number; y: number } }> = {
    1: { x: 200, y: 100, signPos: { x: 200, y: 140 } },
    2: { x: 100, y: 50, signPos: { x: 140, y: 80 } },
    3: { x: 50, y: 100, signPos: { x: 80, y: 140 } },
    4: { x: 100, y: 200, signPos: { x: 140, y: 200 } },
    5: { x: 50, y: 300, signPos: { x: 80, y: 260 } },
    6: { x: 100, y: 350, signPos: { x: 140, y: 320 } },
    7: { x: 200, y: 300, signPos: { x: 200, y: 260 } },
    8: { x: 300, y: 350, signPos: { x: 260, y: 320 } },
    9: { x: 350, y: 300, signPos: { x: 320, y: 260 } },
    10: { x: 300, y: 200, signPos: { x: 260, y: 200 } },
    11: { x: 350, y: 100, signPos: { x: 320, y: 140 } },
    12: { x: 300, y: 50, signPos: { x: 260, y: 80 } },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-semibold text-gold-300 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
        {chartTitle} - North Indian Format
      </div>
      <div className="relative rounded-xl overflow-hidden p-2 bg-gradient-to-br from-celestial-800 to-celestial-950 border border-gold-500/40 shadow-gold-glow">
        <svg
          viewBox="0 0 400 400"
          width={size}
          height={size}
          className="max-w-full h-auto drop-shadow-md select-none"
        >
          {/* Subtle Background Glow */}
          <rect x="0" y="0" width="400" height="400" fill="#0c071a" />
          
          {/* Chart Outer Border */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2.5"
            strokeOpacity="0.9"
          />

          {/* Diagonal Crossed Lines */}
          <line x1="4" y1="4" x2="396" y2="396" stroke="#d4af37" strokeWidth="1.8" strokeOpacity="0.75" />
          <line x1="4" y1="396" x2="396" y2="4" stroke="#d4af37" strokeWidth="1.8" strokeOpacity="0.75" />

          {/* Diamond Central Shape */}
          <polygon
            points="200,4 396,200 200,396 4,200"
            fill="rgba(212, 175, 55, 0.04)"
            stroke="#d4af37"
            strokeWidth="1.8"
            strokeOpacity="0.8"
          />

          {/* Render 12 Houses */}
          {houses.map((house) => {
            const hNum = house.houseNumber;
            const center = houseCenters[hNum];
            if (!center) return null;

            // Find planets in this house
            const planetsInHouse = house.planets || [];

            return (
              <g key={`house-${hNum}`} className="cursor-pointer group">
                {/* Sign Number Badge */}
                <text
                  x={center.signPos.x}
                  y={center.signPos.y}
                  fill="#ffd700"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="opacity-75"
                >
                  {house.signNumber}
                </text>

                {/* Planets text inside house */}
                <g>
                  {planetsInHouse.map((pName, idx) => {
                    const pObj = planets[pName];
                    const isRetro = pObj?.isRetrograde;
                    const isCombust = pObj?.isCombust;
                    const yOffset = center.y - (planetsInHouse.length - 1) * 7 + idx * 14;

                    return (
                      <text
                        key={pName}
                        x={center.x}
                        y={yOffset}
                        fill={isCombust ? "#ff6b6b" : isRetro ? "#60a5fa" : "#ffffff"}
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {pName.slice(0, 2)}
                        {isRetro ? "(R)" : ""}
                        {isCombust ? "°" : ""}
                      </text>
                    );
                  })}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-blue-400"></span> (R) Retrograde
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-red-400"></span> (°) Combust
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-gold-400"></span> Numbers = Rashis
        </span>
      </div>
    </div>
  );
};

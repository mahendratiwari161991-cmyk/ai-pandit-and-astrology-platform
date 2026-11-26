import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        celestial: {
          950: "#07040d",
          900: "#0d081a",
          850: "#140c29",
          800: "#1b1138",
          700: "#271a4f",
          600: "#3d2b78",
          500: "#5b42ab",
        },
        gold: {
          50: "#fbf8ea",
          100: "#f5eecb",
          200: "#eddc97",
          300: "#e3c660",
          400: "#d9ae36",
          500: "#c69720",
          600: "#aa7717",
          700: "#865615",
          800: "#6e4417",
          900: "#5d3817",
          accent: "#ffd700",
        },
        saffron: {
          500: "#ff7700",
          600: "#e65c00",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      backgroundImage: {
        "celestial-gradient": "radial-gradient(ellipse at top, #271a4f 0%, #0d081a 60%, #07040d 100%)",
        "gold-gradient": "linear-gradient(135deg, #ffd700 0%, #d9ae36 50%, #aa7717 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(39, 26, 79, 0.4) 0%, rgba(13, 8, 26, 0.7) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(217, 174, 54, 0.3)",
        "purple-glow": "0 0 35px -5px rgba(91, 66, 171, 0.4)",
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
        "pulse-glow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
} satisfies Config;

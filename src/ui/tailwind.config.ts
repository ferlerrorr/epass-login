import type { Config } from "tailwindcss";

export default {
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
        deepBlue:"#064994",
        error: "#ff0000", 
        headings:"#034ea1",
        bluehover:"#0e1453",
        focusvalue:"rgba(0,135,248,0.8)",
        lightblue:"rgba(0,135,248)",
        transblue:"rgba(0, 94, 171, 0.432)",
        transwhite:"rgba(255, 255, 255, 0.98)",
        title:"#8e8e8e",
        backgroundImage: {
          'custom-gradient': 'linear-gradient(0deg, rgba(0, 140, 255, 0.2), rgba(0, 94, 171, 0.932))',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

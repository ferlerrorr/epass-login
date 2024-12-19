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
        deepBlue: {
          DEFAULT: "#0000ff", 
          light: "#003366",  
          dark: "#000d1a",  
        },
        error: "#ff0000", 
        headings:"#000066",
        focusvalue:"#6600cc",
      },
    },
  },
  plugins: [],
} satisfies Config;

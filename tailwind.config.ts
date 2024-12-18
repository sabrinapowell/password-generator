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
        "light-gray": "#F0F2F5",
        "null-gray": "#F5F5F5",
        "dark-gray": "#1F2937",
        "brand-main": "#2563EB",
        "brand-hover": "#1E40AF",
      },
    },
  },
  plugins: [],
} satisfies Config;

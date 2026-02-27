import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-14px) rotate(1.5deg)" },
          "66%": { transform: "translateY(-7px) rotate(-1deg)" },
        },
        "float-alt": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(-2deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "drift-x": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(14px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.08)" },
        },
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(300%) skewX(-15deg)" },
        },
        "underline-grow": {
          from: { width: "0", opacity: "0" },
          to: { width: "12rem", opacity: "1" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(0px) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-80px) scale(0)", opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "orbit": {
          "0%":   { transform: "rotateZ(0deg) rotateX(72deg)" },
          "100%": { transform: "rotateZ(360deg) rotateX(72deg)" },
        },
        "orbit-reverse": {
          "0%":   { transform: "rotateZ(0deg) rotateX(60deg)" },
          "100%": { transform: "rotateZ(-360deg) rotateX(60deg)" },
        },
        "text-reveal-3d": {
          "0%":   { opacity: "0", transform: "perspective(600px) rotateX(-30deg) translateY(40px)" },
          "100%": { opacity: "1", transform: "perspective(600px) rotateX(0deg)  translateY(0px)" },
        },
        "slide-left": {
          "0%":   { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bg-pan": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "cursor-pulse": {
          "0%, 100%": { transform: "translate(-50%,-50%) scale(1)" },
          "50%":       { transform: "translate(-50%,-50%) scale(1.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "float": "float 7s ease-in-out infinite",
        "float-alt": "float-alt 9s ease-in-out infinite 1.5s",
        "spin-slow": "spin-slow 28s linear infinite",
        "drift-x": "drift-x 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer-sweep": "shimmer-sweep 2.5s ease-in-out infinite",
        "underline-grow": "underline-grow 0.8s ease-out forwards",
        "particle-rise": "particle-rise 2s ease-out infinite",
        "marquee": "marquee 32s linear infinite",
        "orbit": "orbit 18s linear infinite",
        "orbit-reverse": "orbit-reverse 24s linear infinite",
        "text-reveal-3d": "text-reveal-3d 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-left": "slide-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bg-pan": "bg-pan 12s ease infinite",
        "cursor-pulse": "cursor-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

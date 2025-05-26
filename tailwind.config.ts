/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			borderRadius: {
				DEFAULT: "1rem",
				sm: "calc(1rem - 4px)",
				md: "calc(1rem - 2px)",
				lg: "1rem",
				xl: "calc(1rem + 4px)",
			},
			fontFamily: {
				sans: ["var(--font-noto-sans-kr)", "var(--font-geist-sans)"],
			},
			colors: {
				rebe: {
					accent: "#E4E0FF",
					"accent-70": "#DCD7FF70",
					white: "#FEFEFE",
					text: "#494791",
					gradient: {
						start: "#E8EEFF",
						middle: "#F8F7FF",
						end: "#F1EDFF",
					},
				},
			},
			backgroundImage: {
				"rebe-gradient":
					"linear-gradient(135deg, #E8EEFF 0%, #F8F7FF 50%, #F1EDFF 100%)",
				"rebe-gradient-vertical":
					"linear-gradient(180deg, #E8EEFF 0%, #F8F7FF 50%, #F1EDFF 100%)",
			},
			animation: {
				"shimmer-slide":
					"shimmer-slide var(--speed) ease-in-out infinite alternate",
				"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
				"fade-in": "fade-in 0.5s ease-in-out",
				"slide-up": "slide-up 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				marquee: "marquee var(--duration) infinite linear",
				"marquee-vertical": "marquee-vertical var(--duration) infinite linear",
				meteor: "meteor 5s linear infinite",
				aurora: "aurora 20s linear infinite",
			},
			keyframes: {
				"shimmer-slide": {
					to: {
						transform: "translate(calc(100cqw - 100%), 0)",
					},
				},
				"spin-around": {
					"0%": {
						transform: "translateZ(0) rotate(0)",
					},
					"15%, 35%": {
						transform: "translateZ(0) rotate(90deg)",
					},
					"65%, 85%": {
						transform: "translateZ(0) rotate(270deg)",
					},
					"100%": {
						transform: "translateZ(0) rotate(360deg)",
					},
				},
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"slide-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.9)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				marquee: {
					from: { transform: "translateX(0%)" },
					to: { transform: "translateX(-100%)" },
				},
				"marquee-vertical": {
					from: { transform: "translateY(0%)" },
					to: { transform: "translateY(-100%)" },
				},
				meteor: {
					"0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
					"70%": { opacity: "1" },
					"100%": {
						transform: "rotate(215deg) translateX(-500px)",
						opacity: "0",
					},
				},
				aurora: {
					from: {
						backgroundPosition: "0% 50%",
					},
					to: {
						backgroundPosition: "200% 50%",
					},
				},
			},
		},
	},
	plugins: [],
};

export default config;

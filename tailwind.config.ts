/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/magicui/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"SUIT Variable",
					"SUIT",
					"Noto Sans KR",
					"Inter",
					"system-ui",
					"sans-serif",
				],
				mono: [
					"SUIT Variable",
					"ui-monospace",
					"SFMono-Regular",
					"SF Mono",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
			},
		},
	},
};

export default config;

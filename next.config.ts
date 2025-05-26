import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
	webpack: (config) => {
		// @ts-expect-error 타입 에러 무시
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							typescript: true,
							ext: "tsx",
						},
					},
				],
			},
		);
		fileLoaderRule.exclude = /\.svg$/i;
		return config;
	},
};

export default nextConfig;

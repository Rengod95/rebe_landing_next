"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BlurFade } from "./blur-fade";

interface FeatureCardProps {
	icon: React.ElementType;
	title: string;
	description: string;
	subDescription: string;
	iconColor?: string;
	delay?: number;
	className?: string;
}

export function FeatureCard({
	icon: Icon,
	title,
	description,
	subDescription,
	iconColor = "text-rebe-purple-400",
	delay = 0,
	className,
}: FeatureCardProps) {
	return (
		<BlurFade delay={delay} inView>
			<div
				className={cn(
					"group relative h-full overflow-hidden rounded-2xl border border-rebe-slate-400/60 bg-transparent  p-6 md:p-8 transition-all duration-300 hover:border-rebe-purple-400/60 hover:bg-rebe-slate-50/5",
					className,
				)}
			>
				{/* 배경 그라데이션 효과 */}
				<div className=" absolute inset-0 bg-gradient-to-br from-rebe-purple-500/20 via-transparent to-rebe-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl" />

				{/* 하이라이트 보더 */}
				<div className="absolute inset-0 rounded-2xl border border-rebe-purple-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				<div className="relative z-10 flex h-full flex-col">
					{/* 아이콘 */}
					<div className="mb-2 md:mb-4">
						<Icon
							className={cn(
								"size-8 md:size-14 transition-colors duration-300",
								iconColor,
								"text-rebe-slate-800 ",
							)}
							strokeWidth={1}
						/>
					</div>

					{/* 제목 */}
					<h4 className="mb-2 md:mb-4 text-[1.6rem] font-semibold text-rebe-slate-800 transition-colors duration-300 group-hover:text-rebe-purple-700 md:text-3xl">
						{title}
					</h4>

					{/* 설명 */}
					<p className=" md:hidden  text-rebe-slate-600 transition-colors duration-300 group-hover:text-rebe-slate-700 md:text-base">
						{subDescription}
					</p>

					{/* 상세 설명 */}
					<p className="hidden md:block leading-relaxed text-rebe-slate-600 transition-colors duration-300 group-hover:text-rebe-slate-700 md:text-lg">
						{description}
					</p>

					{/* Read More 링크 */}
					<div className="hidden md:block mt-6 pt-4">
						<div className="group/link flex items-center gap-2 text-sm font-medium text-rebe-slate-500 transition-colors duration-300 hover:text-rebe-purple-600">
							<span className="border-b border-rebe-slate-500 pb-0.5 transition-colors duration-300 group-hover/link:border-rebe-purple-400">
								READ MORE
							</span>
							<svg
								className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</BlurFade>
	);
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { StarFilledIcon, PersonIcon } from "@radix-ui/react-icons";
import { BlurFade } from "./blur-fade";

interface ReviewCardProps {
	name: string;
	username?: string;
	date: string;
	content: string;
	rating?: number;
	beforeImage?: string;
	afterImage?: string;
	profileImage?: string;
	category?: string;
	className?: string;
}

export function ReviewCard({
	name,
	username,
	date,
	content,
	rating = 5,
	beforeImage,
	afterImage,
	profileImage,
	category,
	className,
}: ReviewCardProps) {
	return (
		<div
			className={cn(
				"group relative flex flex-col p-6 rounded-3xl border border-rebe-slate-300  backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rebe-slate-300",
				className,
			)}
		>
			{/* Header */}
			<div className=" mb-4 flex items-center justify-between">
				<div className="flex items-center justify-center gap-3">
					<div className="relative">
						{profileImage ? (
							<img
								src={profileImage}
								alt={name}
								className="size-12 rounded-full border-2 border-rebe-slate-200 object-cover"
							/>
						) : (
							<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-rebe-purple-500 to-rebe-blue-500 text-rebe-slate-50">
								<PersonIcon className="size-6" />
							</div>
						)}
					</div>
					<div>
						<h4 className="font-semibold text-rebe-text">{name}</h4>

						<div className="flex items-center gap-2">
							<div className="flex gap-0.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<StarFilledIcon
										key={`star-${i}`}
										className={cn(
											"size-3",
											i < rating ? "text-yellow-400" : "text-rebe-gray-300",
										)}
									/>
								))}
							</div>
							<span className="text-xs text-rebe-gray-500">{date}</span>
						</div>
					</div>
				</div>
				{category && (
					<div className="rounded-full bg-gradient-to-r from-rebe-blue-100 to-rebe-purple-100 px-3 py-1 text-xs font-medium text-rebe-purple-700">
						{category}
					</div>
				)}
			</div>

			{/* Before/After Images */}
			{/* {(beforeImage || afterImage) && (
				<BlurFade delay={0.1} inView>
					<div className="mb-4 grid grid-cols-2 gap-3">
						{beforeImage && (
							<div className="relative overflow-hidden rounded-sm">
								<img
									src={beforeImage}
									alt="Before"
									className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
									Before
								</div>
							</div>
						)}
						{afterImage && (
							<div className="relative overflow-hidden rounded-sm">
								<img
									src={afterImage}
									alt="After"
									className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute bottom-2 left-2 rounded-md bg-rebe-green-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
									After
								</div>
							</div>
						)}
					</div>
				</BlurFade>
			)} */}

			{/* Content */}
			<div className="flex-1">
				<p className="text-sm leading-relaxed text-rebe-gray-700">{content}</p>
			</div>

			{/* Floating gradient overlay for modern effect */}
			<div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-rebe-blue-400/5 via-transparent to-rebe-pink-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</div>
	);
}

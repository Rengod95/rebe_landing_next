"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
	gradientColor?: string;
	gradientSize?: number;
}

const MagicCard: React.FC<MagicCardProps> = ({
	className,
	children,
	gradientSize = 200,
	gradientColor = "#262626",
	...props
}) => {
	const mouseX = useRef<number>(0);
	const mouseY = useRef<number>(0);
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovering, setIsHovering] = useState<boolean>(false);

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const handleMouseMove = (event: MouseEvent) => {
			const rect = card.getBoundingClientRect();
			mouseX.current = event.clientX - rect.left;
			mouseY.current = event.clientY - rect.top;
			card.style.setProperty("--mouse-x", `${mouseX.current}px`);
			card.style.setProperty("--mouse-y", `${mouseY.current}px`);
		};

		card.addEventListener("mousemove", handleMouseMove);
		return () => {
			card.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			ref={cardRef}
			style={
				{
					"--mouse-x": `${mouseX.current}px`,
					"--mouse-y": `${mouseY.current}px`,
					"--gradient-size": `${gradientSize}px`,
					"--gradient-color": gradientColor,
				} as React.CSSProperties
			}
			className={cn(
				"group relative rounded-xl border border-black/10 bg-white p-5 shadow-2xl shadow-black/[0.02] transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/[0.05] dark:border-white/10 dark:bg-neutral-900 dark:shadow-white/[0.02] dark:hover:shadow-white/[0.05]",
				className,
			)}
			{...props}
		>
			<div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
			<div className="relative z-[1]">{children}</div>
			{/* Hover Gradient */}
			<div
				style={
					{
						background:
							"radial-gradient(var(--gradient-size) circle at var(--mouse-x) var(--mouse-y), var(--gradient-color), transparent 100%)",
					} as React.CSSProperties
				}
				className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
			/>
		</div>
	);
};

export { MagicCard };

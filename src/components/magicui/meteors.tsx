"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface MeteorsProps {
	number?: number;
	className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
	const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
		[],
	);

	useEffect(() => {
		const styles = [...Array(number)].map(() => ({
			top: -5,
			left: `${Math.floor(Math.random() * 100)}vw`,
			animationDelay: `${Math.random() * 1 + 0.2}s`,
			animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
		}));
		setMeteorStyles(styles);
	}, [number]);

	return (
		<div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
			{[...Array(number)].map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div
					key={i}
					className={cn(
						"pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
						className,
					)}
					style={meteorStyles[i]}
				>
					<div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
				</div>
			))}
		</div>
	);
};

import { cn } from "@/lib/utils";
import type React from "react";

export interface BorderBeamProps {
	className?: string;
	size?: number;
	duration?: number;
	borderWidth?: number;
	colorFrom?: string;
	colorTo?: string;
	delay?: number;
	children?: React.ReactNode;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
	className,
	size = 200,
	duration = 15,
	borderWidth = 1.5,
	colorFrom = "#ffaa40",
	colorTo = "#9c40ff",
	delay = 0,
	children,
}) => {
	return (
		<div
			style={
				{
					"--size": size,
					"--duration": duration,
					"--delay": delay,
				} as React.CSSProperties
			}
			className={cn(
				"relative flex items-center justify-center rounded-[16px] bg-slate-950 p-3 text-sm antialiased",
				className,
			)}
		>
			<div
				className="absolute inset-[0] rounded-[16px] [border:calc(var(--border-width)*1px)_solid_transparent]"
				style={
					{
						"--color-from": colorFrom,
						"--color-to": colorTo,
						"--border-width": borderWidth,
						"--radius": "16px",
						"--delay": `-${delay}s`,
						"--angle": "0deg",
						background:
							"radial-gradient(transparent,transparent), conic-gradient(from var(--angle) at 50% 50%, var(--color-from) 0%, var(--color-to) 15%, var(--color-from) 35%,transparent 50%) 0% 0% / var(--size)px var(--size)px repeat, conic-gradient(from var(--angle) at 50% 50%, var(--color-from) 0%, var(--color-to) 15%, var(--color-from) 35%,transparent 50%) 50% 50% / var(--size)px var(--size)px repeat",
						WebkitAnimation:
							"border-beam calc(var(--duration)*1s) calc(var(--delay)*1s) infinite linear",
						animation:
							"border-beam calc(var(--duration)*1s) calc(var(--delay)*1s) infinite linear",
						backgroundSize:
							"var(--size)px var(--size)px, var(--size)px var(--size)px, var(--size)px var(--size)px, var(--size)px var(--size)px",
						mask: "linear-gradient(transparent,transparent), linear-gradient(transparent,transparent)",
						WebkitMask:
							"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
						maskComposite: "intersect",
						WebkitMaskComposite: "destination-out",
					} as React.CSSProperties
				}
			/>
			{children}
		</div>
	);
};

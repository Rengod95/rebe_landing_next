"use client";

import { motion } from "motion/react";
import { type RefObject, useEffect, useId, useState, useMemo } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
	className?: string;
	containerRef: RefObject<HTMLElement | null>; // Container ref
	fromRef: RefObject<HTMLElement | null>;
	toRef: RefObject<HTMLElement | null>;
	curvature?: number;
	reverse?: boolean;
	pathColor?: string;
	pathWidth?: number;
	pathOpacity?: number;
	gradientStartColor?: string;
	gradientStopColor?: string;
	delay?: number;
	duration?: number;
	startXOffset?: number;
	startYOffset?: number;
	endXOffset?: number;
	endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
	className,
	containerRef,
	fromRef,
	toRef,
	curvature = 0,
	reverse = false,
	duration = Math.random() * 3 + 4,
	delay = 0,
	pathColor = "gray",
	pathWidth = 2,
	pathOpacity = 0.2,
	gradientStartColor = "#ffaa40",
	gradientStopColor = "#9c40ff",
	startXOffset = 0,
	startYOffset = 0,
	endXOffset = 0,
	endYOffset = 0,
}) => {
	const id = useId();
	const [pathD, setPathD] = useState("");
	const [viewBox, setViewBox] = useState("0 0 0 0");

	const gradientCoordinates = useMemo(
		() =>
			reverse
				? {
						x1: ["90%", "-10%"],
						x2: ["100%", "0%"],
						y1: ["0%", "0%"],
						y2: ["0%", "0%"],
					}
				: {
						x1: ["10%", "110%"],
						x2: ["0%", "100%"],
						y1: ["0%", "0%"],
						y2: ["0%", "0%"],
					},
		[reverse],
	);

	useEffect(() => {
		const updatePath = () => {
			if (containerRef.current && fromRef.current && toRef.current) {
				const containerEl = containerRef.current;
				const fromEl = fromRef.current;
				const toEl = toRef.current;

				const containerRect = containerEl.getBoundingClientRect();
				const svgWidth = containerEl.clientWidth;
				const svgHeight = containerEl.clientHeight;

				if (svgWidth > 0 && svgHeight > 0) {
					setViewBox(`0 0 ${svgWidth} ${svgHeight}`);
				} else {
					setViewBox("0 0 1 1");
					console.warn("AnimatedBeam: Container dimensions are zero.");
				}

				const rectA = fromEl.getBoundingClientRect();
				const rectB = toEl.getBoundingClientRect();

				const startX =
					rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
				const startY =
					rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
				const endX =
					rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
				const endY =
					rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

				const controlPointX = (startX + endX) / 2;
				const controlPointY = startY - curvature;

				const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
				setPathD(d);
			}
		};

		updatePath();

		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(updatePath);
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [
		containerRef,
		fromRef,
		toRef,
		curvature,
		startXOffset,
		startYOffset,
		endXOffset,
		endYOffset,
	]);

	return (
		<svg
			fill="none"
			width="100%"
			height="100%"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"pointer-events-none absolute left-0 top-0 transform-gpu",
				className,
			)}
			viewBox={viewBox}
			aria-hidden="true"
		>
			<path
				d={pathD}
				stroke={pathColor}
				strokeWidth={pathWidth}
				strokeOpacity={pathOpacity}
				strokeLinecap="round"
			/>
			<path
				d={pathD}
				strokeWidth={pathWidth}
				stroke={`url(#${id})`}
				strokeOpacity="1"
				strokeLinecap="round"
			/>
			<defs>
				<motion.linearGradient
					className="transform-gpu"
					id={id}
					gradientUnits={"userSpaceOnUse"}
					initial={{
						x1: "0%",
						x2: "0%",
						y1: "0%",
						y2: "0%",
					}}
					animate={{
						x1: gradientCoordinates.x1,
						x2: gradientCoordinates.x2,
						y1: gradientCoordinates.y1,
						y2: gradientCoordinates.y2,
					}}
					transition={{
						delay,
						duration,
						ease: [0.16, 1, 0.3, 1],
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 0,
					}}
				>
					<stop stopColor={gradientStartColor} stopOpacity="0" />
					<stop stopColor={gradientStartColor} />
					<stop offset="32.5%" stopColor={gradientStopColor} />
					<stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
				</motion.linearGradient>
			</defs>
		</svg>
	);
};

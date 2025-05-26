"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ParticlesProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	size?: number;
	refresh?: boolean;
	color?: string;
	vx?: number;
	vy?: number;
}

interface Circle {
	x: number;
	y: number;
	translateX: number;
	translateY: number;
	size: number;
	alpha: number;
	targetAlpha: number;
	dx: number;
	dy: number;
	magnetism: number;
}

export function Particles({
	className = "",
	quantity = 30,
	staticity = 50,
	ease = 50,
	size = 0.4,
	refresh = false,
	color,
	vx = 0,
	vy = 0,
	...props
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<Circle[]>([]);
	const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const mouse = useRef<{
		x: number;
		y: number;
		ox: number;
		oy: number;
		vx: number;
		vy: number;
	}>({ x: 0, y: 0, ox: 0, oy: 0, vx: 0, vy: 0 });
	const Dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
	const [isLoaded, setIsLoaded] = useState(false);

	const resizeCanvas = useCallback(() => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasRef.current.width = canvasContainerRef.current.offsetWidth * Dpr;
			canvasRef.current.height = canvasContainerRef.current.offsetHeight * Dpr;
			canvasRef.current.style.width = `${canvasContainerRef.current.offsetWidth}px`;
			canvasRef.current.style.height = `${canvasContainerRef.current.offsetHeight}px`;
			context.current.scale(Dpr, Dpr);
		}
	}, [Dpr]);

	const circleParams = useCallback((): Circle => {
		const canvas = canvasRef.current;
		if (!canvas) {
			console.error("Canvas is not available for circleParams");
			return {
				x: 0,
				y: 0,
				translateX: 0,
				translateY: 0,
				size: 0,
				alpha: 0,
				targetAlpha: 0,
				dx: 0,
				dy: 0,
				magnetism: 0,
			};
		}
		const x = Math.floor(Math.random() * canvas.width);
		const y = Math.floor(Math.random() * canvas.height);
		const translateX = 0;
		const translateY = 0;
		const pSize = Math.floor(Math.random() * 2) + size;
		const alpha = 0;
		const targetAlpha = Number.parseFloat(
			(Math.random() * 0.6 + 0.1).toFixed(1),
		);
		const dx = (Math.random() - 0.5) * 0.2;
		const dy = (Math.random() - 0.5) * 0.2;
		const magnetism = 0.1 + Math.random() * 4;
		return {
			x,
			y,
			translateX,
			translateY,
			size: pSize,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
		};
	}, [size]);

	const drawCircle = useCallback(
		(circle: Circle, update = false) => {
			if (context.current) {
				const { x, y, translateX, translateY, size, alpha } = circle;
				context.current.translate(translateX, translateY);
				context.current.beginPath();
				context.current.arc(x, y, size, 0, 2 * Math.PI);
				context.current.fillStyle = color
					? `rgba(${Number.parseInt(color.slice(1, 3), 16)}, ${Number.parseInt(
							color.slice(3, 5),
							16,
						)}, ${Number.parseInt(color.slice(5, 7), 16)}, ${alpha})`
					: `rgba(255, 255, 255, ${alpha})`;
				context.current.fill();
				context.current.setTransform(Dpr, 0, 0, Dpr, 0, 0);

				if (!update) {
					circles.current.push(circle);
				}
			}
		},
		[color, Dpr],
	);

	const clearContext = useCallback(() => {
		const canvas = canvasRef.current;
		if (context.current && canvas) {
			context.current.clearRect(0, 0, canvas.width, canvas.height);
		}
	}, []);

	const drawParticles = useCallback(() => {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	}, [clearContext, quantity, circleParams, drawCircle]);

	const initCanvas = useCallback(() => {
		resizeCanvas();
		drawParticles();
	}, [resizeCanvas, drawParticles]);

	const animate = useCallback(() => {
		clearContext();
		const canvas = canvasRef.current;
		if (!canvas) return;
		circles.current.forEach((circle: Circle, i: number) => {
			const edge = [
				circle.x + circle.translateX - circle.size, // Left edge
				canvas.width - circle.x - circle.translateX - circle.size, // Right edge
				circle.y + circle.translateY - circle.size, // Top edge
				canvas.height - circle.y - circle.translateY - circle.size, // Bottom edge
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = Number.parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);
			if (remapClosestEdge > 1) {
				circle.alpha += 0.02;
				if (circle.alpha > circle.targetAlpha) {
					circle.alpha = circle.targetAlpha;
				}
			} else {
				circle.alpha = circle.targetAlpha * remapClosestEdge;
			}
			circle.x += circle.dx + vx;
			circle.y += circle.dy + vy;
			circle.translateX +=
				(mouse.current.vx / staticity - circle.translateX) / ease;
			circle.translateY +=
				(mouse.current.vy / staticity - circle.translateY) / ease;
			if (
				circle.x < -circle.size ||
				circle.x > canvas.width + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvas.height + circle.size
			) {
				circles.current.splice(i, 1);
				const newCircle = circleParams();
				drawCircle(newCircle);
			} else {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha,
					},
					true,
				);
			}
		});
		window.requestAnimationFrame(animate);
	}, [clearContext, vx, vy, staticity, ease, circleParams, drawCircle]);

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);
		setIsLoaded(true);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, [initCanvas, animate]);

	const onMouseMove = useCallback(() => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = {
				w: canvasRef.current.offsetWidth,
				h: canvasRef.current.offsetHeight,
			};
			const x = mousePosition.current.x - rect.left - w / 2;
			const y = mousePosition.current.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.vx = x / 20;
				mouse.current.vy = y / 20;
			}
		}
	}, []);

	useEffect(() => {
		if (!isLoaded) return;
		const handleMouseMove = (event: MouseEvent) => {
			mousePosition.current = { x: event.clientX, y: event.clientY };
			onMouseMove();
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isLoaded, onMouseMove]);

	const remapValue = (
		value: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number,
	): number => {
		const remapped =
			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	};

	return (
		<div
			className={cn("h-full w-full", className)}
			ref={canvasContainerRef}
			aria-hidden="true"
			{...props}
		>
			<canvas ref={canvasRef} className="h-full w-full" />
		</div>
	);
}

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

// 스크린 사이즈 훅 추가
const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const updateScreenSize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		updateScreenSize();
		window.addEventListener("resize", updateScreenSize);
		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	return screenSize;
};

// 콘텐츠 박스 사이즈 계산
const calculateContentSize = (screenWidth: number, screenHeight: number) => {
	let size = 384; // 기본 w-96 (384px)

	if (screenWidth < 640) {
		// 모바일
		size = 280;
	} else if (screenWidth < 768) {
		// 태블릿 세로
		size = 320;
	} else if (screenWidth < 1024) {
		// 태블릿 가로
		size = 360;
	} else if (screenWidth >= 1536) {
		// 대형 화면
		size = 420;
	}

	// 높이 제한
	const maxSize = Math.min(screenHeight * 0.6, size);

	return Math.round(maxSize);
};

export const StickyScroll = ({
	content,
	contentClassName,
	onStepChange,
	onSectionExit,
}: {
	content: {
		title: string;
		description: string;
		content?: React.ReactNode;
	}[];
	contentClassName?: string;
	onStepChange?: (currentStep: number, isLastStep: boolean) => void;
	onSectionExit?: () => void;
}) => {
	const [activeCard, setActiveCard] = React.useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(sectionRef, {
		margin: "-20% 0px -20% 0px",
		amount: 0.3,
	});

	const { scrollYProgress } = useScroll({
		container: ref,
		offset: ["start start", "end start"],
	});

	const cardLength = content.length;

	// 스크린 사이즈 훅 사용
	const { width: screenWidth, height: screenHeight } = useScreenSize();

	// 콘텐츠 사이즈 계산
	const contentSize = calculateContentSize(screenWidth, screenHeight);

	// 스크롤 핸들러 추가
	const handleScroll = useCallback(
		(e: WheelEvent) => {
			// 섹션이 뷰에 있지 않으면 처리하지 않음
			if (!isInView || isScrolling) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();

			const direction = e.deltaY > 0 ? "down" : "up";
			setIsScrolling(true);

			if (direction === "down") {
				if (activeCard < content.length - 1) {
					// 다음 카드로
					const nextCard = activeCard + 1;
					setActiveCard(nextCard);
					onStepChange?.(nextCard, nextCard === content.length - 1);
				} else {
					// 마지막 카드에서 아래로 스크롤하면 섹션 종료
					onSectionExit?.();
					setTimeout(() => {
						const nextSection = document.querySelector(
							'[data-section="stats"]',
						) as HTMLElement;
						if (nextSection) {
							nextSection.scrollIntoView({ behavior: "smooth" });
						}
					}, 100);
				}
			} else if (direction === "up") {
				if (activeCard > 0) {
					// 이전 카드로
					const prevCard = activeCard - 1;
					setActiveCard(prevCard);
					onStepChange?.(prevCard, false);
				} else {
					// 첫 번째 카드에서 위로 스크롤하면 이전 섹션으로
					onSectionExit?.();
					setTimeout(() => {
						const prevSection = document.querySelector(
							'[data-section="chat-ui"]',
						) as HTMLElement;
						if (prevSection) {
							prevSection.scrollIntoView({ behavior: "smooth" });
						}
					}, 100);
				}
			}

			// 스크롤 완료 후 플래그 해제
			setTimeout(() => {
				setIsScrolling(false);
			}, 300);
		},
		[
			isInView,
			isScrolling,
			activeCard,
			content.length,
			onStepChange,
			onSectionExit,
		],
	);

	// 이벤트 리스너 등록
	useEffect(() => {
		if (isInView) {
			window.addEventListener("wheel", handleScroll, { passive: false });
			onStepChange?.(activeCard, activeCard === content.length - 1);
		} else {
			window.removeEventListener("wheel", handleScroll);
		}

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [isInView, handleScroll, activeCard, onStepChange, content.length]);

	// 섹션이 뷰에서 벗어나면 상태 리셋
	useEffect(() => {
		if (!isInView) {
			setActiveCard(0);
			onSectionExit?.();
		}
	}, [isInView, onSectionExit]);

	// 기존 스크롤 진행률 기반 카드 변경 (내부 스크롤용)
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (!isInView) return; // 뷰에 있을 때만 동작

		const cardsBreakpoints = content.map((_, index) => index / cardLength);
		const closestBreakpointIndex = cardsBreakpoints.reduce(
			(acc, breakpoint, index) => {
				const distance = Math.abs(latest - breakpoint);
				if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
					return index;
				}
				return acc;
			},
			0,
		);

		// 외부 스크롤 제어가 활성화되어 있지 않을 때만 업데이트
		if (!isScrolling) {
			setActiveCard(closestBreakpointIndex);
		}
	});

	// REBE 색상으로 변경
	const backgroundColors = ["transparent", "transparent", "transparent"];
	const linearGradients = [
		"linear-gradient(to bottom right, #a78bfa, #0ea5e9)", // rebe-purple-600 to rebe-blue-500
		"linear-gradient(to bottom right, #ec4899, #8b5cf6)", // rebe-pink-500 to rebe-purple-700
		"linear-gradient(to bottom right, #0284c7, #c4b5fd)", // rebe-blue-600 to rebe-purple-500
	];

	const [backgroundGradient, setBackgroundGradient] = useState(
		linearGradients[0],
	);

	useEffect(() => {
		setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
	}, [activeCard]);

	return (
		<div ref={sectionRef} className="relative container">
			<div className="sticky top-0 overflow-hidden">
				<motion.div
					animate={{
						backgroundColor:
							backgroundColors[activeCard % backgroundColors.length],
					}}
					className="relative flex justify-center space-x-10 rounded-md p-10"
					ref={ref}
				>
					{/* 왼쪽 텍스트 섹션 - 애니메이션 개선 */}
					<div className="div relative flex items-center px-4 w-1/2">
						<div className="relative w-full">
							{content.map((item, index) => (
								<motion.div
									key={`${item.title}-${index}`}
									className="absolute inset-0 flex flex-col justify-center"
									initial={{
										opacity: 0,
										y: 50,
									}}
									animate={{
										opacity: activeCard === index ? 1 : 0,
										y: activeCard === index ? 0 : 50,
										scale: activeCard === index ? 1 : 0.95,
									}}
									transition={{
										duration: 0.6,
										ease: "easeOut",
										delay: activeCard === index ? 0.1 : 0,
									}}
									style={{
										zIndex: activeCard === index ? 10 : 1,
									}}
								>
									<motion.h2
										className="text-4xl leading-tight font-semibold text-rebe-slate-800 mb-6"
										initial={{ y: 30, opacity: 0 }}
										animate={{
											y: activeCard === index ? 0 : 30,
											opacity: activeCard === index ? 1 : 0,
										}}
										transition={{
											duration: 0.5,
											ease: "easeOut",
											delay: activeCard === index ? 0.2 : 0,
										}}
									>
										{item.title}
									</motion.h2>
									<motion.p
										className="text-lg leading-relaxed tracking-wide font-normal max-w-md text-rebe-slate-700"
										initial={{ y: 30, opacity: 0 }}
										animate={{
											y: activeCard === index ? 0 : 30,
											opacity: activeCard === index ? 1 : 0,
										}}
										transition={{
											duration: 0.5,
											ease: "easeOut",
											delay: activeCard === index ? 0.3 : 0,
										}}
									>
										{item.description}
									</motion.p>

									{/* 스텝 인디케이터 */}
									{activeCard === index && (
										<motion.div
											className="flex items-center space-x-2 mt-8"
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												duration: 0.4,
												ease: "easeOut",
												delay: 0.4,
											}}
										>
											<div className="flex space-x-2">
												{content.map((_, stepIndex) => (
													<div
														key={`step-${stepIndex}`}
														className={`w-2 h-2 rounded-full transition-all duration-300 ${
															stepIndex === activeCard
																? "bg-rebe-slate-800 scale-125"
																: stepIndex < activeCard
																	? "bg-rebe-slate-600"
																	: "bg-rebe-slate-300"
														}`}
													/>
												))}
											</div>
											<span className="text-sm text-rebe-slate-600 ml-3">
												{activeCard + 1} / {content.length}
											</span>
										</motion.div>
									)}
								</motion.div>
							))}
						</div>
					</div>

					{/* 오른쪽 콘텐츠 섹션 - 동적 사이즈 적용 */}
					<div className="hidden md:flex w-1/2 items-center justify-center">
						<motion.div
							style={{
								background: backgroundGradient,
								width: contentSize,
								height: contentSize,
							}}
							className={cn(
								"relative overflow-hidden rounded-md bg-white",
								contentClassName,
							)}
							animate={{
								scale: [0.95, 1],
								opacity: [0.8, 1],
							}}
							transition={{
								duration: 0.5,
								ease: "easeOut",
							}}
							key={activeCard}
						>
							<motion.div
								className="h-full w-full"
								initial={{ scale: 1.1, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{
									duration: 0.6,
									ease: "easeOut",
								}}
							>
								{content[activeCard].content ?? null}
							</motion.div>

							{/* 이미지 오버레이 효과 */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.2 }}
							/>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

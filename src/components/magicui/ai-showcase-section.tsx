"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BlurFade } from "./blur-fade";
import Iphone15Pro from "./iphone15-pro-mock";
import { motion } from "motion/react";
import { useInView } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";

interface AIStep {
	id: number;
	type: "hair" | "tattoo" | "makeup";
	phase: "Before" | "After";
	title: string;
	subtitle: string;
	description: string;
	image: string;
	accent: string;
}

const aiSteps: AIStep[] = [
	{
		id: 0,
		type: "hair",
		phase: "Before",
		title: "AI 헤어 합성",
		subtitle: "기존 헤어스타일",
		description:
			"원본 이미지를 업로드하면 REBE의 AI가 얼굴형과 특징을 정밀하게 분석합니다.",
		image:
			"https://images.unsplash.com/photo-1594736797933-d0d2c8f2c7d7?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-blue-500 to-rebe-purple-500",
	},
	{
		id: 1,
		type: "hair",
		phase: "After",
		title: "AI 헤어 합성",
		subtitle: "완벽한 새로운 스타일",
		description:
			"선택한 헤어스타일이 자연스럽게 적용되어 마치 실제 시술을 받은 것처럼 완벽한 결과를 보여줍니다.",
		image:
			"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-blue-600 to-rebe-purple-600",
	},
	{
		id: 2,
		type: "tattoo",
		phase: "Before",
		title: "AI 타투 합성",
		subtitle: "깨끗한 원본",
		description:
			"타투를 새기고 싶은 부위의 사진을 촬영하면 AI가 피부 톤과 질감을 분석합니다.",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-purple-500 to-rebe-pink-500",
	},
	{
		id: 3,
		type: "tattoo",
		phase: "After",
		title: "AI 타투 합성",
		subtitle: "현실적인 타투 시뮬레이션",
		description:
			"원하는 타투 디자인이 실제 새긴 것처럼 자연스럽게 적용되어 최종 결과를 미리 확인할 수 있습니다.",
		image:
			"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-purple-600 to-rebe-pink-600",
	},
	{
		id: 4,
		type: "makeup",
		phase: "Before",
		title: "AI 메이크업 합성",
		subtitle: "자연스러운 민낯",
		description:
			"메이크업 전 얼굴 사진으로 AI가 피부톤, 얼굴형, 특징점을 세밀하게 분석합니다.",
		image:
			"https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-pink-500 to-rebe-blue-500",
	},
	{
		id: 5,
		type: "makeup",
		phase: "After",
		title: "AI 메이크업 합성",
		subtitle: "완벽한 메이크업 룩",
		description:
			"선택한 메이크업 스타일이 자연스럽게 적용되어 전문 메이크업 아티스트가 직접 시술한 것 같은 결과를 제공합니다.",
		image:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop&crop=face",
		accent: "from-rebe-pink-600 to-rebe-blue-600",
	},
];

interface AIShowcaseSectionProps {
	onStepChange?: (currentStep: number, isLastStep: boolean) => void;
	onSectionExit?: () => void;
}

// 스크린 사이즈 훅
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

		// 초기 설정
		updateScreenSize();

		// 리사이즈 이벤트 리스너
		window.addEventListener("resize", updateScreenSize);

		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	return screenSize;
};

// iPhone 목업 사이즈 계산 함수
const calculateIphoneSize = (screenWidth: number, screenHeight: number) => {
	// 기본 사이즈
	const baseWidth = 300;
	const baseHeight = 600;

	// 화면 크기에 따른 스케일 계산
	let scale = 1;

	if (screenWidth < 640) {
		// 모바일
		scale = 0.6;
	} else if (screenWidth < 768) {
		// 태블릿 세로
		scale = 0.7;
	} else if (screenWidth < 1024) {
		// 태블릿 가로
		scale = 0.8;
	} else if (screenWidth < 1280) {
		// 데스크톱 작은 화면
		scale = 0.9;
	} else if (screenWidth < 1536) {
		// 데스크톱 중간 화면
		scale = 1.0;
	} else {
		// 대형 화면
		scale = 1.1;
	}

	// 높이 제한 (화면 높이의 70%를 넘지 않도록)
	const maxHeight = screenHeight * 0.7;
	const calculatedHeight = baseHeight * scale;

	if (calculatedHeight > maxHeight) {
		scale = maxHeight / baseHeight;
	}

	return {
		width: Math.round(baseWidth * scale),
		height: Math.round(baseHeight * scale),
	};
};

export function AIShowcaseSection({
	onStepChange,
	onSectionExit,
}: AIShowcaseSectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, {
		margin: "-20% 0px -20% 0px",
		amount: 0.3,
	});

	const [currentStep, setCurrentStep] = useState(0);
	const [phoneAnimationComplete, setPhoneAnimationComplete] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

	// 스크린 사이즈 훅 사용
	const { width: screenWidth, height: screenHeight } = useScreenSize();

	// iPhone 사이즈 계산
	const iphoneSize = calculateIphoneSize(screenWidth, screenHeight);

	// 스크롤 핸들러 수정
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
				if (currentStep < aiSteps.length - 1) {
					// 다음 스텝으로
					const nextStep = currentStep + 1;
					setCurrentStep(nextStep);
					onStepChange?.(nextStep, nextStep === aiSteps.length - 1);
				} else {
					// 마지막 스텝에서 아래로 스크롤하면 섹션 종료
					onSectionExit?.();
					// 일반 스크롤로 복귀하기 위해 약간의 지연 후 다음 섹션으로 스크롤
					setTimeout(() => {
						const nextSection = document.querySelector(
							'[data-section="chat-ui"]',
						) as HTMLElement;
						if (nextSection) {
							nextSection.scrollIntoView({ behavior: "smooth" });
						}
					}, 100);
				}
			} else if (direction === "up") {
				if (currentStep > 0) {
					// 이전 스텝으로
					const prevStep = currentStep - 1;
					setCurrentStep(prevStep);
					onStepChange?.(prevStep, false);
				} else {
					// 첫 번째 스텝에서 위로 스크롤하면 이전 섹션으로
					onSectionExit?.();
					setTimeout(() => {
						const prevSection = document.querySelector(
							'[data-section="hero"]',
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
		[isInView, isScrolling, currentStep, onStepChange, onSectionExit],
	);

	// 이벤트 리스너 등록
	useEffect(() => {
		if (isInView) {
			window.addEventListener("wheel", handleScroll, { passive: false });
			// 섹션 활성화 알림
			onStepChange?.(currentStep, currentStep === aiSteps.length - 1);
		} else {
			window.removeEventListener("wheel", handleScroll);
		}

		return () => {
			window.removeEventListener("wheel", handleScroll);
		};
	}, [isInView, handleScroll, currentStep, onStepChange]);

	// 폰 애니메이션 완료 처리
	useEffect(() => {
		if (isInView && !phoneAnimationComplete) {
			const timer = setTimeout(() => {
				setPhoneAnimationComplete(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [isInView, phoneAnimationComplete]);

	// 섹션이 뷰에서 벗어나면 상태 리셋
	useEffect(() => {
		if (!isInView) {
			setCurrentStep(0);
			setPhoneAnimationComplete(false);
			onSectionExit?.();
		}
	}, [isInView, onSectionExit]);

	const currentStepData = aiSteps[currentStep];

	return (
		<section ref={sectionRef} className="relative h-screen">
			{/* Sticky Container */}
			<div className="sticky top-0 h-screen overflow-hidden">
				<div className="container mx-auto flex h-full items-center px-4 md:px-8">
					<div className="flex flex-col h-screen lg:grid w-full items-center lg:grid-cols-2">
						{/* 왼쪽: iPhone 목업 */}
						<div className="pt-16 md:pt-0 h-[70%] w-full">
							<motion.div
								className="relative h-full w-full"
								animate={{
									scale: isInView ? 1 : 0.8,
									opacity: isInView ? 1 : 0,
								}}
								transition={{
									type: "spring",
									stiffness: 100,
									damping: 20,
									mass: 0.8,
								}}
							>
								<motion.div
									key={currentStepData?.image}
									initial={{
										scale: 0.95,
										opacity: 0,
									}}
									animate={{
										scale: 1,
										opacity: 1,
									}}
									transition={{
										duration: 0.5,
										ease: "easeOut",
									}}
									className="relative flex flex-col items-center justify-start w-full h-full"
								>
									<Iphone15Pro
										width={"100%"}
										height={"100%"}
										className=" dark drop-shadow-2xl"
										src={currentStepData?.image}
										title={`${currentStepData?.title} 시뮬레이션`}
									/>
								</motion.div>

								{/* 추가 시각적 효과 */}
								<motion.div
									className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rebe-purple-200/20 via-rebe-blue-200/20 to-rebe-pink-200/20 blur-xl"
									animate={{
										opacity: isInView ? 0.5 : 0,
										scale: isInView ? 1.1 : 0.8,
									}}
									transition={{
										duration: 0.8,
										ease: "easeOut",
									}}
								/>
							</motion.div>
						</div>

						{/* 오른쪽: 설명 텍스트 */}
						<motion.div
							className="md:flex h-[40%] flex-col justify-start"
							animate={{
								x: isInView ? 0 : 50,
								opacity: isInView ? 1 : 0,
							}}
							transition={{
								duration: 0.8,
								ease: "easeOut",
							}}
						>
							<div className="space-y-1 md:space-y-6 mt-4 lg:mt-16">
								{/* 카테고리 배지 */}
								<motion.div
									className={cn(
										"inline-flex items-center rounded-full px-2 py-1 text-lg  md:px-4 md:py-2 md:text-2xl tracking-wide font-bold",
										"bg-gradient-to-r transition-all duration-500",
										currentStepData?.phase === "After"
											? "bg-rebe-slate-800 text-rebe-slate-50"
											: "border border-rebe-slate-800 text-rebe-slate-800",
									)}
									key={`${currentStepData?.phase}-${currentStep}`}
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
								>
									{currentStepData?.phase}
								</motion.div>

								{/* 제목 */}
								<BlurFade key={currentStepData?.title}>
									<motion.p
										className="text-3xl sm:text-3xl font-bold leading-normal tracking-tight text-rebe-slate-800 md:text-6xl lg:text-7xl"
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
									>
										{currentStepData?.title}
									</motion.p>
								</BlurFade>

								{/* 설명 */}
								<motion.p
									className="leading-lg text-md md:leading-relaxed tracking-tight text-rebe-gray-700 md:text-2xl"
									key={currentStepData?.description}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
								>
									{currentStepData?.description}
								</motion.p>

								{/* 스크롤 진행률 인디케이터 */}
								{isInView && (
									<div className="mt-2 flex items-center space-x-4">
										<div className="h-3 w-32 bg-rebe-gray-200 rounded-full overflow-hidden">
											<motion.div
												className="h-full bg-rebe-slate-800"
												animate={{
													width: `${(currentStep / (aiSteps.length - 1)) * 100}%`,
												}}
												transition={{
													duration: 0.3,
													ease: "easeOut",
												}}
											/>
										</div>
										<span className="text-sm text-rebe-gray-600">
											{currentStep + 1} / {aiSteps.length}
										</span>
									</div>
								)}

								{/* 스텝 모드 안내 */}
								{isInView && (
									<motion.div
										className="hidden sm:block flex items-center space-x-2 text-sm text-rebe-gray-500"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5 }}
									>
										<span>스크롤하여 다음 단계 보기</span>
										{currentStep === aiSteps.length - 1 && (
											<span className="text-rebe-purple-600 font-medium">
												(마지막 단계)
											</span>
										)}
									</motion.div>
								)}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

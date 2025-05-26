"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Globe } from "@/components/magicui/globe";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { Meteors } from "@/components/magicui/meteors";
import { Particles } from "@/components/magicui/particles";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Safari } from "@/components/magicui/safari-mock";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import Iphone15Pro from "@/components/magicui/iphone15-pro-mock";
import Android from "@/components/magicui/android-mock";
import {
	ArrowRightIcon,
	CalendarIcon,
	CodeIcon as RadixCodeIcon,
	ComponentInstanceIcon,
	DownloadIcon,
	EyeOpenIcon,
	GitHubLogoIcon,
	GlobeIcon as RadixGlobeIcon,
	HeartIcon,
	InfoCircledIcon,
	InstagramLogoIcon,
	LaptopIcon,
	Link2Icon,
	LinkedInLogoIcon,
	LockClosedIcon,
	MoonIcon,
	Pencil1Icon,
	PersonIcon,
	PieChartIcon,
	PlusIcon,
	RocketIcon as RadixRocketIcon,
	Share1Icon,
	StarFilledIcon,
	SunIcon,
	TableIcon,
	TargetIcon,
	TwitterLogoIcon,
	UploadIcon,
	ValueIcon,
	CheckIcon as RadixCheckIcon,
	PlusIcon as RadixPlusIcon,
	Link2Icon as RadixLink2Icon,
} from "@radix-ui/react-icons";
import React from "react";
import { cn } from "@/lib/utils";
import {
	CpuIcon,
	TabletIcon,
	RocketIcon,
	CodeIcon,
	CheckIcon,
	CreditCardIcon,
	PlusIcon as LucidePlusIcon,
	AppleIcon,
	MessageCircleIcon,
} from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import AppleLogo from "@/assets/images/apple_logo.svg";
import { ReviewCard } from "@/components/magicui/review-card";
import { AIShowcaseSection } from "@/components/magicui/ai-showcase-section";
import { ChatUISection } from "@/components/magicui/chat-ui-section";
import { FeatureCard } from "@/components/magicui/feature-card";
import { StickyScroll } from "@/components/magicui/sticky-scroll-reveal";
import { WavyBackground } from "@/components/magicui/wavy-background";

const BentoBackgroundPlaceholder = () => (
	<div className="absolute inset-0 bg-gradient-to-br from-rebe-gradient-start via-rebe-gradient-middle to-rebe-gradient-end opacity-10" />
);

const PlaceholderImage = ({
	text,
	className,
}: { text: string; className?: string }) => (
	<div
		className={cn(
			"flex aspect-video items-center justify-center rounded-lg bg-rebe-accent-70/20 text-rebe-text",
			className,
		)}
	>
		<p className="text-sm opacity-50">{text}</p>
	</div>
);

// 섹션 타입 정의
type SectionConfig = {
	id: string;
	ref?: React.RefObject<HTMLDivElement | null>;
	element?: () => HTMLElement | null;
};

export default function RebeLandingPageV2() {
	const heroRef = useRef<HTMLDivElement>(null);
	const problemSolutionRef = useRef<HTMLDivElement>(null);
	const techShowcaseRef = useRef<HTMLDivElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);
	const b2bRef = useRef<HTMLDivElement>(null);
	const testimonialsRef = useRef<HTMLDivElement>(null);
	const investmentRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);

	const userPersonaInternalRef = useRef<HTMLDivElement>(null);
	const aiPlatformInternalRef = useRef<HTMLDivElement>(null);

	// 스크롤 관련 상태
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [scrollStartY, setScrollStartY] = useState(0);
	const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
		null,
	);

	// AI 섹션 관련 상태
	const [aiSectionActive, setAiSectionActive] = useState(false);
	const [aiCurrentStep, setAiCurrentStep] = useState(0);

	// Sticky Scroll 관련 상태 추가
	const [stickyScrollActive, setStickyScrollActive] = useState(false);
	const [stickyScrollStep, setStickyScrollStep] = useState(0);

	// 섹션 정의를 useMemo로 최적화
	const sections: SectionConfig[] = useMemo(
		() => [
			{ id: "hero", ref: heroRef },
			{
				id: "ai-showcase",
				element: () =>
					document.querySelector('[data-section="ai-showcase"]') as HTMLElement,
			},
			{
				id: "chat-ui",
				element: () =>
					document.querySelector('[data-section="chat-ui"]') as HTMLElement,
			},
			{ id: "problem-solution", ref: problemSolutionRef },
			{ id: "tech-showcase", ref: techShowcaseRef },
			{ id: "stats", ref: statsRef },
			{ id: "b2b", ref: b2bRef },
			{ id: "testimonials", ref: testimonialsRef },
			{ id: "investment", ref: investmentRef },
		],
		[
			heroRef,
			problemSolutionRef,
			techShowcaseRef,
			statsRef,
			b2bRef,
			testimonialsRef,
			investmentRef,
		],
	);

	// 스크롤 임계값 계산 (화면 높이의 1/3)
	const getScrollThreshold = useCallback(() => {
		return window.innerHeight / 3;
	}, []);

	// 섹션으로 부드럽게 스크롤
	const scrollToSection = useCallback(
		(sectionIndex: number) => {
			const section = sections[sectionIndex];
			if (!section) return;

			let targetElement: HTMLElement | null = null;

			if (section.ref?.current) {
				targetElement = section.ref.current;
			} else if (section.element) {
				targetElement = section.element();
			}

			if (targetElement) {
				setIsScrolling(true);
				const targetTop = targetElement.offsetTop;

				window.scrollTo({
					top: targetTop,
					behavior: "smooth",
				});

				// 스크롤 완료 후 플래그 해제
				setTimeout(() => {
					setIsScrolling(false);
					setCurrentSectionIndex(sectionIndex);
				}, 800);
			}
		},
		[sections],
	);

	// 현재 섹션 인덱스 계산
	const getCurrentSectionIndex = useCallback(() => {
		const scrollY = window.scrollY;
		const windowHeight = window.innerHeight;

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			let element: HTMLElement | null = null;

			if (section.ref?.current) {
				element = section.ref.current;
			} else if (section.element) {
				element = section.element();
			}

			if (element) {
				const rect = element.getBoundingClientRect();
				const elementTop = scrollY + rect.top;
				const elementBottom = elementTop + rect.height;

				// 현재 뷰포트가 섹션과 겹치는지 확인
				if (
					scrollY >= elementTop - windowHeight / 2 &&
					scrollY < elementBottom - windowHeight / 2
				) {
					return i;
				}
			}
		}
		return 0;
	}, [sections]);

	const userReviews = [
		{
			id: "user-review-1",
			name: "김민지",
			username: "beauty_lover",
			date: "2024년 1월 15일",
			content:
				"REBE 앱 써봤는데 헤어스타일 바꾸는거 진짜 신기해요! 친구들한테도 추천했어요. 특히 AI가 제 얼굴형에 맞는 스타일을 추천해줘서 너무 만족스러워요.",
			rating: 5,
			category: "AI 헤어",
			beforeImage:
				"https://images.unsplash.com/photo-1594736797933-d0d2c8f2c7d7?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/beautylover",
		},
		{
			id: "user-review-2",
			name: "박소영",
			username: "tattoo_maybe",
			date: "2024년 1월 12일",
			content:
				"타투 고민 중이었는데 REBE 덕분에 미리 시뮬레이션 해보고 결정했어요! 퀄리티 대박이고 실제로 새긴 것과 거의 똑같아요.",
			rating: 5,
			category: "AI 타투",
			beforeImage:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/tattoomaybe",
		},
		{
			id: "user-review-3",
			name: "이지현",
			username: "cosmetic_daily",
			date: "2024년 1월 10일",
			content:
				"AI 메이크업 기능 써봤는데, 완전 자연스러워서 놀랐어요! 특별한 날 메이크업 참고하기 딱 좋고, 곰손인 저도 따라할 수 있어요.",
			rating: 5,
			category: "AI 메이크업",
			beforeImage:
				"https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/cosmeticdaily",
		},
		{
			id: "user-review-4",
			name: "최수현",
			username: "style_queen",
			date: "2024년 1월 8일",
			content:
				"진짜 혁신적이에요! 내가 원하는 스타일을 업로드하면 그대로 적용해주는게 신기해요. 미용실 가기 전에 미리 확인할 수 있어서 실패할 걱정이 없어요.",
			rating: 5,
			category: "커스텀 스타일",
			beforeImage:
				"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/stylequeen",
		},
	];

	const b2bPartners = [
		{
			id: "b2b-review-1",
			name: "김태현 원장",
			username: "gangnam_hair_ceo",
			date: "2024년 1월 20일",
			content:
				"우리 미용실에 REBE 도입하고 고객 만족도 엄청 올라갔어요! AI로 미리 스타일 보고 결정하니까 실패 확률이 제로예요. 매출도 30% 증가했습니다.",
			rating: 5,
			category: "B2B 솔루션",
			beforeImage:
				"https://images.unsplash.com/photo-1562004760-acb5dd13c0b5?w=300&h=300&fit=crop",
			afterImage:
				"https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=300&fit=crop",
			profileImage: "https://avatar.vercel.sh/hairsalonceo",
		},
		{
			id: "b2b-review-2",
			name: "박지은 실장",
			username: "makeup_master",
			date: "2024년 1월 18일",
			content:
				"메이크업 시연 전에 REBE로 고객님 피부톤에 맞는 컬러 추천하니까 훨씬 전문적으로 보여요. B2B 솔루션 진짜 강추합니다!",
			rating: 5,
			category: "B2B API",
			beforeImage:
				"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/makeupmaster",
		},
		{
			id: "b2b-review-3",
			name: "정민호 대표",
			username: "beauty_platform_ceo",
			date: "2024년 1월 16일",
			content:
				"REBE API를 저희 플랫폼에 통합했는데, 사용자 engagement가 3배 증가했어요. 기술력이 정말 뛰어나고 지원팀도 친절해서 만족합니다.",
			rating: 5,
			category: "플랫폼 연동",
			beforeImage:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
			afterImage:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
			profileImage: "https://avatar.vercel.sh/platformceo",
		},
	];

	const techIcons = [
		<CpuIcon className="size-10 text-rebe-accent" key="cpu-icon" />,
		<RadixCodeIcon
			className="size-10 text-rebe-accent"
			key="radix-code-icon"
		/>,
		<ComponentInstanceIcon
			className="size-10 text-rebe-accent"
			key="component-icon"
		/>,
		<TargetIcon className="size-10 text-rebe-accent" key="target-icon" />,
		<ValueIcon className="size-10 text-rebe-accent" key="value-icon" />,
		<RocketIcon
			className="size-10 text-rebe-accent"
			key="rocket-icon-lucide"
		/>,
		<HeartIcon className="size-10 text-rebe-accent" key="heart-icon" />,
		<StarFilledIcon className="size-10 text-rebe-accent" key="star-icon" />,
	];

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let wheelTimeout: NodeJS.Timeout;
		const touchStartY = 0;
		let accumulatedDelta = 0;

		const handleWheel = (e: WheelEvent) => {
			if (isScrolling) {
				e.preventDefault();
				return;
			}

			// AI 섹션이나 Sticky Scroll 섹션이 활성화되어 있으면 해당 섹션에서 처리
			if (aiSectionActive || stickyScrollActive) {
				return;
			}

			// 일반 섹션 스크롤 로직
			// 스크롤 시작점 기록
			if (!scrollStartY) {
				setScrollStartY(window.scrollY);
			}

			// 스크롤 방향 감지
			const direction = e.deltaY > 0 ? "down" : "up";
			setScrollDirection(direction);

			// 델타 누적
			accumulatedDelta += Math.abs(e.deltaY);

			// 임계값 확인
			const threshold = getScrollThreshold();

			if (accumulatedDelta >= threshold) {
				e.preventDefault();

				const currentIndex = getCurrentSectionIndex();
				let targetIndex = currentIndex;

				if (direction === "down" && currentIndex < sections.length - 1) {
					targetIndex = currentIndex + 1;
				} else if (direction === "up" && currentIndex > 0) {
					targetIndex = currentIndex - 1;
				}

				if (targetIndex !== currentIndex) {
					scrollToSection(targetIndex);
				}

				// 리셋
				accumulatedDelta = 0;
				setScrollStartY(0);
			}

			// 휠 이벤트가 멈추면 리셋
			clearTimeout(wheelTimeout);
			wheelTimeout = setTimeout(() => {
				accumulatedDelta = 0;
				setScrollStartY(0);
				setScrollDirection(null);
			}, 150);
		};

		const handleTouchStart = (e: TouchEvent) => {
			if (isScrolling) return;
			const touchY = e.touches[0].clientY;
			setScrollStartY(window.scrollY);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (isScrolling) {
				e.preventDefault();
				return;
			}

			const touchY = e.touches[0].clientY;
			const deltaY = touchStartY - touchY;
			const threshold = getScrollThreshold();

			if (Math.abs(deltaY) >= threshold) {
				e.preventDefault();

				const currentIndex = getCurrentSectionIndex();
				let targetIndex = currentIndex;
				const direction = deltaY > 0 ? "down" : "up";

				if (direction === "down" && currentIndex < sections.length - 1) {
					targetIndex = currentIndex + 1;
				} else if (direction === "up" && currentIndex > 0) {
					targetIndex = currentIndex - 1;
				}

				if (targetIndex !== currentIndex) {
					scrollToSection(targetIndex);
				}

				setScrollStartY(0);
			}
		};

		const handleTouchEnd = () => {
			setScrollStartY(0);
			setScrollDirection(null);
		};

		// 키보드 이벤트 (Page Up/Down, Arrow keys)
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isScrolling || aiSectionActive || stickyScrollActive) return;

			const currentIndex = getCurrentSectionIndex();
			let targetIndex = currentIndex;

			switch (e.key) {
				case "ArrowDown":
				case "PageDown":
					if (currentIndex < sections.length - 1) {
						targetIndex = currentIndex + 1;
					}
					break;
				case "ArrowUp":
				case "PageUp":
					if (currentIndex > 0) {
						targetIndex = currentIndex - 1;
					}
					break;
				case "Home":
					targetIndex = 0;
					break;
				case "End":
					targetIndex = sections.length - 1;
					break;
			}

			if (targetIndex !== currentIndex) {
				e.preventDefault();
				scrollToSection(targetIndex);
			}
		};

		// 이벤트 리스너 등록
		window.addEventListener("wheel", handleWheel, { passive: false });
		window.addEventListener("touchstart", handleTouchStart, { passive: false });
		window.addEventListener("touchmove", handleTouchMove, { passive: false });
		window.addEventListener("touchend", handleTouchEnd);
		window.addEventListener("keydown", handleKeyDown);

		// 초기 섹션 인덱스 설정
		setCurrentSectionIndex(getCurrentSectionIndex());

		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			window.removeEventListener("keydown", handleKeyDown);
			clearTimeout(wheelTimeout);
		};
	}, [
		isScrolling,
		aiSectionActive,
		stickyScrollActive,
		getCurrentSectionIndex,
		scrollToSection,
		getScrollThreshold,
	]);

	// AI 섹션 스텝 변경 핸들러 수정
	const handleAiStepChange = useCallback(
		(currentStep: number, isLastStep: boolean) => {
			setAiCurrentStep(currentStep);
			// 마지막 스텝이거나 섹션이 뷰에서 벗어나면 비활성화
			setAiSectionActive(!isLastStep);
		},
		[],
	);

	// AI 섹션 종료 핸들러 수정
	const handleAiSectionExit = useCallback(() => {
		setAiSectionActive(false);
		setAiCurrentStep(0);
	}, []);

	// Sticky Scroll 스텝 변경 핸들러
	const handleStickyScrollStepChange = useCallback(
		(currentStep: number, isLastStep: boolean) => {
			setStickyScrollStep(currentStep);
			setStickyScrollActive(!isLastStep);
		},
		[],
	);

	// Sticky Scroll 섹션 종료 핸들러
	const handleStickyScrollSectionExit = useCallback(() => {
		setStickyScrollActive(false);
		setStickyScrollStep(0);
	}, []);

	return (
		<div className="flex min-h-screen flex-col font-sans text-rebe-slate-800 antialiased bg-rebe-slate-100">
			{/* 스크롤 진행 인디케이터 */}
			<div className="fixed top-1/2 right-4 z-50 flex flex-col space-y-2 transform -translate-y-1/2">
				{sections.map((section, index) => (
					<button
						key={section.id}
						type="button"
						onClick={() =>
							!isScrolling &&
							!aiSectionActive &&
							!stickyScrollActive &&
							scrollToSection(index)
						}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							currentSectionIndex === index
								? "bg-rebe-purple-600 scale-125"
								: "bg-rebe-purple-300 hover:bg-rebe-purple-400"
						}`}
						disabled={isScrolling || aiSectionActive || stickyScrollActive}
						aria-label={`${section.id} 섹션으로 이동`}
					/>
				))}
			</div>

			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b border-rebe-purple-300/50 bg-rebe-white/50 backdrop-blur-xl">
				<div className="container mx-auto flex h-12 md:h-20 items-center px-4 md:px-8">
					<AuroraText>REBE</AuroraText>
					<nav className="hidden items-center space-x-8 text-lg md:flex ml-auto">
						<a
							href="#features"
							className="text-rebe-text/80 hover:text-rebe-blue-600 transition-colors duration-300"
						>
							비즈니스 문의
						</a>
					</nav>
					<ShinyButton className="w-auto ml-12 border-rebe-purple-500 bg-gradient-to-r from-rebe-purple-300 to-rebe-blue-300 hover:shadow-rebe-purple-500/40">
						<p className="h-full flex items-center justify-center font-bold text-xl">
							앱 다운로드
						</p>
					</ShinyButton>
				</div>
			</header>

			{/* Hero Section with Wavy Background */}
			<WavyBackground
				containerClassName="h-screen"
				blur={20}
				speed="slow"
				waveOpacity={1}
			>
				<section
					ref={heroRef}
					className="relative flex w-full flex-col items-center justify-center overflow-hidden py-24 text-center lg:py-32"
				>
					<div className="container flex flex-col items-center justify-center relative z-10 px-4 md:px-8">
						<BlurFade delay={0.2} inView>
							<TextAnimate
								as="h2"
								animation="blurInUp"
								by="word"
								duration={0.8}
								className="text-4xl font-medium leading-tight tracking-tight text-rebe-slate-900 md:text-4xl lg:text-5xl xl:text-6xl"
							>
								나만의 뷰티 스타일리스트
							</TextAnimate>
							<BlurFade delay={1.2} inView>
								<AuroraText className="text-5xl font-semibold leading-tight tracking-tighter text-transparent md:text-6xl lg:text-7xl xl:text-8xl">
									REBE AI
								</AuroraText>
							</BlurFade>
						</BlurFade>

						<BlurFade delay={0.6} inView>
							<div className="flex flex-col items-center justify-center gap-6 sm:flex-row mt-16">
								<InteractiveHoverButton className="w-full tracking-tight font-semibold rounded-full border border-rebe-slate-600 px-8 py-4 text-lg text-rebe-slate-800 shadow-sm transition-all hover:shadow-rebe-gray-700/50 sm:w-auto bg-transparent hover:bg-rebe-slate-900 hover:text-rebe-slate-50">
									IOS 다운로드
								</InteractiveHoverButton>
								<InteractiveHoverButton className="w-full tracking-tight font-semibold rounded-full border border-rebe-slate-600 px-8 py-4 text-lg text-rebe-slate-800 shadow-sm transition-all hover:shadow-rebe-gray-700/50 sm:w-auto bg-transparent hover:bg-rebe-slate-900 hover:text-rebe-slate-50">
									안드로이드 다운로드
								</InteractiveHoverButton>
							</div>
						</BlurFade>
					</div>
				</section>
			</WavyBackground>

			{/* AI Showcase Section - 스텝 기반 스크롤 */}
			<div data-section="ai-showcase">
				<AIShowcaseSection
					onStepChange={handleAiStepChange}
					onSectionExit={handleAiSectionExit}
				/>
			</div>

			{/* 채팅 UI 섹션 */}
			<div data-section="chat-ui">
				<ChatUISection />
			</div>

			{/* Problem & Solution Section */}
			<section
				ref={problemSolutionRef}
				className="relative min-h-screen py-12 md:py-24  bg-rebe-slate-100 overflow-hidden flex flex-col items-center justify-center"
			>
				{/* 배경 패턴 */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rebe-purple-500 to-rebe-blue-500 rounded-full blur-2xl" />
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rebe-blue-500 to-rebe-pink-500 rounded-full blur-2xl" />
				</div>

				<TextAnimate
					as="h3"
					animation="slideUp"
					by="word"
					duration={0.7}
					className="font-normal tracking-tight text-rebe-slate-800 text-4xl mb-1 lg:mb-3 md:text-5xl lg:text-6xl text-center"
				>
					뷰티 AI의 새로운 기준,
				</TextAnimate>
				<TextAnimate
					as="h3"
					animation="slideUp"
					by="word"
					duration={0.7}
					className="mb-12 md:mb-16 xl:mb-16 font-normal tracking-tight leading-normal text-rebe-slate-800 text-4xl md:text-5xl lg:text-6xl text-center"
				>
					REBE가 만들어 갑니다.
				</TextAnimate>
				<div className="flex flex-col justify-center relative z-10 min-h-full min-w-full">
					{/* 카드 그리드 */}
					<div className="grid grid-cols-1 gap-0 md:grid-cols-3">
						{[
							{
								IconEl: LockClosedIcon,
								title: "프리셋의 한계를 넘어서",
								description:
									"정해진 스타일만 반복하던 기존 앱과 달리, REBE는 사용자가 원하는 어떤 이미지든 자유롭게 조합하여 세상에 없던 스타일을 창조합니다.",
								gradient: "from-rebe-blue-500 to-rebe-purple-500",
								iconColor: "text-rebe-blue-600",
							},
							{
								IconEl: CheckIcon,
								title: "시뮬레이션 수준의 퀄리티",
								description:
									"단순 합성을 넘어, 실제 시술/스타일링과 유사한 초고화질 결과물을 제공합니다. 어색함 없이 완벽하게 어울리는 모습을 확인하세요.",
								gradient: "from-rebe-purple-500 to-rebe-pink-500",
								iconColor: "text-rebe-purple-600",
							},
							{
								IconEl: CreditCardIcon,
								title: "비용 부담 없는 혁신",
								description:
									"자체 개발 AI 워크플로우로 고품질 합성에 필요한 비용을 획기적으로 절감했습니다. 누구나 부담 없이 최상의 기술을 경험할 수 있습니다.",
								gradient: "from-rebe-pink-500 to-rebe-blue-500",
								iconColor: "text-rebe-pink-600",
							},
						].map((item, index) => (
							<FeatureCard
								key={item.title}
								icon={item.IconEl}
								title={item.title}
								description={item.description}
								iconColor={item.iconColor}
								delay={0.3 + index * 0.1}
								className="border-r-0  rounded-none min-h-[12rem] md:min-h-[24rem] lg:min-h-[36rem]"
							/>
						))}
					</div>
				</div>
			</section>

			{/* Technology Showcase - StickyScroll로 리팩터링 */}
			<section
				ref={techShowcaseRef}
				data-section="tech-showcase"
				className="min-h-screen w-full py-16 lg:py-32 flex flex-col items-center justify-center"
			>
				<BlurFade delay={0.2} inView>
					<TextAnimate
						as="h3"
						animation="slideUp"
						by="word"
						duration={0.7}
						className="mb-12 xl:mb-36 text-center text-4xl font-normal tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
					>
						Deep dive to REBE AI
					</TextAnimate>
				</BlurFade>

				<StickyScroll
					onStepChange={handleStickyScrollStepChange}
					onSectionExit={handleStickyScrollSectionExit}
					content={[
						{
							title: "AI 멀티모달 기술",
							description:
								"두 개의 이미지를 단순 결합하는 것을 넘어, 각 이미지의 스타일과 특징을 깊이 이해하고 분석하여 조화롭고 창의적인 결과물을 생성합니다.",
							content: (
								<div className="h-full w-full flex items-center justify-center">
									<img
										src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center"
										alt="AI 멀티모달 기술 3D 시각화"
										className="h-full w-full object-cover rounded-lg"
									/>
								</div>
							),
						},
						{
							title: "자체 AI 합성 워크플로우",
							description:
								"수많은 연구와 테스트를 거쳐 개발된 REBE만의 AI 합성 파이프라인은 고품질 결과물을 빠르고 효율적으로 제공하며, 지속적인 학습을 통해 성능이 향상됩니다.",
							content: (
								<div className="h-full w-full flex items-center justify-center">
									<img
										src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
										alt="AI 워크플로우 3D 시각화"
										className="h-full w-full object-cover rounded-lg"
									/>
								</div>
							),
						},
						{
							title: "완전 자동화 시스템",
							description:
								"복잡한 설정이나 전문 지식 없이도, 사용자는 단 몇 번의 터치만으로 원하는 스타일을 즉시 확인할 수 있는 직관적이고 자동화된 시스템을 구현했습니다.",
							content: (
								<div className="h-full w-full flex items-center justify-center">
									<img
										src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&crop=center"
										alt="자동화 시스템 3D 시각화"
										className="h-full w-full object-cover rounded-lg"
									/>
								</div>
							),
						},
					]}
				/>
			</section>

			{/* Statistics & Proof Section */}
			<section ref={statsRef} className="py-16 lg:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="fadeIn"
							by="word"
							duration={0.7}
							className="mb-12 xl:mb-24 xxl:mb-36 text-center text-4xl font-normal tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
						>
							수치로 증명하는 사용자 수요
						</TextAnimate>
					</BlurFade>
					<div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 lg:gap-12">
						{[
							{
								value: 95,
								label: "사용자 만족도",
								unit: "%",
								color: "text-rebe-blue-600",
								bgGradient: "from-rebe-blue-100 to-rebe-purple-100",
							},
							{
								value: 100,
								label: "무료 크레딧 소진율",
								unit: "%",
								color: "text-rebe-purple-600",
								bgGradient: "from-rebe-purple-100 to-rebe-pink-100",
							},
							{
								value: 3,
								label: "평균 생성 수",
								unit: "+ 회",
								color: "text-rebe-pink-600",
								bgGradient: "from-rebe-pink-100 to-rebe-blue-100",
							},
							{
								value: 1200,
								label: "긍정 피드백",
								unit: "+ 건",
								color: "text-rebe-blue-700",
								bgGradient: "from-rebe-blue-100 to-rebe-purple-100",
							},
						].map((stat, index) => (
							<BlurFade delay={0.2 + index * 0.1} key={stat.label} inView>
								<div
									className={`flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bgGradient} p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
								>
									<AnimatedCircularProgressBar
										max={100}
										min={0}
										value={stat.value > 100 ? 100 : stat.value}
										gaugePrimaryColor="#494791"
										gaugeSecondaryColor="#E4E0FF"
										className="mb-4"
									/>
									<p className="mt-2 text-lg font-medium text-rebe-gray-700">
										{stat.label}
									</p>
									<p className={`text-5xl font-bold ${stat.color}`}>
										<NumberTicker value={stat.value} />
										{stat.unit}
									</p>
								</div>
							</BlurFade>
						))}
					</div>
				</div>
			</section>

			{/* B2B Solutions Section */}
			<section
				ref={b2bRef}
				className="min-h-screen py-16 lg:py-32 flex flex-col items-center justify-center"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-12 xl:mb-36 text-center text-4xl font-normal tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
						>
							비즈니스를 위한 REBE 맞춤 솔루션
						</TextAnimate>
					</BlurFade>
					<div className="grid items-center gap-4 md:gap-16 lg:grid-cols-2 ">
						<div className="flex justify-center items-center w-full">
							<div className=" relative flex h-[12rem] w-[12rem] items-center justify-center md:h-[24rem] md:w-full lg:h-[36rem]">
								<Globe
									config={{
										width: 800,
										height: 800,
										onRender: () => {},
										devicePixelRatio: 2,
										phi: 0,
										theta: 0.3,
										dark: 0,
										diffuse: 0.4,
										mapSamples: 16000,
										mapBrightness: 1.2,
										baseColor: [0.9, 0.9, 0.95],
										glowColor: [0.8, 0.7, 1],
										markerColor: [0.286, 0.278, 0.568],
										markers: [
											{ location: [37.5665, 126.978], size: 0.1 },
											{ location: [34.0522, -118.2437], size: 0.1 },
											{ location: [51.5074, 0.1278], size: 0.1 },
											{ location: [35.6895, 139.6917], size: 0.1 },
											{ location: [48.8566, 2.3522], size: 0.1 },
										],
									}}
								/>
							</div>
						</div>
						<div className="space-y-10 md:space-y-10">
							{[
								{
									IconEl: Share1Icon,
									title: "미용실 / 스타일링 샵",
									description:
										"고객에게 시술 결과를 미리 보여주고, 스타일 선택 과정을 즐거운 경험으로 만드세요.\n태블릿, 키오스크 등 다양한 디바이스를 완벽 지원합니다.",
								},
								{
									IconEl: RadixLink2Icon,
									title: "제품 시연 및 체험",
									description:
										"판매하는 뷰티 제품의 마케팅 채널로 활용하세요. 고객이 직접 제품 체험을 합성해보며 자연스럽게 구매로 이어지도록 도와드려요",
								},
								{
									IconEl: RadixGlobeIcon,
									title: "국제화 지원",
									description:
										"REBE가 제공하는 모든 제품은 약 81개 국어를 지원해요. 외국인 고객도 쉽게 사용할 수 있어요",
								},
								{
									IconEl: RadixGlobeIcon,
									title: "OPEN API 제공",
									description:
										"REBE의 기술력을 활용하여 비즈니스 확장을 위한 개발자 친화적 API를 제공합니다.",
								},
							].map((item, index) => (
								<BlurFade delay={0.2 + index * 0.1} key={item.title} inView>
									<div className="flex items-start space-x-6">
										<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rebe-slate-800 text-rebe-slate-50 shadow-none">
											<item.IconEl className="size-6" />
										</div>
										<div>
											<h4 className="text-xl md:text-2xl xl:text-4xl tracking-tight leading-6 xl:leading-10 font-medium text-rebe-slate-800">
												{item.title}
											</h4>
											<p className="mt-1 xl:mt-3 ml-1 text-md leading-normal md:text-lg xl:text-lg xl:leading-relaxed tracking-tight text-rebe-slate-700">
												{item.description}
											</p>
										</div>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section
				ref={testimonialsRef}
				className="min-h-screen/2 py-24 lg:py-32 flex flex-col items-center justify-center"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-16 text-center text-4xl font-normal tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
						>
							REBE를 경험한 생생한 목소리
						</TextAnimate>
					</BlurFade>
					<div className="relative">
						<Marquee className="  py-6" pauseOnHover>
							{[...userReviews, ...b2bPartners].map((review, idx) => (
								<ReviewCard
									key={`review-${review.id}-${idx}`}
									name={review.name}
									username={review.username}
									date={review.date}
									content={review.content}
									rating={review.rating}
									category={review.category}
									beforeImage={review.beforeImage}
									afterImage={review.afterImage}
									profileImage={review.profileImage}
									className="w-96 flex-shrink-0"
								/>
							))}
						</Marquee>
					</div>
				</div>
			</section>

			{/* Investment Appeal Section */}
			<section
				ref={investmentRef}
				className="bg-gradient-to-br from-rebe-purple-100 via-rebe-blue-50 to-rebe-pink-100 py-32 text-center lg:py-40"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.25} inView>
						<TextAnimate
							as="h3"
							animation="slideRight"
							by="word"
							duration={0.8}
							className="mb-8 text-4xl font-extrabold leading-tight tracking-tighter text-rebe-slate-800 md:text-6xl lg:text-7xl"
						>
							나만의 AI 스타일리스트 REBE와 함께하세요
						</TextAnimate>
					</BlurFade>
					<BlurFade delay={0.45} inView>
						<p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-rebe-slate-700 md:text-2xl">
							REBE는 AI 뷰티 시장의 새로운 기준을 제시하며 빠르게 성장하고
							있습니다.
						</p>
					</BlurFade>
					<BlurFade delay={0.65} inView>
						<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
							<ShinyButton className="h-16 rounded-fullhover:shadow-2xl bg-gradient-to-r from-rebe-purple-300 to-rebe-blue-300">
								<p className="h-full flex items-center justify-center font-bold text-xl">
									<MessageCircleIcon className="size-6 mr-2" />
									비즈니스 문의
								</p>
							</ShinyButton>
						</div>
					</BlurFade>
				</div>
			</section>

			{/* Footer */}
			<footer
				ref={footerRef}
				className="border-t border-rebe-purple-300/30 bg-gradient-to-r from-rebe-gray-50 to-rebe-purple-50 py-10 backdrop-blur-sm"
			>
				<div className="container mx-auto flex flex-col items-center justify-between px-4 text-center md:flex-row md:px-8 md:text-left">
					<TextAnimate
						as="p"
						animation="fadeIn"
						delay={0.1}
						className="text-rebe-gray-600"
					>
						&copy; {new Date().getFullYear()} REBE Technologies Inc. All rights
						reserved.
					</TextAnimate>
					<div className="mt-6 flex space-x-6 md:mt-0">
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitter"
							className="text-rebe-gray-600 hover:text-rebe-blue-600 transition-colors duration-300"
						>
							<TwitterLogoIcon className="size-6" />
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="text-rebe-gray-600 hover:text-rebe-pink-600 transition-colors duration-300"
						>
							<InstagramLogoIcon className="size-6" />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="text-rebe-gray-600 hover:text-rebe-purple-600 transition-colors duration-300"
						>
							<LinkedInLogoIcon className="size-6" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Globe } from "@/components/magicui/globe";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { ShinyButton } from "@/components/magicui/shiny-button";
import {
	CodeIcon as RadixCodeIcon,
	ComponentInstanceIcon,
	GlobeIcon as RadixGlobeIcon,
	HeartIcon,
	InfoCircledIcon,
	InstagramLogoIcon,
	LaptopIcon,
	Link2Icon,
	LinkedInLogoIcon,
	LockClosedIcon,
	RocketIcon as RadixRocketIcon,
	Share1Icon,
	StarFilledIcon,
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
import { useFullPageScroll } from "@/hooks/useFullPageScroll";
import { SectionDots } from "@/components/magicui/section-dots";

export default function RebeLandingPageV2() {
	const problemSolutionRef = useRef<HTMLDivElement>(null);
	const techShowcaseRef = useRef<HTMLDivElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);
	const b2bRef = useRef<HTMLDivElement>(null);
	const testimonialsRef = useRef<HTMLDivElement>(null);
	const investmentRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const aiShowcaseRef = useRef<HTMLDivElement>(null);
	const [sectionsLimit, setSectionsLimit] = useState(0);
	const [showDots, setShowDots] = useState(true);

	const [disableScroll, setDisableScroll] = useState(false);

	// FullPageScroll 훅 사용 - 첫 번째 섹션(Hero, index: 0)에서만 스크롤 다운 허용
	const { outerDivRef, currentPage, movePageTo, scrollDown } =
		useFullPageScroll({
			enabledSections: [0, 1, 2, 3, 4, 5, 6, 7, 8], // Hero 섹션(index 0)에서만 스크롤 허용
			onPageChange: (page) => {
				if (page === 1 || page === 4) {
					console.log("disableScroll", page);
					setDisableScroll(true);
				} else {
					setDisableScroll(false);
				}
			},

			onLoad: (limit) => {
				setSectionsLimit(limit);
			},
			scrollDelay: 800,
			disableScroll,
		});

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

	return (
		<div className="flex h-screen flex-col font-sans text-rebe-slate-800 antialiased bg-rebe-slate-100">
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

			{/* 섹션 도트 인디케이터 - Hero 섹션에서만 표시 */}
			{showDots && sectionsLimit > 0 && (
				<SectionDots
					limit={8} // Hero와 AI Showcase 섹션만
					currentIndex={currentPage}
					onDotClick={movePageTo}
				/>
			)}

			{/* FullPageScroll 컨테이너 */}
			<div ref={outerDivRef} className="h-screen w-full overflow-y-auto">
				{/* Hero Section */}
				<section
					ref={heroRef}
					className="h-screen w-full"
					style={{ scrollSnapAlign: "start" }}
				>
					<WavyBackground
						containerClassName="h-full"
						blur={20}
						speed="slow"
						waveOpacity={1}
					>
						<div className="relative flex w-full h-full flex-col items-center justify-center overflow-hidden py-24 text-center lg:py-32">
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
						</div>
					</WavyBackground>
				</section>

				{/* AI Showcase Section */}
				<section
					ref={aiShowcaseRef}
					className="h-screen w-full"
					style={{ scrollSnapAlign: "start" }}
				>
					<AIShowcaseSection
						onStepChange={(step, isLastStep) => {
							if (isLastStep) {
								setDisableScroll(false);
							}
						}}
						onSectionExit={(currentStep) => {
							if (currentStep === 0) {
								movePageTo(0);
								return;
							}

							movePageTo(2);
						}}
					/>
				</section>

				<div data-section="chat-ui">
					<ChatUISection />
				</div>

				{/* Problem & Solution Section */}
				<section
					ref={problemSolutionRef}
					className="relative h-screen bg-rebe-slate-100 overflow-hidden flex flex-col items-center justify-center pb-16 md:pb-32"
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
						className=" font-extralight mb-1 md:mb-2 tracking-tight leading-normal text-rebe-slate-800 text-4xl md:text-5xl lg:text-6xl text-center"
					>
						REBE가 만들어 가는
					</TextAnimate>
					<TextAnimate
						as="h3"
						animation="slideUp"
						by="word"
						duration={0.7}
						className="mb-12 md:mb-24 xl:mb-24 font-medium tracking-tight text-rebe-slate-800 text-4xl  md:text-5xl lg:text-6xl text-center"
					>
						뷰티 AI의 새로운 기준
					</TextAnimate>
					<div className="flex flex-col justify-center relative z-10 min-w-full">
						{/* 카드 그리드 */}
						<div className="grid grid-cols-1 gap-0 md:grid-cols-3">
							{[
								{
									IconEl: LockClosedIcon,
									title: "프리셋의 한계를 넘어서",
									description:
										"정해진 스타일만 반복하던 기존 앱과 달리, REBE는 사용자가 원하는 어떤 이미지든 자유롭게 조합하여 세상에 없던 스타일을 창조합니다.",
									subDescription:
										"정해진 스타일만 제공하지 않고, 사용자가 원하는 어떤 이미지든 자유롭게 합성할 수 있어요.",
									gradient: "from-rebe-blue-500 to-rebe-purple-500",
									iconColor: "text-rebe-blue-600",
								},
								{
									IconEl: CheckIcon,
									title: "시뮬레이션 수준의 퀄리티",
									description:
										"단순 합성을 넘어, 실제 시술/스타일링과 유사한 초고화질 결과물을 제공합니다. 어색함 없이 완벽하게 어울리는 모습을 확인하세요.",
									subDescription:
										"필터가 수준이 아닌, 실제 시술/스타일링과 유사한 결과물을 제공해요.",
									gradient: "from-rebe-purple-500 to-rebe-pink-500",
									iconColor: "text-rebe-purple-600",
								},
								{
									IconEl: CreditCardIcon,
									title: "비용 부담 없는 혁신",
									description:
										"자체 개발 AI 워크플로우로 고품질 합성에 필요한 비용을 획기적으로 절감했습니다. 누구나 부담 없이 최상의 기술을 경험할 수 있습니다.",
									subDescription:
										"자체 개발 AI 워크플로우로 생성 비용을 획기적으로 절감했어요",
									gradient: "from-rebe-pink-500 to-rebe-blue-500",
									iconColor: "text-rebe-pink-600",
								},
							].map((item, index) => (
								<FeatureCard
									key={item.title}
									icon={item.IconEl}
									title={item.title}
									description={item.description}
									subDescription={item.subDescription}
									iconColor={item.iconColor}
									delay={0.3 + index * 0.1}
									className="border-r-0 rounded-none min-h-[12rem] md:min-h-[24rem] lg:min-h-[36rem]"
								/>
							))}
						</div>
					</div>
				</section>

				{/* Technology Showcase - StickyScroll */}
				<section
					ref={techShowcaseRef}
					data-section="tech-showcase"
					className="h-screen w-full flex flex-col items-center justify-center pb-16 md:pb-44"
				>
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-12 md:mb-24 text-center text-4xl font-light tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
						>
							Deep dive to REBE AI
						</TextAnimate>
					</BlurFade>

					<StickyScroll
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
				<section
					ref={statsRef}
					className="h-screen w-full flex flex-col items-center justify-center pb-16 md:pb-36 "
				>
					<div className="container mx-auto px-4 md:px-8 md:w-3/4">
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
						<div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:gap-12 ">
							{[
								{
									value: 87,
									label: "사용자 만족도",
									unit: "%",
									color: "text-rebe-blue-600",
									bgGradient: "from-rebe-blue-100 to-rebe-purple-100",
								},
								{
									value: 74.8,
									label: "1달 내 재방문율",
									unit: "%",
									color: "text-rebe-purple-600",
									bgGradient: "from-rebe-purple-100 to-rebe-pink-100",
								},
								{
									value: 8.2,
									label: "평균 생성 수",
									unit: "+ 회",
									color: "text-rebe-pink-600",
									bgGradient: "from-rebe-pink-100 to-rebe-blue-100",
								},
							].map((stat, index) => (
								<BlurFade delay={0.2 + index * 0.1} key={stat.label} inView>
									<div
										className={
											"flex flex-col items-center rounded-4xl py-8 shadow-xl shadow-rebe-slate-400/40 transition-all hover:scale-105 hover:shadow-xl backdrop-blur-lg bg-rebe-slate-100/30 border-2 border-rebe-slate-300/60"
										}
									>
										<AnimatedCircularProgressBar
											max={100}
											min={0}
											value={stat.value > 100 ? 100 : stat.value}
											gaugePrimaryColor={"#0070F3"}
											gaugeSecondaryColor={"#95b9ef70"}
										/>
										<p className="text-xl md:text-2xl font-medium leading-tight text-rebe-gray-800/70 mt-8">
											{stat.label}
										</p>
										<AuroraText
											className={`text-3xl md:text-5xl font-semibold tracking-tighte ${stat.color}`}
										>
											<NumberTicker value={stat.value} />
											{stat.unit}
										</AuroraText>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
				</section>

				{/* B2B Solutions Section */}
				<section
					ref={b2bRef}
					className="h-screen flex flex-col items-center justify-center pb-16 md:pb-36"
				>
					<div className="container mx-auto px-4 md:px-8">
						<BlurFade delay={0.2} inView>
							<TextAnimate
								as="h3"
								animation="slideUp"
								by="word"
								duration={0.7}
								className="mb-12 md:mb-24 text-center text-4xl font-light tracking-tight text-rebe-slate-800 md:text-5xl lg:text-6xl"
							>
								비즈니스를 위한 REBE 맞춤 솔루션
							</TextAnimate>
						</BlurFade>
						<div className="grid items-center gap-4 md:gap-16 lg:grid-cols-2">
							<div className="hidden md:flex justify-center items-center w-full">
								<div className="relative flex h-[12rem] w-[12rem] items-center justify-center md:h-[24rem] md:w-full lg:h-[36rem]">
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
					className="h-screen py-24 lg:py-32 flex flex-col items-center justify-center"
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
							<Marquee className="py-6" pauseOnHover>
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
					className="h-screen bg-gradient-to-br from-rebe-purple-100 via-rebe-blue-50 to-rebe-pink-100 py-32 text-center lg:py-40"
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
								<ShinyButton className="h-16 rounded-full hover:shadow-2xl bg-gradient-to-r from-rebe-purple-300 to-rebe-blue-300">
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
				<footer className="border-t border-rebe-purple-300/30 bg-gradient-to-r from-rebe-gray-50 to-rebe-purple-50 py-10 backdrop-blur-sm">
					<div className="container mx-auto flex flex-col items-center justify-between px-4 text-center md:flex-row md:px-8 md:text-left">
						<TextAnimate
							as="p"
							animation="fadeIn"
							delay={0.1}
							className="text-rebe-gray-600"
						>
							&copy; {new Date().getFullYear()} REBE Technologies Inc. All
							rights reserved.
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
		</div>
	);
}

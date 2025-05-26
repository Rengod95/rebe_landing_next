"use client";

import { useRef } from "react";
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
} from "lucide-react";

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

	const userReviews = [
		{
			id: "1700203000000000000",
			text: "REBE 앱 써봤는데 헤어스타일 바꾸는거 진짜 신기해요! 친구들한테도 추천했어요 😍 #REBE #AI헤어",
			user: {
				name: "뷰티인싸",
				screen_name: "beauty_lover",
				profile_image_url_https: "https://avatar.vercel.sh/beautylover",
			},
		},
		{
			id: "1700204000000000000",
			text: "타투 고민 중이었는데 REBE 덕분에 미리 시뮬레이션 해보고 결정했어요! 퀄리티 대박 👍 #AI타투 #REBE앱",
			user: {
				name: "타투할까말까",
				screen_name: "tattoo_maybe",
				profile_image_url_https: "https://avatar.vercel.sh/tattoomaybe",
			},
		},
		{
			id: "1700205000000000000",
			text: "AI 메이크업 기능 써봤는데, 완전 자연스러워서 놀랐어요! 특별한 날 메이크업 참고하기 딱 좋아요 ✨ #AI메이크업 #곰손탈출",
			user: {
				name: "코덕일상",
				screen_name: "cosmetic_daily",
				profile_image_url_https: "https://avatar.vercel.sh/cosmeticdaily",
			},
		},
	];

	const b2bPartners = [
		{
			id: "1700206000000000000",
			text: "우리 미용실에 REBE 도입하고 고객 만족도 엄청 올라갔어요! AI로 미리 스타일 보고 결정하니까 실패 확률 제로! #미용실필수템 #REBE파트너",
			user: {
				name: "강남헤어살롱 원장",
				screen_name: "gangnam_hair_ceo",
				profile_image_url_https: "https://avatar.vercel.sh/hairsalonceo",
			},
		},
		{
			id: "1700207000000000000",
			text: "메이크업 시연 전에 REBE로 고객님 피부톤에 맞는 컬러 추천하니까 훨씬 전문적으로 보여요. B2B 솔루션 강추! #메이크업아티스트 #REBE솔루션",
			user: {
				name: "청담메이크업 실장",
				screen_name: "makeup_master",
				profile_image_url_https: "https://avatar.vercel.sh/makeupmaster",
			},
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

	const featureCards = [
		{
			Icon: Pencil1Icon,
			name: "AI 헤어 합성",
			description:
				"수천 가지 헤어스타일을 내 얼굴에! 터치 한 번으로 완벽 변신.",
			href: "#",
			cta: "자세히 보기",
			className: "col-span-3 lg:col-span-2",
			background: (
				<PlaceholderImage text="AI 헤어 합성 예시" className="h-full w-full" />
			),
		},
		{
			Icon: EyeOpenIcon,
			name: "AI 메이크업 합성",
			description:
				"곰손도 금손으로! 다양한 메이크업 필터를 실시간으로 적용해보세요.",
			href: "#",
			cta: "자세히 보기",
			className: "col-span-3 lg:col-span-1",
			background: (
				<PlaceholderImage
					text="AI 메이크업 합성 예시"
					className="h-full w-full"
				/>
			),
		},
		{
			Icon: StarFilledIcon,
			name: "AI 타투 합성",
			description:
				"타투, 이제 고민 말고 미리 새겨보세요. 리얼한 AI 타투 시뮬레이션.",
			href: "#",
			cta: "자세히 보기",
			className: "col-span-3 lg:col-span-1",
			background: (
				<PlaceholderImage text="AI 타투 합성 예시" className="h-full w-full" />
			),
		},
		{
			Icon: LucidePlusIcon,
			name: "커스텀 스타일링",
			description:
				"원하는 스타일 사진만 있다면 OK! 세상에 없던 나만의 스타일을 창조하세요.",
			href: "#",
			cta: "자세히 보기",
			className: "col-span-3 lg:col-span-2",
			background: <Meteors number={70} />,
		},
	];

	return (
		<div className="flex min-h-screen flex-col bg-rebe-white font-sans text-rebe-text antialiased selection:bg-rebe-accent selection:text-white">
			<FlickeringGrid
				className="fixed inset-0 -z-20"
				color="rgba(220, 215, 255, 0.07)"
			/>
			<Particles
				className="fixed inset-0 -z-10"
				quantity={80}
				ease={70}
				color="#E4E0FF"
				vy={0.03}
				vx={0.03}
				size={0.25}
			/>

			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b border-rebe-accent-70/50 bg-rebe-white/90 backdrop-blur-lg">
				<div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
					<TextAnimate
						as="h1"
						animation="fadeIn"
						delay={0.1}
						className="text-3xl font-bold tracking-tight text-rebe-text lg:text-4xl"
					>
						REBE
					</TextAnimate>
					<nav className="hidden items-center space-x-8 text-lg md:flex">
						<a
							href="#features"
							className="text-rebe-text/80 hover:text-rebe-accent transition-colors duration-300"
						>
							기능
						</a>
						<a
							href="#b2b"
							className="text-rebe-text/80 hover:text-rebe-accent transition-colors duration-300"
						>
							B2B
						</a>
						<a
							href="#testimonials"
							className="text-rebe-text/80 hover:text-rebe-accent transition-colors duration-300"
						>
							사용자 후기
						</a>
						<a
							href="#investment"
							className="text-rebe-text/80 hover:text-rebe-accent transition-colors duration-300"
						>
							투자 유치
						</a>
					</nav>
					<ShinyButton className="border-rebe-accent bg-rebe-accent text-rebe-text hover:shadow-rebe-accent/40">
						<DownloadIcon className="mr-2 size-5" />앱 다운로드
					</ShinyButton>
				</div>
			</header>

			{/* Hero Section */}
			<section
				ref={heroRef}
				className="relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden py-24 text-center lg:py-32"
			>
				<div className="container relative z-10 px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h2"
							animation="blurInUp"
							by="word"
							duration={0.8}
							className="mb-6 text-5xl font-extrabold leading-tight tracking-tighter text-rebe-text md:text-6xl lg:text-7xl xl:text-8xl"
						>
							세계 최초 AI 뷰티 합성 플랫폼, REBE
						</TextAnimate>
					</BlurFade>
					<BlurFade delay={0.4} inView>
						<TextAnimate
							as="p"
							animation="fadeIn"
							by="line"
							duration={0.6}
							delay={0.2}
							className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-rebe-text/70 md:text-xl lg:text-2xl"
						>
							당신의 이미지와 원하는 스타일을 결합하여 완벽한 뷰티 합성을
							경험하세요. REBE는 상상하는 모든 스타일을 가장 현실적으로
							구현합니다.
						</TextAnimate>
					</BlurFade>
					<BlurFade delay={0.6} inView>
						<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
							<RippleButton className="w-full rounded-full border-2 border-rebe-accent bg-rebe-accent px-8 py-4 text-lg font-semibold text-rebe-text shadow-lg transition-all hover:bg-rebe-accent/90 hover:shadow-rebe-accent/50 sm:w-auto">
								<img
									src="/apple_logo.svg"
									alt="App Store"
									className="mr-3 size-7"
								/>{" "}
								App Store
							</RippleButton>
							<RippleButton className="w-full rounded-full border-2 border-rebe-accent bg-rebe-accent px-8 py-4 text-lg font-semibold text-rebe-text shadow-lg transition-all hover:bg-rebe-accent/90 hover:shadow-rebe-accent/50 sm:w-auto">
								<img
									src="/google_play_logo.svg"
									alt="Google Play"
									className="mr-3 size-7"
								/>{" "}
								Google Play
							</RippleButton>
						</div>
					</BlurFade>
				</div>
				<div
					ref={userPersonaInternalRef}
					className="absolute left-[30%] top-[20%] opacity-0"
				></div>
				<div
					ref={aiPlatformInternalRef}
					className="absolute right-[30%] top-[70%] opacity-0"
				></div>
				<AnimatedBeam
					containerRef={heroRef}
					fromRef={userPersonaInternalRef}
					toRef={aiPlatformInternalRef}
					curvature={60}
					duration={6}
					delay={1}
					pathColor="#DCD7FF40"
					gradientStartColor="#E4E0FF"
					gradientStopColor="#494791"
					pathWidth={3}
				/>
				<Meteors number={40} />
			</section>

			{/* Problem & Solution Section */}
			<section
				ref={problemSolutionRef}
				className="bg-rebe-gradient-middle/30 py-24 lg:py-32"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-16 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							뷰티 앱의 <span className="text-rebe-accent">새로운 기준</span>,
							REBE가 만듭니다
						</TextAnimate>
					</BlurFade>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{[
							{
								IconEl: LockClosedIcon,
								title: "프리셋의 한계를 넘어서",
								description:
									"정해진 스타일만 반복하던 기존 앱과 달리, REBE는 사용자가 원하는 어떤 이미지든 자유롭게 조합하여 세상에 없던 스타일을 창조합니다.",
							},
							{
								IconEl: CheckIcon,
								title: "시뮬레이션 수준의 퀄리티",
								description:
									"단순 합성을 넘어, 실제 시술/스타일링과 유사한 초고화질 결과물을 제공합니다. 어색함 없이 완벽하게 어울리는 모습을 확인하세요.",
							},
							{
								IconEl: CreditCardIcon,
								title: "비용 부담 없는 혁신",
								description:
									"자체 개발 AI 워크플로우로 고품질 합성에 필요한 비용을 획기적으로 절감했습니다. 누구나 부담 없이 최상의 기술을 경험할 수 있습니다.",
							},
						].map((item, index) => (
							<BlurFade delay={0.2 + index * 0.1} key={item.title} inView>
								<MagicCard className="h-full overflow-hidden rounded-2xl border-rebe-accent-70/30 bg-rebe-white/70 shadow-xl hover:shadow-rebe-accent/20">
									<BorderBeam
										colorFrom="#E4E0FF"
										colorTo="#494791"
										duration={8 + index * 2}
										delay={index * 0.5}
									/>
									<div className="flex h-full flex-col p-8">
										<item.IconEl className="mb-5 size-12 text-rebe-accent" />
										<h4 className="mb-4 text-2xl font-semibold text-rebe-text">
											{item.title}
										</h4>
										<p className="flex-grow text-lg leading-relaxed text-rebe-text/70">
											{item.description}
										</p>
									</div>
								</MagicCard>
							</BlurFade>
						))}
					</div>
				</div>
			</section>

			{/* Technology Showcase */}
			<section ref={techShowcaseRef} className="py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-20 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							REBE를 빛내는{" "}
							<span className="bg-gradient-to-r from-rebe-accent to-purple-500 bg-clip-text text-transparent">
								독보적인 AI 기술
							</span>
						</TextAnimate>
					</BlurFade>
					<div className="grid items-center gap-16 md:grid-cols-2">
						<div className="relative flex h-[28rem] items-center justify-center md:h-[32rem] lg:h-[36rem]">
							<IconCloud icons={techIcons} />
						</div>
						<div className="space-y-10">
							{[
								{
									IconEl: CpuIcon,
									title: "AI 멀티모달 기술",
									description:
										"두 개의 이미지를 단순 결합하는 것을 넘어, 각 이미지의 스타일과 특징을 깊이 이해하고 분석하여 조화롭고 창의적인 결과물을 생성합니다.",
								},
								{
									IconEl: CodeIcon,
									title: "자체 AI 합성 워크플로우",
									description:
										"수많은 연구와 테스트를 거쳐 개발된 REBE만의 AI 합성 파이프라인은 고품질 결과물을 빠르고 효율적으로 제공하며, 지속적인 학습을 통해 성능이 향상됩니다.",
								},
								{
									IconEl: RocketIcon,
									title: "완전 자동화 시스템",
									description:
										"복잡한 설정이나 전문 지식 없이도, 사용자는 단 몇 번의 터치만으로 원하는 스타일을 즉시 확인할 수 있는 직관적이고 자동화된 시스템을 구현했습니다.",
								},
							].map((item, index) => (
								<BlurFade delay={0.2 + index * 0.1} key={item.title} inView>
									<div className="flex items-start space-x-6">
										<div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-rebe-accent/80 text-white shadow-md">
											<item.IconEl className="size-7" />
										</div>
										<div>
											<h4 className="text-2xl font-semibold text-rebe-text">
												{item.title}
											</h4>
											<p className="mt-2 text-lg leading-relaxed text-rebe-text/70">
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

			{/* Features Section */}
			<section
				ref={featuresRef}
				className="bg-rebe-gradient-middle/30 py-24 lg:py-32"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-16 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							REBE의 다채로운{" "}
							<span className="text-rebe-accent">핵심 기능</span>
						</TextAnimate>
					</BlurFade>
					<BentoGrid className="auto-rows-auto lg:auto-rows-[24rem] gap-6">
						{featureCards.map((card, index) => (
							<BentoCard
								key={card.name}
								name={card.name}
								className={cn(
									"shadow-lg hover:shadow-rebe-accent/30 transition-shadow duration-300",
									card.className,
								)}
								description={card.description}
								href={card.href}
								cta={card.cta}
								background={card.background}
								Icon={card.Icon}
							/>
						))}
					</BentoGrid>
				</div>
			</section>

			{/* Statistics & Proof Section */}
			<section ref={statsRef} className="py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="fadeIn"
							by="word"
							duration={0.7}
							className="mb-16 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							숫자로 증명하는{" "}
							<span className="text-rebe-accent">REBE의 가치</span>
						</TextAnimate>
					</BlurFade>
					<div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 lg:gap-12">
						{[
							{
								value: 95,
								label: "사용자 만족도",
								unit: "%",
							},
							{
								value: 100,
								label: "무료 크레딧 소진율",
								unit: "%",
							},
							{
								value: 3,
								label: "평균 생성 수",
								unit: "+ 회",
							},
							{
								value: 1200,
								label: "긍정 피드백",
								unit: "+ 건",
							},
						].map((stat, index) => (
							<BlurFade delay={0.2 + index * 0.1} key={stat.label} inView>
								<div className="flex flex-col items-center rounded-2xl bg-rebe-white/60 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-rebe-accent/20">
									<AnimatedCircularProgressBar
										max={100}
										min={0}
										value={stat.value > 100 ? 100 : stat.value}
										gaugePrimaryColor="#494791"
										gaugeSecondaryColor="#E4E0FF"
										className="mb-4"
									/>
									<p className="mt-2 text-lg font-medium text-rebe-text/80">
										{stat.label}
									</p>
									<p className="text-5xl font-bold text-rebe-accent">
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
			<section ref={b2bRef} className="bg-rebe-gradient py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-20 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							모든 비즈니스를 위한{" "}
							<span className="text-rebe-accent">REBE 맞춤 솔루션</span>
						</TextAnimate>
					</BlurFade>
					<div className="grid items-center gap-16 lg:grid-cols-2">
						<div className="relative flex h-[28rem] items-center justify-center md:h-[32rem] lg:h-[36rem]">
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
						<div className="space-y-10">
							{[
								{
									IconEl: Share1Icon,
									title: "미용실/샵: 고객 경험 혁신",
									description:
										"고객에게 시술 결과를 미리 보여주고, 스타일 선택 과정을 즐거운 경험으로 만드세요. 태블릿, 키오스크 등 다양한 디바이스를 완벽 지원합니다.",
								},
								{
									IconEl: RadixLink2Icon,
									title: "플랫폼 통합: 강력한 API",
									description:
										"REBE의 AI 합성 엔진을 기존 서비스에 손쉽게 연동하세요. 개발자 친화적인 API로 새로운 가치를 창출하고 사용자 경험을 극대화할 수 있습니다.",
								},
								{
									IconEl: RadixGlobeIcon,
									title: "글로벌 확장: 무한한 가능성",
									description:
										"뷰티 테크 시장을 선도하는 REBE의 기술력은 국경을 넘어섭니다. iOS, Android 앱 뿐만 아니라 다양한 플랫폼으로 B2B 비즈니스를 확장하세요.",
								},
							].map((item, index) => (
								<BlurFade delay={0.2 + index * 0.1} key={item.title} inView>
									<div className="flex items-start space-x-6">
										<div className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-rebe-accent/80 text-white shadow-md">
											<item.IconEl className="size-7" />
										</div>
										<div>
											<h4 className="text-2xl font-semibold text-rebe-text">
												{item.title}
											</h4>
											<p className="mt-2 text-lg leading-relaxed text-rebe-text/70">
												{item.description}
											</p>
										</div>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
					<BlurFade delay={0.6} inView>
						<div className="mt-20 flex justify-center">
							<Iphone15Pro className="size-12 p-1 text-rebe-text" />
							<Dock
								iconSize={48}
								iconMagnification={72}
								iconDistance={120}
								className="border-rebe-accent-70/50 bg-rebe-white/80"
							>
								<DockIcon></DockIcon>
								<DockIcon>
									<Android className="size-12 p-1 text-rebe-text" />
								</DockIcon>
								<DockIcon>
									<Safari
										className="size-12 p-1 text-rebe-text"
										mode="simple"
									/>
								</DockIcon>
								<DockIcon>
									<LaptopIcon className="size-12 p-1 text-rebe-text" />
								</DockIcon>
								<DockIcon>
									<TabletIcon className="size-12 p-1 text-rebe-text" />
								</DockIcon>
							</Dock>
						</div>
					</BlurFade>
				</div>
			</section>

			{/* Testimonials Section */}
			<section ref={testimonialsRef} className="py-24 lg:py-32">
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.2} inView>
						<TextAnimate
							as="h3"
							animation="slideUp"
							by="word"
							duration={0.7}
							className="mb-16 text-center text-4xl font-bold tracking-tight text-rebe-text md:text-5xl lg:text-6xl"
						>
							REBE를 경험한{" "}
							<span className="text-rebe-accent">생생한 목소리</span>
						</TextAnimate>
					</BlurFade>
					<div className="relative">
						<Marquee pauseOnHover className="[--duration:90s] [--gap:2rem]">
							{[...userReviews, ...b2bPartners].map((review, idx) => (
								<ClientTweetCard
									key={`review-${review.id}-${idx}`}
									id={review.id}
									className="w-96 rounded-2xl border-rebe-accent-70/40 bg-rebe-white/70 shadow-lg"
								/>
							))}
						</Marquee>
						<div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-rebe-white to-transparent"></div>
						<div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-rebe-white to-transparent"></div>
					</div>
					<BlurFade delay={0.4} inView>
						<div className="mt-16 flex justify-center">
							<AvatarCircles
								avatarUrls={[
									{
										imageUrl: "https://avatar.vercel.sh/user1",
										profileUrl: "#",
									},
									{
										imageUrl: "https://avatar.vercel.sh/user2",
										profileUrl: "#",
									},
									{
										imageUrl: "https://avatar.vercel.sh/user3",
										profileUrl: "#",
									},
									{
										imageUrl: "https://avatar.vercel.sh/user4",
										profileUrl: "#",
									},
									{
										imageUrl: "https://avatar.vercel.sh/user5",
										profileUrl: "#",
									},
									{
										imageUrl: "https://avatar.vercel.sh/user6",
										profileUrl: "#",
									},
								]}
								numPeople={1234}
								className="scale-110"
							/>
						</div>
					</BlurFade>
				</div>
			</section>

			{/* Investment Appeal Section */}
			<section
				ref={investmentRef}
				className="bg-rebe-gradient-vertical py-32 text-center lg:py-40"
			>
				<div className="container mx-auto px-4 md:px-8">
					<BlurFade delay={0.25} inView>
						<TextAnimate
							as="h3"
							animation="scaleUp"
							by="word"
							duration={0.8}
							className="mb-8 text-5xl font-extrabold leading-tight tracking-tighter text-rebe-text md:text-6xl lg:text-7xl"
						>
							미래를 여는 AI 뷰티, REBE와 함께 성장하세요
						</TextAnimate>
					</BlurFade>
					<BlurFade delay={0.45} inView>
						<p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-rebe-text/80 md:text-2xl">
							REBE는 AI 뷰티 시장의 새로운 기준을 제시하며 빠르게 성장하고
							있습니다. 검증된 기술력과 시장성, 명확한 확장 계획을 바탕으로
							투자자 여러분께 매력적인 기회를 제공합니다.
						</p>
					</BlurFade>
					<BlurFade delay={0.65} inView>
						<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
							<ShinyButton className="w-full rounded-full border-rebe-accent bg-rebe-accent px-10 py-5 text-xl font-bold text-rebe-text shadow-xl transition-all hover:bg-rebe-accent/90 hover:shadow-rebe-accent/60 sm:w-auto">
								투자 문의하기
								<ArrowRightIcon className="ml-3 size-6" />
							</ShinyButton>
							<RippleButton className="w-full rounded-full border-2 border-rebe-accent px-10 py-5 text-xl font-bold text-rebe-accent shadow-lg transition-all hover:bg-rebe-accent/10 sm:w-auto">
								IR 자료 다운로드
								<DownloadIcon className="ml-3 size-6" />
							</RippleButton>
						</div>
					</BlurFade>
				</div>
			</section>

			{/* Footer */}
			<footer
				ref={footerRef}
				className="border-t border-rebe-accent-70/30 bg-rebe-white/90 py-10 backdrop-blur-sm"
			>
				<div className="container mx-auto flex flex-col items-center justify-between px-4 text-center md:flex-row md:px-8 md:text-left">
					<TextAnimate
						as="p"
						animation="fadeIn"
						delay={0.1}
						className="text-rebe-text/70"
					>
						&copy; {new Date().getFullYear()} REBE Technologies Inc. All rights
						reserved.
					</TextAnimate>
					<div className="mt-6 flex space-x-6 md:mt-0">
						<a
							href="#"
							aria-label="Twitter"
							className="text-rebe-text/70 hover:text-rebe-accent transition-colors duration-300"
						>
							<TwitterLogoIcon className="size-6" />
						</a>
						<a
							href="#"
							aria-label="Instagram"
							className="text-rebe-text/70 hover:text-rebe-accent transition-colors duration-300"
						>
							<InstagramLogoIcon className="size-6" />
						</a>
						<a
							href="#"
							aria-label="LinkedIn"
							className="text-rebe-text/70 hover:text-rebe-accent transition-colors duration-300"
						>
							<LinkedInLogoIcon className="size-6" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "framer-motion";

interface UseStepScrollControlOptions {
	totalSteps: number;
	onStepChange?: (step: number, isComplete: boolean) => void;

	onSectionExit?: (currentStep: number) => void;
	scrollThreshold?: number;
}

export function useStepScrollControl({
	totalSteps,
	onStepChange,
	onSectionExit,
	scrollThreshold = window.innerHeight || 30,
}: UseStepScrollControlOptions) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);

	// 터치 이벤트 처리를 위한 상태
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	const isInView = useInView(sectionRef, {
		// root: sectionRef,
		initial: false,
	});

	// 최소 스와이프 거리 (픽셀)
	const minSwipeDistance = 50;

	// 스크롤 처리 공통 로직
	const handleStepChange = useCallback(
		(direction: "up" | "down") => {
			if (isScrolling) return false;

			setIsScrolling(true);

			if (direction === "down") {
				if (currentStep < totalSteps - 1) {
					// 다음 스텝으로
					const nextStep = currentStep + 1;
					setCurrentStep(nextStep);
					onStepChange?.(nextStep, nextStep === totalSteps - 1);

					setTimeout(() => {
						setIsScrolling(false);
					}, 100);
					return true;
				}

				handleExit();

				setTimeout(() => {
					setIsScrolling(false);
				}, 100);
				return true;
			} else if (direction === "up") {
				if (currentStep === 0) {
					handleExit(0);
					setTimeout(() => {
						setIsScrolling(false);
					}, 100);
					return true;
				} else {
					// 이전 스텝으로
					const prevStep = currentStep - 1;
					setCurrentStep(prevStep);
					onStepChange?.(prevStep, false);

					setTimeout(() => {
						setIsScrolling(false);
					}, 100);
					return true;
				}
			}
			return false;
		},
		[currentStep, totalSteps, onStepChange, onSectionExit, isScrolling],
	);

	// 휠 이벤트 핸들러
	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (!isInView) return;

			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();

			// 스크롤 임계값 확인
			if (Math.abs(e.deltaY) < scrollThreshold) {
				return;
			}

			const direction = e.deltaY > 0 ? "down" : "up";
			const shouldPrevent = handleStepChange(direction);
		},
		[isInView, scrollThreshold, handleStepChange],
	);

	// 터치 시작 핸들러
	const handleTouchStart = useCallback(
		(e: TouchEvent) => {
			if (!isInView) return;
			setTouchEnd(null);
			setTouchStart(e.targetTouches[0].clientY);
		},
		[isInView],
	);

	// 터치 이동 핸들러
	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!isInView) return;
			e.preventDefault();
			setTouchEnd(e.targetTouches[0].clientY);
		},
		[isInView],
	);

	// 터치 종료 핸들러
	const handleTouchEnd = useCallback(
		(e: TouchEvent) => {
			if (!isInView || !touchStart || !touchEnd) return;

			const distance = touchStart - touchEnd;
			const isLeftSwipe = distance > minSwipeDistance;
			const isRightSwipe = distance < -minSwipeDistance;

			if (isLeftSwipe || isRightSwipe) {
				const direction = isLeftSwipe ? "down" : "up";
				const shouldPrevent = handleStepChange(direction);

				if (shouldPrevent) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		},
		[isInView, touchStart, touchEnd, minSwipeDistance, handleStepChange],
	);

	// 키보드 이벤트 핸들러
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isInView) return;

			let direction: "up" | "down" | null = null;

			switch (e.key) {
				case "ArrowDown":
				case "PageDown":
				case " ": // 스페이스바
					direction = "down";
					break;
				case "ArrowUp":
				case "PageUp":
					direction = "up";
					break;
				default:
					return;
			}

			const shouldPrevent = handleStepChange(direction);

			if (shouldPrevent) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		[isInView, handleStepChange],
	);

	// 일반 스크롤 차단 (섹션 활성화 시에만)
	const blockScroll = useCallback((e: Event) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleExit = useCallback(
		(step?: number) => {
			console.log("handleExit", step || currentStep);
			onSectionExit?.(step || currentStep);

			const section = sectionRef?.current;
			if (!section) return;

			section.removeEventListener("wheel", handleWheel, true);
			section.removeEventListener("touchstart", handleTouchStart, true);
			section.removeEventListener("touchmove", handleTouchMove, true);
			section.removeEventListener("touchend", handleTouchEnd, true);
			section.removeEventListener("keydown", handleKeyDown, true);
			section.removeEventListener("scroll", blockScroll, true);
			document.body.style.overflow = "";

			console.log("reset scroll");
		},
		[
			sectionRef.current,
			currentStep,
			onSectionExit,
			handleWheel,
			handleTouchStart,
			handleTouchMove,
			handleTouchEnd,
			handleKeyDown,
			blockScroll,
		],
	);

	// 이벤트 리스너 등록
	useEffect(() => {
		const section = sectionRef?.current;
		if (!section) return;

		if (isInView) {
			// 휠 이벤트 (마우스 휠, 트랙패드)
			section.addEventListener("wheel", handleWheel, {
				passive: false,
				capture: true,
			});

			// 터치 이벤트 (모바일)
			section.addEventListener("touchstart", handleTouchStart, {
				passive: false,
				capture: true,
			});
			section.addEventListener("touchmove", handleTouchMove, {
				passive: false,
				capture: true,
			});
			section.addEventListener("touchend", handleTouchEnd, {
				passive: false,
				capture: true,
			});

			// 키보드 이벤트
			section.addEventListener("keydown", handleKeyDown, {
				passive: false,
				capture: true,
			});

			// 일반 스크롤 차단 (wheel 이벤트 외)
			section.addEventListener("scroll", blockScroll, {
				passive: false,
				capture: true,
			});

			document.body.style.overflow = "hidden";
		} else {
			// 이벤트 리스너 제거
			section.removeEventListener("wheel", handleWheel, true);
			section.removeEventListener("touchstart", handleTouchStart, true);
			section.removeEventListener("touchmove", handleTouchMove, true);
			section.removeEventListener("touchend", handleTouchEnd, true);
			section.removeEventListener("keydown", handleKeyDown, true);
			section.removeEventListener("scroll", blockScroll, true);

			// body 스크롤 복원

			document.body.style.overflow = "";
		}

		return () => {
			section.removeEventListener("wheel", handleWheel, true);
			section.removeEventListener("touchstart", handleTouchStart, true);
			section.removeEventListener("touchmove", handleTouchMove, true);
			section.removeEventListener("touchend", handleTouchEnd, true);
			section.removeEventListener("keydown", handleKeyDown, true);
			section.removeEventListener("scroll", blockScroll, true);
			document.body.style.overflow = "";
		};
	}, [
		isInView,
		handleWheel,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleKeyDown,
		blockScroll,
	]);

	return {
		sectionRef,
		currentStep,
		isInView,

		isScrolling,
	};
}

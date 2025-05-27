import { useCallback, useEffect, useRef, useState } from "react";

interface UseFullPageScrollOptions {
	onPageChange?: (page: number) => void;
	onLoad?: (limit: number) => void;
	scrollDelay?: number;
	enabledSections?: number[];
	disableScroll?: boolean;
}

export function useFullPageScroll({
	onPageChange = () => {},
	onLoad = () => {},
	scrollDelay = 500,
	enabledSections = [],
	disableScroll = false,
}: UseFullPageScrollOptions = {}) {
	const outerDivRef = useRef<HTMLDivElement>(null);
	const currentPage = useRef<number>(0);
	const canScroll = useRef<boolean>(true);
	const oldTouchY = useRef<number>(0);
	const [, refresh] = useState<number>(0);

	const scrollDown = useCallback(() => {
		const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
		if (outerDivRef.current && pageHeight) {
			const nextPage = currentPage.current + 1;
			const maxPage = outerDivRef.current.childElementCount - 1;

			if (nextPage <= maxPage) {
				outerDivRef.current.scrollTo({
					top: pageHeight * nextPage,
					left: 0,
					behavior: "smooth",
				});

				canScroll.current = false;
				setTimeout(() => {
					canScroll.current = true;
				}, scrollDelay);

				currentPage.current = nextPage;
			}
		}

		onPageChange(currentPage.current);
		refresh((v) => v + 1);
	}, [onPageChange, scrollDelay]);

	const scrollUp = useCallback(() => {
		const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
		if (outerDivRef.current && pageHeight) {
			const prevPage = currentPage.current - 1;

			if (prevPage >= 0) {
				outerDivRef.current.scrollTo({
					top: pageHeight * prevPage,
					left: 0,
					behavior: "smooth",
				});

				canScroll.current = false;
				setTimeout(() => {
					canScroll.current = true;
				}, scrollDelay);

				currentPage.current = prevPage;
			}
		}

		onPageChange(currentPage.current);
		refresh((v) => v + 1);
	}, [onPageChange, scrollDelay]);

	const wheelHandler = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();

			if (!canScroll.current) return;

			// 활성화된 섹션에서만 스크롤 허용
			if (
				enabledSections.length > 0 &&
				!enabledSections.includes(currentPage.current)
			) {
				return;
			}

			const { deltaY } = e;

			if (deltaY > 0) {
				// 스크롤 다운
				scrollDown();
			} else {
				// 스크롤 업
				scrollUp();
			}
		},
		[scrollDown, scrollUp, enabledSections],
	);

	const scrollHandler = useCallback((e: Event) => {
		e.preventDefault();
	}, []);

	const onTouchDown = useCallback((e: TouchEvent) => {
		oldTouchY.current = e.touches[0].clientY;
	}, []);

	const onTouchUp = useCallback(
		(e: TouchEvent) => {
			if (!canScroll.current) return;

			// 활성화된 섹션에서만 터치 스크롤 허용
			if (
				enabledSections.length > 0 &&
				!enabledSections.includes(currentPage.current)
			) {
				return;
			}

			const newTouchY = e.changedTouches[0].clientY;
			const touchDiff = oldTouchY.current - newTouchY;

			if (Math.abs(touchDiff) > 50) {
				if (touchDiff > 0) {
					// 위로 스와이프 = 스크롤 다운
					scrollDown();
				} else {
					// 아래로 스와이프 = 스크롤 업
					scrollUp();
				}
			}
		},
		[scrollDown, scrollUp, enabledSections],
	);

	const movePageTo = useCallback(
		(index: number) => {
			if (!outerDivRef.current || !canScroll.current) return;

			const pageHeight = outerDivRef.current.children.item(0)?.clientHeight;
			const maxPage = outerDivRef.current.childElementCount - 1;

			if (pageHeight && index >= 0 && index <= maxPage) {
				outerDivRef.current.scrollTo({
					top: pageHeight * index,
					left: 0,
					behavior: "smooth",
				});

				canScroll.current = false;
				setTimeout(() => {
					canScroll.current = true;
				}, scrollDelay);

				currentPage.current = index;
				onPageChange(currentPage.current);
				refresh((v) => v + 1);
			}
		},
		[onPageChange, scrollDelay],
	);

	useEffect(() => {
		const outerDiv = outerDivRef.current;
		if (!outerDiv) return;

		// 초기 로드 시 섹션 개수 전달
		const sectionCount = outerDiv.childElementCount;
		onLoad(sectionCount);

		// 이벤트 리스너 등록

		if (disableScroll) {
			return;
		}

		outerDiv.addEventListener("wheel", wheelHandler, { passive: false });
		outerDiv.addEventListener("scroll", scrollHandler, { passive: false });
		outerDiv.addEventListener("touchstart", onTouchDown, { passive: false });
		outerDiv.addEventListener("touchend", onTouchUp, { passive: false });

		return () => {
			outerDiv.removeEventListener("wheel", wheelHandler);
			outerDiv.removeEventListener("scroll", scrollHandler);
			outerDiv.removeEventListener("touchstart", onTouchDown);
			outerDiv.removeEventListener("touchend", onTouchUp);
		};
	}, [
		wheelHandler,
		scrollHandler,
		onTouchDown,
		onTouchUp,
		onLoad,
		disableScroll,
	]);

	useEffect(() => {
		const outerDiv = outerDivRef.current;
		if (!outerDiv) return;

		if (disableScroll) {
			outerDiv.removeEventListener("wheel", wheelHandler);
			outerDiv.removeEventListener("scroll", scrollHandler);
			outerDiv.removeEventListener("touchstart", onTouchDown);
			outerDiv.removeEventListener("touchend", onTouchUp);
		} else {
			outerDiv.addEventListener("wheel", wheelHandler, { passive: false });
			outerDiv.addEventListener("scroll", scrollHandler, { passive: false });
			outerDiv.addEventListener("touchstart", onTouchDown, { passive: false });
			outerDiv.addEventListener("touchend", onTouchUp, { passive: false });
		}
	}, [disableScroll, wheelHandler, scrollHandler, onTouchDown, onTouchUp]);

	return {
		outerDivRef,
		currentPage: currentPage.current,
		canScroll: canScroll.current,
		scrollDown,
		scrollUp,
		movePageTo,
		refresh,
	};
}

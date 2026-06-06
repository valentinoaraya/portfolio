import { useEffect, useRef, useState } from "react";
import { useLenisRef } from "./useLenis";
import { drawCoverFrame, resizeCanvas } from "../lib/drawFrame";
import {
	frameUrls,
	getHeroScrollMetrics,
	HERO_SCROLL_INTRO_VH,
	SCROLL_DISTANCE,
} from "../lib/frames";

export function useHeroScroll(
	containerRef: React.RefObject<HTMLElement | null>,
) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const videoZoneRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const currentFrameRef = useRef(0);
	const expandProgressRef = useRef(0);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		let cancelled = false;
		const images = frameUrls.map(() => new Image());
		let loadedCount = 0;

		frameUrls.forEach((url, index) => {
			const image = images[index];
			image.decoding = "async";
			image.src = url;
			image.onload = () => {
				loadedCount += 1;
				if (!cancelled && loadedCount === frameUrls.length) {
					imagesRef.current = images;
					setIsReady(true);
				}
			};
		});

		return () => {
			cancelled = true;
		};
	}, []);

	const lenisRef = useLenisRef();

	useEffect(() => {
		if (!isReady) return;

		const container = containerRef.current;
		const canvas = canvasRef.current;
		const content = contentRef.current;
		const videoZone = videoZoneRef.current;
		if (!container || !canvas || !content || !videoZone) return;

		let cancelled = false;
		let retryRaf = 0;
		let unsubscribeScroll: (() => void) | undefined;

		const renderFrame = (frameIndex: number) => {
			const image = imagesRef.current[frameIndex];
			if (!image?.complete) return;

			const expand = expandProgressRef.current;
			const align = expand > 0.75 ? "center" : "bottom";
			drawCoverFrame(canvas, image, align);
		};

		const syncCanvasSize = () => {
			resizeCanvas(canvas);
			renderFrame(currentFrameRef.current);
		};

		const updateFromScroll = () => {
			const scrollable = container.offsetHeight - window.innerHeight;
			const scrolled = Math.max(
				0,
				-container.getBoundingClientRect().top,
			);
			const { contentFadeProgress, expandProgress, scrubStart } =
				getHeroScrollMetrics(scrolled);

			expandProgressRef.current = expandProgress;

			const textOpacity = 1 - contentFadeProgress;
			const liftPx = contentFadeProgress * 80;
			content.style.opacity = String(textOpacity);
			content.style.transform = `translateY(${-liftPx}px)`;
			content.style.pointerEvents = textOpacity < 0.15 ? "none" : "auto";

			const videoOffset = (1 - expandProgress) * 50;
			videoZone.style.transform = `translateY(${videoOffset}%)`;

			const frameScrollable = scrollable - scrubStart;
			let frameIndex = 0;

			if (frameScrollable > 0 && scrolled >= scrubStart) {
				const progress = Math.min(
					1,
					(scrolled - scrubStart) / frameScrollable,
				);
				frameIndex = Math.round(progress * (frameUrls.length - 1));
			}

			if (frameIndex !== currentFrameRef.current) {
				currentFrameRef.current = frameIndex;
				renderFrame(frameIndex);
			} else if (expandProgress > 0 && expandProgress < 1) {
				renderFrame(currentFrameRef.current);
			}
		};

		const onResize = () => {
			lenisRef.current?.resize();
			syncCanvasSize();
			updateFromScroll();
		};

		const attachLenis = () => {
			if (cancelled) return;

			const lenis = lenisRef.current;
			if (!lenis) {
				retryRaf = requestAnimationFrame(attachLenis);
				return;
			}

			syncCanvasSize();
			updateFromScroll();
			unsubscribeScroll = lenis.on("scroll", updateFromScroll);
		};

		attachLenis();
		window.addEventListener("resize", onResize);

		return () => {
			cancelled = true;
			cancelAnimationFrame(retryRaf);
			unsubscribeScroll?.();
			window.removeEventListener("resize", onResize);
		};
	}, [containerRef, isReady, lenisRef]);

	return {
		canvasRef,
		contentRef,
		videoZoneRef,
		isReady,
		heroHeight: `calc(${HERO_SCROLL_INTRO_VH}vh + ${SCROLL_DISTANCE}px)`,
	};
}

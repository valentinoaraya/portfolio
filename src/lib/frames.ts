const frameModules = import.meta.glob<string>(
	"../assets/frames/ezgif-frame-*.jpg",
	{ eager: true, query: "?url", import: "default" },
);

function frameNumber(path: string): number {
	const match = path.match(/ezgif-frame-(\d+)\.jpg$/);
	return match ? parseInt(match[1], 10) : 0;
}

export const frameUrls = Object.entries(frameModules)
	.sort(([a], [b]) => frameNumber(a) - frameNumber(b))
	.map(([, url]) => url);

export const FRAME_COUNT = frameUrls.length;

export const SCROLL_PIXELS_PER_FRAME = 10;

export const SCROLL_DISTANCE = (FRAME_COUNT - 1) * SCROLL_PIXELS_PER_FRAME;

/** Scroll en el que el texto empieza a salir y el video empieza a expandirse */
export const TEXT_ANIMATION_START_VH = 4;

/** Scroll en el que el texto desaparece, el video queda centrado y empieza el scrub */
export const TEXT_ANIMATION_END_VH = 40;

export const HERO_SCROLL_INTRO_VH = TEXT_ANIMATION_END_VH;

function vhToPx(vh: number) {
	return window.innerHeight * (vh / 100);
}

export function clamp(value: number, min = 0, max = 1) {
	return Math.min(max, Math.max(min, value));
}

export function getHeroScrollMetrics(scrolled: number) {
	const textStart = vhToPx(TEXT_ANIMATION_START_VH);
	const textEnd = vhToPx(TEXT_ANIMATION_END_VH);

	const textProgress = clamp((scrolled - textStart) / (textEnd - textStart));
	const expandProgress = textProgress;

	return { textProgress, expandProgress, scrubStart: textEnd };
}

import { useRef } from "react";
import { Globe } from "lucide-react";
import { useHeroScroll } from "./hooks/useHeroScroll";

function InstagramIcon({ size = 20 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

function TwitterIcon({ size = 20 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}

export default function Index() {
	const containerRef = useRef<HTMLElement>(null);
	const { canvasRef, contentRef, videoZoneRef, isReady, heroHeight } =
		useHeroScroll(containerRef);

	return (
		<section
			ref={containerRef}
			className="relative bg-light"
			style={{ height: heroHeight }}
		>
			<div className="sticky top-0 h-screen overflow-hidden bg-light">
				<div
					ref={videoZoneRef}
					className="absolute inset-0 z-0 will-change-transform"
					style={{ transform: "translateY(50%)" }}
				>
					<canvas
						ref={canvasRef}
						className={`h-full w-full ${isReady ? "opacity-100" : "opacity-0"}`}
						aria-hidden="true"
					/>
				</div>

				<div
					ref={contentRef}
					className="relative z-10 flex h-full flex-col will-change-[opacity,transform]"
				>
					<nav className="shrink-0 px-6 py-6">
						<div className="liquid-glass-light mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
							<div className="flex items-center">
								<Globe size={24} className="text-violet" />
								<span className="ml-2 text-lg font-semibold text-dark">
									Asme
								</span>
								<div className="ml-8 hidden items-center gap-8 md:flex">
									{["Features", "Pricing", "About"].map(
										(link) => (
											<a
												key={link}
												href="#"
												className="text-sm font-medium text-dark/65 transition-colors hover:text-violet"
											>
												{link}
											</a>
										),
									)}
								</div>
							</div>
							<div className="flex items-center gap-4">
								<button
									type="button"
									className="text-sm font-medium text-dark transition-colors hover:text-blue-2"
								>
									Sign Up
								</button>
								<button
									type="button"
									className="liquid-glass-light rounded-full px-6 py-2 text-sm font-medium text-dark transition-colors hover:text-violet"
								>
									Login
								</button>
							</div>
						</div>
					</nav>

					<div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-6 pt-2 text-center md:max-h-[50vh]">
						<h1 className="whitespace-nowrap text-6xl tracking-tight text-dark sm:text-7xl md:text-8xl lg:text-9xl">
							Valentino Araya
							{/* <em className="text-gradient-accent italic">all</em> */}
						</h1>
						<h2
							className="text-6xl text-violet mt-6 italic"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							Desarrollador Full Stack
						</h2>

						<p className="mt-5 max-w-3xl px-4 text-2xl leading-relaxed text-dark/70 md:mt-6">
							Enfocado en crear productos de software completos
							con{" "}
							<span className="text-blue-2 font-bold">React</span>{" "}
							y{" "}
							<span className="text-blue-2 font-bold">
								Node.js
							</span>{" "}
							y{" "}
							<span className="text-blue-2 font-bold">
								TypeScript
							</span>
						</p>
					</div>

					<div className="relative z-10 flex shrink-0 justify-center gap-4 pb-6">
						{[
							{ Icon: InstagramIcon, label: "Instagram" },
							{ Icon: TwitterIcon, label: "Twitter" },
							{ Icon: Globe, label: "Website" },
						].map(({ Icon, label }) => (
							<button
								key={label}
								type="button"
								aria-label={label}
								className="liquid-glass-light rounded-full p-4 text-dark/65 transition-all hover:text-violet"
							>
								<Icon size={20} />
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

import { useRef } from "react";
import { Globe } from "lucide-react";
import { CV_GOOGLE_DRIVE_URL } from "./constants/links";
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

function LinkedinIcon({ size = 20 }: { size?: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="currentColor"
			className="bi bi-linkedin"
			viewBox="0 0 16 16"
		>
			<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
		</svg>
	);
}

function MailIcon({ size = 20 }: { size?: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="currentColor"
			className="bi bi-envelope"
			viewBox="0 0 16 16"
		>
			<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
		</svg>
	);
}

const navLinks = [
	{ label: "Proyectos", href: "#proyectos" },
	{ label: "Sobre mí", href: "#sobre-mi" },
	{ label: "Contacto", href: "#contacto" },
];

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
								<span className="ml-2 text-lg font-semibold text-violet">
									VA
								</span>
							</div>
							<div className="flex items-center gap-4">
								<div className="ml-8 hidden items-center gap-8 min-[480px]:flex">
									{navLinks.map(({ label, href }) => (
										<a
											key={label}
											href={href}
											className="text-sm font-medium text-dark/65 transition-colors hover:text-violet"
										>
											{label}
										</a>
									))}
								</div>
							</div>
						</div>
					</nav>

					<div className="flex min-h-0 flex-1 max-h-[50vh] shrink-0 flex-col items-center justify-center px-6 pb-6 pt-2 text-center">
						<h1 className="text-4xl tracking-tight text-dark min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
							Valentino Araya
						</h1>
						<h2
							className="mt-4 text-3xl text-violet italic min-[480px]:mt-5 min-[480px]:text-4xl sm:mt-6 sm:text-5xl md:text-6xl"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							Desarrollador Full Stack
						</h2>

						<p className="mt-4 max-w-3xl px-4 text-base leading-relaxed text-dark/70 min-[480px]:mt-5 min-[480px]:text-lg sm:mt-6 sm:text-xl md:text-2xl">
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

						<a
							href={CV_GOOGLE_DRIVE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="liquid-glass-light mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-dark/80 transition-colors hover:text-violet sm:mt-8"
						>
							<Globe className="text-violet mr-2" size={20} />
							Ver CV
						</a>
					</div>

					<div className="relative z-10 flex shrink-0 justify-center gap-4 pb-6">
						{[
							{ Icon: InstagramIcon, label: "Instagram" },
							{ Icon: LinkedinIcon, label: "LinkedIn" },
							{ Icon: MailIcon, label: "Mail" },
						].map(({ Icon, label }) => (
							<button
								key={label}
								type="button"
								aria-label={label}
								onClick={() => {
									if (label === "Mail") {
										window.open(
											"mailto:valentinoaraya04@gmail.com",
											"_blank",
											"noopener,noreferrer",
										);
									} else if (label === "LinkedIn") {
										window.open(
											"https://www.linkedin.com/in/valentinoaraya/",
											"_blank",
											"noopener,noreferrer",
										);
									} else if (label === "Instagram") {
										window.open(
											"https://www.instagram.com/tinoaraya/",
											"_blank",
											"noopener,noreferrer",
										);
									}
								}}
								className="rounded-full p-2 text-dark/65 transition-all hover:text-violet cursor-pointer"
							>
								<Icon size={24} />
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLenisRef } from "../hooks/useLenis";

export type CaseStudy = {
	projectTitle: string;
	type: string;
	accent: "violet" | "blue-2" | "cyan";
	context: string;
	problem: string;
	solution: string;
	architecture: string[];
	technicalChallenges: {
		title: string;
		problem: string;
		solution: string;
	}[];
	results: string[];
	technologies: string[];
};

const accentMap = {
	violet: {
		badge: "border-violet/30 bg-violet/10 text-violet",
		dot: "#7209b7",
		text: "text-violet",
		bar: "bg-violet/40",
	},
	"blue-2": {
		badge: "border-blue-2/30 bg-blue-2/10 text-blue-2",
		dot: "#4895ef",
		text: "text-blue-2",
		bar: "bg-blue-2/40",
	},
	cyan: {
		badge: "border-cyan/30 bg-cyan/10 text-cyan",
		dot: "#4cc9f0",
		text: "text-cyan",
		bar: "bg-cyan/40",
	},
};

function Section({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-light/35 min-[640px]:mb-3">
				{label}
			</p>
			{children}
		</div>
	);
}

export function CaseStudyModal({
	caseStudy,
	onClose,
}: {
	caseStudy: CaseStudy | null;
	onClose: () => void;
}) {
	const lenisRef = useLenisRef();

	useEffect(() => {
		if (!caseStudy) return;

		const lenis = lenisRef.current;
		const prevOverflow = document.body.style.overflow;

		document.body.style.overflow = "hidden";
		lenis?.stop();

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);

		return () => {
			document.body.style.overflow = prevOverflow;
			lenis?.start();
			document.removeEventListener("keydown", handleKey);
		};
	}, [caseStudy, onClose, lenisRef]);

	return createPortal(
		<AnimatePresence>
			{caseStudy && (() => {
				const accent = accentMap[caseStudy.accent];
				return (
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/85 p-3 backdrop-blur-md min-[640px]:p-6"
						data-lenis-prevent
						onClick={onClose}
					>
						<motion.div
							key="panel"
							initial={{ opacity: 0, y: 32, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 24, scale: 0.98 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
							className="relative flex h-[90svh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.25rem] bg-[#131313] min-[640px]:h-[88svh] min-[640px]:rounded-[2rem]"
							onClick={(e) => e.stopPropagation()}
						>
							<div className={`h-1 w-full shrink-0 ${accent.bar}`} />

							<button
								type="button"
								onClick={onClose}
								aria-label="Cerrar"
								className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-light/10 text-light/50 transition hover:bg-light/20 hover:text-light min-[640px]:right-4 min-[640px]:top-4"
							>
								<X size={16} />
							</button>

							<div
								data-lenis-prevent
								className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-color:rgba(241,241,241,0.15)_transparent] [scrollbar-width:thin] min-[640px]:px-6 min-[640px]:py-7 sm:px-8 sm:py-8"
							>
								<span
									className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${accent.badge}`}
								>
									{caseStudy.type} · Case Study
								</span>
								<h2 className="mt-3 text-xl font-semibold tracking-tight text-light min-[640px]:text-2xl sm:text-3xl">
									{caseStudy.projectTitle}
								</h2>

								<div className="mt-6 space-y-6 min-[640px]:mt-8 min-[640px]:space-y-8">
									<Section label="Contexto">
										<p className="text-sm leading-relaxed text-light/60 min-[640px]:text-[15px]">
											{caseStudy.context}
										</p>
									</Section>

									<Section label="Problema">
										<p className="text-sm leading-relaxed text-light/60 min-[640px]:text-[15px]">
											{caseStudy.problem}
										</p>
									</Section>

									<Section label="Solución implementada">
										<p className="text-sm leading-relaxed text-light/60 min-[640px]:text-[15px]">
											{caseStudy.solution}
										</p>
									</Section>

									<Section label="Arquitectura">
										<div className="flex flex-wrap items-center gap-1.5 min-[640px]:gap-2">
											{caseStudy.architecture.map(
												(layer, i) => (
													<div
														key={layer}
														className="flex items-center gap-1.5 min-[640px]:gap-2"
													>
														<span className="rounded-lg bg-light/6 px-2.5 py-1 text-xs font-medium text-light/75 min-[640px]:px-3 min-[640px]:py-1.5 min-[640px]:text-sm">
															{layer}
														</span>
														{i <
															caseStudy
																.architecture
																.length -
																1 && (
															<span
																className={`text-xs min-[640px]:text-sm ${accent.text}`}
															>
																→
															</span>
														)}
													</div>
												),
											)}
										</div>
									</Section>

									<Section label="Retos técnicos">
										<div className="space-y-2.5 min-[640px]:space-y-3">
											{caseStudy.technicalChallenges.map(
												(ch) => (
													<div
														key={ch.title}
														className="rounded-2xl border border-light/8 bg-light/[0.03] p-3 min-[640px]:p-4"
													>
														<p
															className={`text-sm font-semibold ${accent.text}`}
														>
															{ch.title}
														</p>
														<p className="mt-1 text-xs text-light/40">
															{ch.problem}
														</p>
														<p className="mt-2 text-sm leading-relaxed text-light/65">
															{ch.solution}
														</p>
													</div>
												),
											)}
										</div>
									</Section>

									<Section label="Resultados y logros">
										<ul className="space-y-2 min-[640px]:space-y-2.5">
											{caseStudy.results.map((r) => (
												<li
													key={r}
													className="flex items-start gap-2.5 text-sm leading-relaxed text-light/60 min-[640px]:gap-3"
												>
													<span
														className="mt-1.5 size-1.5 shrink-0 rounded-full"
														style={{
															backgroundColor:
																accent.dot,
														}}
													/>
													{r}
												</li>
											))}
										</ul>
									</Section>

									<Section label="Tecnologías">
										<div className="flex flex-wrap gap-1.5 min-[640px]:gap-2">
											{caseStudy.technologies.map(
												(tech) => (
													<span
														key={tech}
														className="rounded-full border border-light/10 bg-light/5 px-2.5 py-1 text-xs font-medium text-light/65 min-[640px]:px-3"
													>
														{tech}
													</span>
												),
											)}
										</div>
									</Section>
								</div>
							</div>
						</motion.div>
					</motion.div>
				);
			})()}
		</AnimatePresence>,
		document.body,
	);
}

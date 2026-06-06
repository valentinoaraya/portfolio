import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, Rocket } from "lucide-react";

const sectors = ["Deportes", "Turnos & reservas", "Logística industrial"];

const stack = [
	"TypeScript",
	"React",
	"Node.js",
	"Express",
	"MySQL",
	"MongoDB",
	"Supabase",
	"Docker",
	"FFmpeg",
	"BullMQ",
	"Socket.io",
	"Mercado Pago",
	"PWA",
	"Vite",
	"Tailwind",
];

export default function StatsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const reveal = (delay: number) => ({
		initial: { opacity: 0, y: 24 },
		animate: isInView ? { opacity: 1, y: 0 } : {},
		transition: { duration: 0.6, delay },
	});

	return (
		<section
			id="stats"
			ref={ref}
			className="sticky top-0 z-10 flex h-svh max-h-svh flex-col justify-center overflow-hidden bg-dark px-3 py-4 sm:px-6 sm:py-6 md:px-6 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(76,201,240,0.1),_transparent_45%)]" />

			<div className="relative mx-auto w-full max-w-6xl min-w-0">
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-[11px] uppercase tracking-widest text-blue-2/70 sm:text-sm"
				>
					En números
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mt-2 max-w-4xl text-2xl tracking-tight text-light sm:mt-3 sm:text-3xl md:mt-5 md:text-6xl"
				>
					Lo que dice{" "}
					<span
						className="italic text-gradient-accent"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						mi trabajo
					</span>
				</motion.h2>

				<div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-2.5 md:mt-12 md:grid-cols-6 md:gap-4">
					<motion.div
						{...reveal(0.15)}
						className="liquid-glass flex flex-col items-center justify-center rounded-2xl p-2.5 text-center sm:rounded-3xl sm:p-4 md:col-span-2 md:min-h-[280px] md:p-8"
					>
						<p className="text-2xl font-semibold leading-none tracking-tight text-gradient-accent sm:text-4xl md:text-7xl">
							100%
						</p>
						<p className="mt-1.5 text-[11px] font-semibold leading-tight text-light sm:mt-2 sm:text-sm md:mt-4 md:text-xl">
							Proyectos entregados
						</p>
						<p className="mt-0.5 hidden text-[10px] leading-tight text-light/50 sm:block sm:text-xs">
							y seguimos construyendo
						</p>
					</motion.div>

					<motion.div
						{...reveal(0.25)}
						className="liquid-glass flex flex-col items-center justify-center rounded-2xl p-2.5 text-center sm:rounded-3xl sm:p-4 md:col-span-2 md:min-h-[280px] md:p-8"
					>
						<p className="text-2xl font-semibold leading-none tracking-tight text-light sm:text-4xl md:text-6xl">
							4+
						</p>
						<p className="mt-1.5 text-[11px] font-semibold leading-tight text-light sm:mt-2 sm:text-sm md:text-lg">
							Años programando
						</p>
						<p className="mt-0.5 hidden text-[10px] leading-tight text-light/50 sm:block sm:text-xs">
							Desde la secundaria hasta hoy
						</p>
					</motion.div>

					<motion.div
						{...reveal(0.35)}
						className="liquid-glass flex flex-col items-center justify-center rounded-2xl p-2.5 text-center sm:rounded-3xl sm:p-4 md:col-span-2 md:min-h-[280px] md:p-8"
					>
						<p className="text-2xl font-semibold leading-none tracking-tight text-light sm:text-4xl md:text-6xl">
							75+
						</p>
						<p className="mt-1.5 text-[11px] font-semibold leading-tight text-light sm:mt-2 sm:text-sm md:text-lg">
							Endpoints REST
						</p>
						<p className="mt-0.5 hidden text-[10px] leading-tight text-light/50 sm:block sm:text-xs">
							45 Tu Repe · 30 Bookify
						</p>
					</motion.div>

					<motion.div
						{...reveal(0.45)}
						className="liquid-glass col-span-3 flex flex-row items-center justify-between gap-2 rounded-2xl p-2.5 sm:gap-3 sm:rounded-3xl sm:p-4 md:col-span-3 md:gap-6 md:p-8"
					>
						<div className="min-w-0">
							<div className="flex size-7 items-center justify-center rounded-xl bg-cyan/10 text-cyan sm:size-10 md:size-12 md:rounded-2xl">
								<Rocket className="size-3.5 sm:size-5 md:size-6" />
							</div>
							<p className="mt-1.5 text-2xl font-semibold leading-none tracking-tight text-light sm:mt-2 sm:text-4xl md:mt-6 md:text-6xl">
								3
							</p>
							<p className="mt-1 text-[11px] font-semibold leading-tight text-light sm:text-sm md:text-lg">
								Sectores digitalizados
							</p>
						</div>
						<div className="flex shrink-0 flex-col items-end gap-1 sm:gap-1.5 md:gap-2">
							{sectors.map((sector) => (
								<span
									key={sector}
									className="rounded-full border border-cyan/20 bg-cyan/5 px-2 py-0.5 text-[9px] font-semibold leading-tight text-cyan/90 sm:px-2.5 sm:py-1 sm:text-[10px] md:px-3 md:py-1.5 md:text-xs"
								>
									{sector}
								</span>
							))}
						</div>
					</motion.div>

					<motion.div
						{...reveal(0.55)}
						className="liquid-glass col-span-3 flex flex-col justify-between gap-2 rounded-2xl p-2.5 sm:gap-3 sm:rounded-3xl sm:p-4 md:col-span-3 md:gap-6 md:p-8"
					>
						<div className="flex items-center gap-2 sm:gap-3">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet sm:size-10 md:size-12 md:rounded-2xl">
								<Code2 className="size-4 sm:size-5 md:size-6" />
							</div>
							<div className="min-w-0">
								<p className="text-[9px] uppercase tracking-widest text-light/40 sm:text-[10px] md:text-xs">
									Stack actual
								</p>
								<p className="text-xs font-semibold text-light sm:text-sm md:text-lg">
									Tecnologías dominadas
								</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
							{stack.map((tech) => (
								<span
									key={tech}
									className="rounded-full border border-light/10 bg-light/5 px-1.5 py-0.5 text-[9px] font-medium text-light/75 sm:px-2 sm:py-1 sm:text-[10px] md:px-3 md:py-1.5 md:text-xs"
								>
									{tech}
								</span>
							))}
						</div>
						<div className="hidden items-center gap-2 border-t border-light/8 pt-1.5 sm:flex sm:gap-3 md:pt-1">
							<div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue-2/10 text-blue-2 sm:size-8 sm:rounded-xl">
								<Layers className="size-3 sm:size-4" />
							</div>
							<p className="text-[10px] leading-snug text-light/50 sm:text-xs md:text-sm">
								Varias apps desplegadas · VPS Linux + Vercel +
								Supabase
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

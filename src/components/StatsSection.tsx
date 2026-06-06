import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Rocket } from "lucide-react";

const sectors = ["Deportes", "Turnos & reservas", "Logística en obra"];

const stack = ["React", "Node.js", "TypeScript", "Prisma", "Docker"];

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
			className="sticky top-0 z-10 flex min-h-screen flex-col justify-center overflow-hidden bg-dark px-6 py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(76,201,240,0.1),_transparent_45%)]" />

			<div className="relative mx-auto max-w-6xl">
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-sm uppercase tracking-widest text-blue-2/70"
				>
					En números
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mt-5 max-w-4xl text-4xl tracking-tight text-light md:text-6xl"
				>
					Lo que dice{" "}
					<span
						className="italic text-gradient-accent"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						mi trabajo
					</span>
				</motion.h2>

				<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
					<motion.div
						{...reveal(0.15)}
						className="liquid-glass flex flex-col items-center justify-center rounded-3xl p-8 text-center md:col-span-2 md:min-h-[280px]"
					>
						<p className="text-6xl font-semibold tracking-tight text-gradient-accent md:text-7xl">
							100%
						</p>
						<p className="mt-4 text-xl font-semibold text-light">
							Proyectos entregados
						</p>
						<p className="mt-1 text-sm text-light/50">
							y desarrollando más
						</p>
					</motion.div>

					<motion.div
						{...reveal(0.25)}
						className="liquid-glass flex flex-col justify-center items-center rounded-3xl p-8 md:col-span-2 md:min-h-[280px]"
					>
						<div>
							<p className="text-5xl font-semibold tracking-tight text-light md:text-6xl">
								4+
							</p>
							<p className="mt-2 text-lg font-semibold text-light">
								Años programando
							</p>
							<p className="mt-1 text-sm text-light/50">
								Aprendiendo y construyendo sin parar.
							</p>
						</div>
					</motion.div>

					<motion.div
						{...reveal(0.35)}
						className="liquid-glass flex flex-col justify-center items-center rounded-3xl p-8 md:col-span-2 md:min-h-[280px]"
					>
						<div>
							<p className="text-5xl font-semibold tracking-tight text-light md:text-6xl">
								+20
							</p>
							<p className="mt-2 text-lg font-semibold text-light">
								Clientes satisfechos
							</p>
							<p className="mt-1 text-sm text-light/50">
								Productos que usan y recomiendan.
							</p>
						</div>
					</motion.div>

					<motion.div
						{...reveal(0.45)}
						className="liquid-glass flex flex-col justify-between gap-6 rounded-3xl p-8 md:col-span-3 md:flex-row md:items-center"
					>
						<div>
							<div className="flex size-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
								<Rocket size={24} />
							</div>
							<p className="mt-6 text-5xl font-semibold tracking-tight text-light md:text-6xl">
								3+
							</p>
							<p className="mt-2 text-lg font-semibold text-light">
								Sectores de negocios digitalizados
							</p>
						</div>
						<div className="flex flex-row flex-wrap gap-2 md:flex-col md:items-end">
							{sectors.map((sector) => (
								<span
									key={sector}
									className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 text-xs font-semibold text-cyan/90"
								>
									{sector}
								</span>
							))}
						</div>
					</motion.div>

					<motion.div
						{...reveal(0.55)}
						className="liquid-glass flex flex-col justify-between gap-6 rounded-3xl p-8 md:col-span-3"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet">
								<Layers size={24} />
							</div>
							<div>
								<p className="text-xs uppercase tracking-widest text-light/40">
									Día a día
								</p>
								<p className="text-lg font-semibold text-light">
									Stack principal
								</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{stack.map((tech) => (
								<span
									key={tech}
									className="rounded-full border border-light/10 bg-light/5 px-4 py-2 text-sm font-medium text-light/80"
								>
									{tech}
								</span>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

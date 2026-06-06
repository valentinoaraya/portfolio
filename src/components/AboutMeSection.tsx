import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
	{
		year: "2021",
		title: "Primeras líneas de código",
		description:
			"Empecé a programar en la secundaria. Variables, bucles y la emoción de ver algo funcionar en pantalla por primera vez. Ahí supe que esto era lo mío.",
		color: "#7209b7",
	},
	{
		year: "2022",
		title: "Carrera Full Stack · CoderHouse",
		description:
			"Me metí de lleno con React, Node.js y bases de datos. Primer contacto real con proyectos completos de principio a fin y con el trabajo en equipo.",
		color: "#4895ef",
	},
	{
		year: "2023",
		title: "Ingeniería en Sistemas",
		description:
			"Inicié la carrera universitaria para sumar los fundamentos formales: algoritmos, arquitectura de software, matemática discreta y estructuras de datos.",
		color: "#4cc9f0",
	},
	{
		year: "Hoy",
		title: "Freelancer & aprendizaje continuo",
		description:
			"Trabajo con clientes reales, termino la carrera y aprendo de forma autodidacta. Me adapto a los cambios del ecosistema y cada proyecto me deja algo nuevo.",
		color: "#7209b7",
	},
];

function TimelineNode({
	milestone,
	index,
	isLast,
}: {
	milestone: (typeof milestones)[number];
	index: number;
	isLast: boolean;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	return (
		<div ref={ref} className="relative flex gap-6 md:gap-10">
			<div className="relative flex flex-col items-center">
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={isInView ? { scale: 1, opacity: 1 } : {}}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-light"
					style={{ borderColor: milestone.color }}
				>
					<div
						className="size-3 rounded-full"
						style={{ backgroundColor: milestone.color }}
					/>
				</motion.div>

				{!isLast && (
					<motion.div
						initial={{ scaleY: 0, opacity: 0 }}
						animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mt-2 w-px flex-1 origin-top bg-dark/15"
					/>
				)}
			</div>

			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={isInView ? { opacity: 1, x: 0 } : {}}
				transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
				className="pb-12 pt-1"
			>
				<p
					className="text-sm font-bold uppercase tracking-widest"
					style={{ color: milestone.color }}
				>
					{milestone.year}
				</p>
				<h3 className="mt-1.5 text-xl font-semibold tracking-tight text-dark md:text-2xl">
					{milestone.title}
				</h3>
				<p className="mt-2 text-base leading-relaxed text-dark/60">
					{milestone.description}
				</p>
			</motion.div>
		</div>
	);
}

export default function AboutMeSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section
			id="sobre-mi"
			ref={ref}
			className="relative z-20 overflow-hidden bg-light px-6 py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(114,9,183,0.06),_transparent_40%),radial-gradient(circle_at_10%_50%,_rgba(76,201,240,0.06),_transparent_40%)]" />

			<div className="relative mx-auto max-w-6xl">
				<div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
					<div>
						<motion.p
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6 }}
							className="text-sm uppercase tracking-widest text-violet/70"
						>
							Sobre mí
						</motion.p>

						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="mt-5 text-4xl tracking-tight text-dark md:text-6xl"
						>
							Estudiante e{" "}
							<span
								className="italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "#7209b7",
								}}
							>
								ingeniero
							</span>{" "}
							en construcción
						</motion.h2>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="mt-8 space-y-5 text-lg leading-relaxed text-dark/65 md:text-xl"
						>
							<p>
								Soy{" "}
								<span className="font-semibold text-dark">
									estudiante avanzado de Ingeniería en
									Sistemas
								</span>{" "}
								(4to año) y desarrollador Full Stack freelance.
								Construyo software real para clientes reales:
								desde apps móviles hasta plataformas web
								completas.
							</p>
							<p>
								Combino la base técnica de la universidad con el
								aprendizaje autodidacta y la experiencia directa
								en producción. Me muevo bien tanto en el backend
								como en el frontend, y disfruto especialmente de
								los problemas donde las dos partes se cruzan.
							</p>
						</motion.div>
					</div>

					<div className="pt-2">
						<motion.p
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6, delay: 0.15 }}
							className="mb-10 text-sm uppercase tracking-widest text-dark/40"
						>
							Trayectoria
						</motion.p>

						<div>
							{milestones.map((milestone, index) => (
								<TimelineNode
									key={milestone.year}
									milestone={milestone}
									index={index}
									isLast={index === milestones.length - 1}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

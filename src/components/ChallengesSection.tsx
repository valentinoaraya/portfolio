import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { AnimatedList } from "./ui/animated-list";

type ChallengeItem = {
	project: string;
	problem: string;
	solution: string;
	accent: string;
	icon: string;
};

const challengeItems: ChallengeItem[] = [
	{
		project: "Tu Repe",
		problem: "Un turno enterrado en horas de grabación",
		solution:
			"Mapeé cada turno a un timestamp absoluto en la grabación continua. Al reproducir, la app hace seek directo al offset calculado: el usuario ve su partido en segundos, sin recorrer horas de video.",
		accent: "#4895ef",
		icon: "🎥",
	},
	{
		project: "Bookify",
		problem: "Pagos y reservas desincronizados",
		solution:
			"Diseñé una máquina de estados para cada reserva y procesé los webhooks de Mercado Pago de forma idempotente. Si el pago llega tarde o duplicado, el sistema reconcilia sin dejar huecos ni dobles cobros.",
		accent: "#7209b7",
		icon: "💳",
	},
	{
		project: "Baños químicos",
		problem: "Operaciones en obra sin señal",
		solution:
			"Implementé una cola offline en el dispositivo: los operarios registran entregas y retiros sin conexión. Al recuperar señal, un sync con resolución de conflictos por timestamp mantiene la base consistente.",
		accent: "#4cc9f0",
		icon: "📡",
	},
	{
		project: "Tu Repe",
		problem: "Streaming pesado en móvil",
		solution:
			"Generé clips optimizados por turno y expuse un endpoint de seek por offset. El reproductor salta al fragmento correcto sin descargar ni decodificar el video completo.",
		accent: "#4895ef",
		icon: "📱",
	},
	{
		project: "Bookify",
		problem: "Reembolsos manuales y lentos",
		solution:
			"Codifiqué las políticas de cancelación del negocio en reglas automáticas. Según el tiempo de aviso y el estado del turno, el sistema calcula y ejecuta el reembolso sin intervención manual.",
		accent: "#7209b7",
		icon: "↩️",
	},
	{
		project: "Baños químicos",
		problem: "Varios operarios editando lo mismo",
		solution:
			"Cada operación lleva timestamp y tipo de acción. Al sincronizar, las ediciones concurrentes se resuelven por orden temporal y prioridad de operación, evitando pisar datos válidos.",
		accent: "#4cc9f0",
		icon: "🔄",
	},
];

const approachPillars = [
	{
		title: "Entender el contexto",
		description:
			"Cada bug empieza en el negocio: quién usa el sistema, en qué condiciones y qué no puede fallar.",
	},
	{
		title: "Diseñar antes de codear",
		description:
			"Defino estados, flujos y puntos de falla antes de escribir la primera línea de código.",
	},
	{
		title: "Iterar con datos reales",
		description:
			"Pruebo con escenarios de producción — pagos tardíos, sin red, webhooks duplicados — no solo el happy path.",
	},
];

function ChallengeListCard({
	project,
	problem,
	accent,
	icon,
	isSelected,
	onSelect,
}: ChallengeItem & {
	isSelected: boolean;
	onSelect: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={`liquid-glass relative w-full max-w-md overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
				isSelected ? "opacity-100" : "opacity-80 hover:opacity-100"
			}`}
			style={
				isSelected ? { boxShadow: `0 0 0 2px ${accent}` } : undefined
			}
		>
			<div className="flex items-center gap-3">
				<div
					className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-lg"
					style={{ backgroundColor: `${accent}22` }}
				>
					<span>{icon}</span>
				</div>
				<div className="min-w-0 flex-1">
					<p className="flex items-center gap-2 text-sm font-semibold text-light">
						<span className="truncate">{problem}</span>
					</p>
					<p className="mt-0.5 text-xs text-light/45">{project}</p>
				</div>
			</div>
		</button>
	);
}

function DefaultPanel() {
	return (
		<motion.div
			key="default"
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -12 }}
			transition={{ duration: 0.35 }}
		>
			<p className="text-lg leading-relaxed text-light/70 md:text-xl">
				No resuelvo features aisladas: cada proyecto me obliga a pensar
				en <span className="text-light">escala</span>,{" "}
				<span className="text-light">consistencia de datos</span> y{" "}
				<span className="text-light">experiencia real del usuario</span>
				.
			</p>

			<div className="mt-10 space-y-8">
				{approachPillars.map((pillar, index) => (
					<div key={pillar.title} className="flex gap-5">
						<span className="text-3xl font-light text-cyan/60">
							{String(index + 1).padStart(2, "0")}
						</span>
						<div>
							<h3 className="text-xl font-semibold tracking-tight text-light md:text-2xl">
								{pillar.title}
							</h3>
							<p className="mt-2 text-base leading-relaxed text-light/55 md:text-lg">
								{pillar.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}

function SolutionPanel({ item }: { item: ChallengeItem }) {
	return (
		<motion.div
			key={item.problem}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -12 }}
			transition={{ duration: 0.35 }}
			className="flex flex-col"
		>
			<div className="flex items-center gap-3">
				<div
					className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-xl"
					style={{ backgroundColor: `${item.accent}22` }}
				>
					<span>{item.icon}</span>
				</div>
				<div>
					<p className="text-xs uppercase tracking-widest text-light/40">
						{item.project}
					</p>
					<h3 className="mt-1 text-xl font-semibold tracking-tight text-light md:text-2xl">
						{item.problem}
					</h3>
				</div>
			</div>

			<p className="mt-6 text-xs uppercase tracking-widest text-cyan/70">
				Cómo lo resolví
			</p>
			<p className="mt-3 text-lg leading-relaxed text-light/70 md:text-xl">
				{item.solution}
			</p>
		</motion.div>
	);
}

export default function ChallengesSection() {
	const ref = useRef(null);
	const listRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });
	const listInView = useInView(listRef, { once: true, amount: 0.35 });
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const selectedItem =
		selectedIndex !== null ? challengeItems[selectedIndex] : null;

	useEffect(() => {
		if (selectedIndex === null) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (listRef.current?.contains(event.target as Node)) return;
			setSelectedIndex(null);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		return () =>
			document.removeEventListener("pointerdown", handlePointerDown);
	}, [selectedIndex]);

	const handleSelect = (index: number) => {
		setSelectedIndex((prev) => (prev === index ? null : index));
	};

	return (
		<section
			id="desafios"
			ref={ref}
			className="relative overflow-hidden bg-dark px-6 py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(114,9,183,0.12),_transparent_35%)]" />

			<div className="relative mx-auto max-w-6xl">
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-sm uppercase tracking-widest text-blue-2/70"
				>
					Detrás del código
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mt-5 max-w-4xl text-4xl tracking-tight text-light md:text-6xl"
				>
					Problemas reales y{" "}
					<span
						className="italic text-gradient-accent"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						cómo los encaro
					</span>
				</motion.h2>

				<div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 h-full">
					<motion.div
						ref={listRef}
						initial={{ opacity: 0, x: -30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="relative flex flex-col h-full"
					>
						<AnimatedList
							active={listInView}
							delay={800}
							className="w-full items-stretch gap-3 h-full"
						>
							{challengeItems.map((item, index) => (
								<ChallengeListCard
									key={`${item.project}-${index}`}
									{...item}
									isSelected={selectedIndex === index}
									onSelect={() => handleSelect(index)}
								/>
							))}
						</AnimatedList>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.3 }}
						className="flex flex-col justify-start h-full"
					>
						<div className="min-h-[280px]">
							<AnimatePresence mode="wait">
								{selectedItem ? (
									<SolutionPanel item={selectedItem} />
								) : (
									<DefaultPanel />
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

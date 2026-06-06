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
		project: "Baños químicos",
		problem: "Zona horaria Argentina en reportes de auditoría",
		solution:
			"Los timestamps UTC causaban eventos asignados al día incorrecto en los PDFs contractuales (UTC-3). Encapsulé la lógica en un módulo dateTime.ts con BUSINESS_TIMEZONE fijo y una función toBusinessDayKey() usada consistentemente en reportes, filtros de BD y validación de duplicados diarios.",
		accent: "#4cc9f0",
		icon: "🕐",
	},
	{
		project: "Bookify",
		problem: "Dos tokens de Mercado Pago para el mismo sistema",
		solution:
			"La plataforma cobra suscripciones SaaS y cada empresa cobra señas en su propia cuenta MP — requieren contextos distintos. Implementé token Aedes (env) para PreApproval y OAuth Connect per-empresa para checkout preferences. Un cron diario renueva los tokens OAuth antes de que expiren.",
		accent: "#7209b7",
		icon: "🔑",
	},
	{
		project: "Tu Repe",
		problem: "Grabaciones que se pierden sin reintentos",
		solution:
			"Implementé una tabla failed_uploads con worker de reintentos y backoff exponencial escalonado: 1m → 5m → 15m → 1h → 6h → 24h, máximo 10 intentos. Un cleanup worker elimina los archivos locales de fallos permanentes para no saturar el disco del servidor.",
		accent: "#4895ef",
		icon: "♻️",
	},
	{
		project: "Baños químicos",
		problem: "Operación sin red y panel que tardaba 10 segundos",
		solution:
			"Resolví dos problemas distintos: offline-first con IndexedDB (upsert idempotente al recuperar señal) y una función RPC get_company_panel_snapshot con 5 LATERAL JOINs y JSONB aggregation que reemplaza docenas de queries N+1. El panel pasó de +10s a una sola llamada de red.",
		accent: "#4cc9f0",
		icon: "📡",
	},
	{
		project: "Bookify",
		problem: "Race condition: dos clientes, un slot, un cobro",
		solution:
			"Al crear la preferencia de Mercado Pago, bloqueo el slot con pendingAppointments y TTL de 15 minutos en MongoDB. El webhook verifica disponibilidad antes de confirmar. Si el slot ya no está libre, la función refund() centralizada reembolsa el 100% con idempotency key, sin intervención humana.",
		accent: "#7209b7",
		icon: "💳",
	},
	{
		project: "Tu Repe",
		problem: "Pipeline de video autónomo de extremo a extremo",
		solution:
			"Diseñé un pipeline de 7 etapas: cámara RTSP → ffmpeg segmenta en chunks de 15 min → chokidar detecta el archivo estabilizado (awaitWriteFinish 10s) → sube a Backblaze B2 → registra en MySQL → API genera URLs firmadas con expiración de 2h → reproductor HTML5 hace seek directo al offset del turno. Todo el proceso es autónomo sin intervención humana.",
		accent: "#4895ef",
		icon: "🎥",
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
			"Pruebo con escenarios de producción: pagos tardíos, sin red, webhooks duplicados... no solo el happy path.",
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
			className={`liquid-glass relative mx-auto w-full min-w-0 max-w-md overflow-hidden rounded-2xl p-3 text-left transition-all duration-200 hover:scale-[1.02] cursor-pointer sm:p-4 lg:mx-0 ${
				isSelected ? "opacity-100" : "opacity-80 hover:opacity-100"
			}`}
			style={
				isSelected ? { boxShadow: `0 0 0 2px ${accent}` } : undefined
			}
		>
			<div className="flex items-center gap-2.5 sm:gap-3">
				<div
					className="flex size-9 shrink-0 items-center justify-center rounded-xl text-base sm:size-11 sm:rounded-2xl sm:text-lg"
					style={{ backgroundColor: `${accent}22` }}
				>
					<span>{icon}</span>
				</div>
				<div className="min-w-0 flex-1">
					<p className="text-xs font-semibold leading-snug text-light sm:text-sm">
						{problem}
					</p>
					<p className="mt-0.5 text-[11px] text-light/45 sm:text-xs">{project}</p>
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
			<p className="text-base leading-relaxed text-light/70 max-lg:mx-auto max-lg:w-full max-lg:max-w-xl sm:text-lg md:text-xl">
				No resuelvo features aisladas: cada proyecto me obliga a pensar
				en <span className="text-light">escala</span>,{" "}
				<span className="text-light">consistencia de datos</span> y{" "}
				<span className="text-light">experiencia real del usuario</span>
				.
			</p>

			<div className="mt-6 space-y-6 max-lg:mx-auto max-lg:w-full max-lg:max-w-xl sm:mt-10 sm:space-y-8">
				{approachPillars.map((pillar, index) => (
					<div
						key={pillar.title}
						className="flex gap-4 max-lg:flex-col max-lg:items-center max-lg:text-center sm:gap-5"
					>
						<span className="text-2xl font-light text-cyan/60 sm:text-3xl">
							{String(index + 1).padStart(2, "0")}
						</span>
						<div>
							<h3 className="text-lg font-semibold tracking-tight text-light sm:text-xl md:text-2xl">
								{pillar.title}
							</h3>
							<p className="mt-1.5 text-sm leading-relaxed text-light/55 sm:mt-2 sm:text-base md:text-lg">
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
			className="flex flex-col max-lg:items-center max-lg:text-center"
		>
			<div className="flex items-center gap-2.5 max-lg:flex-col sm:gap-3">
				<div
					className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg sm:size-12 sm:rounded-2xl sm:text-xl"
					style={{ backgroundColor: `${item.accent}22` }}
				>
					<span>{item.icon}</span>
				</div>
				<div className="min-w-0 max-lg:text-center">
					<p className="text-[11px] uppercase tracking-widest text-light/40 sm:text-xs">
						{item.project}
					</p>
					<h3 className="mt-1 text-lg font-semibold tracking-tight text-light sm:text-xl md:text-2xl">
						{item.problem}
					</h3>
				</div>
			</div>

			<p className="mt-4 text-[11px] uppercase tracking-widest text-cyan/70 sm:mt-6 sm:text-xs">
				Cómo lo resolví
			</p>
			<p className="mt-2 text-base leading-relaxed text-light/70 sm:mt-3 sm:text-lg md:text-xl">
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
			className="relative overflow-x-hidden bg-dark px-4 py-20 sm:px-6 sm:py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(114,9,183,0.12),_transparent_35%)]" />

			<div className="relative mx-auto min-w-0 max-w-6xl">
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
					className="mt-4 max-w-4xl text-3xl tracking-tight text-light sm:mt-5 sm:text-4xl md:text-6xl"
				>
					Problemas reales y{" "}
					<span
						className="italic text-gradient-accent"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						cómo los encaro
					</span>
				</motion.h2>

				<div className="mt-10 grid min-w-0 items-center gap-8 sm:mt-16 sm:gap-12 lg:grid-cols-2 lg:gap-16">
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.3 }}
						className="order-1 flex min-w-0 flex-col justify-start max-lg:items-center max-lg:text-center lg:order-2"
					>
						<div className="min-h-0 w-full min-w-0 max-lg:max-w-xl lg:min-h-[280px]">
							<AnimatePresence mode="wait">
								{selectedItem ? (
									<SolutionPanel item={selectedItem} />
								) : (
									<DefaultPanel />
								)}
							</AnimatePresence>
						</div>
					</motion.div>

					<motion.div
						ref={listRef}
						initial={{ opacity: 0, x: -30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="relative order-2 flex w-full min-w-0 flex-col max-lg:items-center lg:order-1 lg:items-stretch"
					>
						<AnimatedList
							active={listInView}
							delay={800}
							className="h-full w-full min-w-0 gap-2.5 max-lg:max-w-md sm:gap-3 lg:items-stretch"
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
				</div>
			</div>
		</section>
	);
}

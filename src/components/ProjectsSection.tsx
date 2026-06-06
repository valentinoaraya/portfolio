import { useRef, useState } from "react";
import {
	motion,
	useInView,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { Code2, Database, Layers, Sparkles, Wrench } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
		</svg>
	);
}
import { Iphone } from "./ui/iphone";
import { Safari } from "./ui/safari";

type ProjectMock = "safari" | "iphone";

type ProjectHighlight = {
	label: string;
	value: string;
};

type SideFeature = {
	title: string;
	description: string;
};

type Project = {
	title: string;
	type: string;
	tagline: string;
	description: string;
	role: string;
	url: string;
	/** Si el repo es público, link al repositorio. Dejar undefined si es privado. */
	repoUrl?: string;
	mock: ProjectMock;
	accent: "violet" | "blue-2" | "cyan";
	highlights: ProjectHighlight[];
	frontend: string[];
	backend: string[];
	integrations: string[];
	challenge: string;
	features: string[];
	sideFeatures: SideFeature[];
	imageSrc: string;
};

const PROJECT_SCROLL_STEP_VH = 150;

function createPlaceholderImage(
	title: string,
	subtitle: string,
	from: string,
	to: string,
) {
	const svg = `
		<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="1200" height="800" fill="#0e0e0e"/>
			<circle cx="1030" cy="120" r="260" fill="${from}" opacity="0.32"/>
			<circle cx="180" cy="690" r="300" fill="${to}" opacity="0.24"/>
			<rect x="92" y="92" width="1016" height="616" rx="42" fill="rgba(241,241,241,0.06)" stroke="rgba(241,241,241,0.16)" stroke-width="2"/>
			<rect x="142" y="146" width="330" height="28" rx="14" fill="${from}" opacity="0.85"/>
			<rect x="142" y="214" width="610" height="22" rx="11" fill="rgba(241,241,241,0.28)"/>
			<rect x="142" y="262" width="476" height="22" rx="11" fill="rgba(241,241,241,0.18)"/>
			<rect x="142" y="344" width="916" height="274" rx="32" fill="rgba(241,241,241,0.08)"/>
			<rect x="190" y="394" width="292" height="174" rx="26" fill="${to}" opacity="0.28"/>
			<rect x="516" y="394" width="492" height="34" rx="17" fill="rgba(241,241,241,0.25)"/>
			<rect x="516" y="458" width="382" height="26" rx="13" fill="rgba(241,241,241,0.16)"/>
			<rect x="516" y="516" width="438" height="26" rx="13" fill="rgba(241,241,241,0.12)"/>
			<text x="142" y="675" fill="#f1f1f1" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700">${title}</text>
			<text x="146" y="724" fill="#4cc9f0" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="4">${subtitle}</text>
		</svg>
	`;

	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const projects: Project[] = [
	{
		title: "Tu Repe",
		type: "Video · Deportes",
		tagline: "Replay de partidos en clubes, al instante.",
		description:
			"Plataforma para clubes de pádel, fútbol y otros deportes con cámaras instaladas en canchas. Los partidos se graban de forma continua y el jugador elige el horario de su turno en la app para reproducir el video exacto, sin buscar manualmente en horas de grabación.",
		role: "Full stack · streaming y producto",
		url: "turepe.app",
		repoUrl: "https://github.com/valentinoaraya/tu-repe",
		mock: "iphone",
		accent: "blue-2",
		highlights: [
			{ label: "Vertical", value: "Deportes en clubes" },
			{ label: "Captura", value: "Cámaras fijas 24/7" },
			{ label: "UX clave", value: "Buscar por turno" },
		],
		frontend: ["React", "PWA móvil", "HLS / video player", "Tailwind"],
		backend: ["Node.js", "API REST", "PostgreSQL", "Pipeline de video"],
		integrations: ["Almacenamiento en nube", "CDN", "Panel para clubes"],
		challenge:
			"Encontrar y reproducir el tramo exacto del partido dentro de horas de grabación continua, con buena experiencia en móvil.",
		features: [
			"Grabación automática por cancha y horario de apertura",
			"Búsqueda por fecha, hora y duración del turno",
			"Reproducción con seek preciso al minuto del partido",
			"Panel para clubes: canchas, horarios y accesos",
			"Optimización de clips para consumo móvil",
		],
		sideFeatures: [
			{
				title: "Grabación 24/7",
				description:
					"Cámaras fijas en cada cancha graban de forma continua durante todo el horario del club.",
			},
			{
				title: "Búsqueda por turno",
				description:
					"El jugador ingresa la fecha y hora de su reserva y el sistema ubica el video exacto.",
			},
			{
				title: "Seek preciso",
				description:
					"El player salta al minuto justo del partido, sin recorrer horas de grabación.",
			},
			{
				title: "Pensado para móvil",
				description:
					"Clips optimizados y reproducción en PWA para ver y compartir desde el teléfono.",
			},
			{
				title: "Panel para clubes",
				description:
					"Administración de canchas, horarios y accesos para cada sede.",
			},
			{
				title: "Stack",
				description:
					"React + PWA en el front; Node.js, PostgreSQL y un pipeline de video en el back.",
			},
		],
		imageSrc: createPlaceholderImage(
			"Tu Repe",
			"SPORTS REPLAY",
			"#4895ef",
			"#4cc9f0",
		),
	},
	{
		title: "Bookify",
		type: "SaaS · Reservas",
		tagline: "Turnos, pagos y recordatorios en un solo flujo.",
		description:
			"Plataforma de gestión de turnos donde empresas publican servicios y clientes reservan online. Incluye cobros con Mercado Pago, notificaciones automáticas por mail o WhatsApp y políticas de reembolso sin intervención manual del negocio.",
		role: "Full stack · pagos y automatización",
		url: "bookify.app",
		repoUrl: "https://github.com/valentinoaraya/bookify",
		mock: "safari",
		accent: "violet",
		highlights: [
			{ label: "Modelo", value: "B2B2C reservas" },
			{ label: "Pagos", value: "Mercado Pago" },
			{ label: "Ops", value: "Reembolsos auto" },
		],
		frontend: ["React", "Tailwind", "Calendarios", "Dashboard"],
		backend: ["Node.js", "PostgreSQL", "Webhooks", "Jobs programados"],
		integrations: [
			"Mercado Pago",
			"Emails transaccionales",
			"Notificaciones push",
		],
		challenge:
			"Mantener reservas, cobros y reembolsos alineados cuando el cliente cancela o el pago falla a último momento.",
		features: [
			"Agenda por profesional, sucursal y tipo de servicio",
			"Cobro anticipado o seña al confirmar reserva",
			"Recordatorios automáticos antes del turno",
			"Reembolsos según reglas del negocio (cancelación tardía, etc.)",
			"Panel de métricas: ocupación, ingresos y no-shows",
		],
		sideFeatures: [
			{
				title: "Agenda flexible",
				description:
					"Turnos por profesional, sucursal y tipo de servicio en una sola vista.",
			},
			{
				title: "Cobros con Mercado Pago",
				description:
					"Seña o pago total al confirmar, integrado de punta a punta.",
			},
			{
				title: "Recordatorios automáticos",
				description:
					"Notificaciones por mail y push antes de cada turno para reducir ausencias.",
			},
			{
				title: "Reembolsos sin fricción",
				description:
					"Devoluciones automáticas según las reglas de cancelación del negocio.",
			},
			{
				title: "Métricas del negocio",
				description:
					"Ocupación, ingresos y no-shows en un panel claro para el dueño.",
			},
			{
				title: "Stack",
				description:
					"React y Tailwind en el front; Node.js, PostgreSQL, webhooks y jobs programados.",
			},
		],
		imageSrc: createPlaceholderImage(
			"Bookify",
			"BOOKING + PAYMENTS",
			"#7209b7",
			"#4895ef",
		),
	},
	{
		title: "Gestión de baños químicos",
		type: "PWA · Campo offline",
		tagline: "Operaciones en obra sin depender de señal.",
		description:
			"Sistema para una empresa de alquiler de baños químicos: instalaciones en obras y eventos, muchas veces sin internet. PWA con base local que registra limpiezas y movilizaciones en terreno y sincroniza con el servidor al recuperar conectividad.",
		role: "Full stack · offline-first",
		url: "sanitarios.ops",
		repoUrl: "https://github.com/valentinoaraya/gestion-sanitarios",
		mock: "iphone",
		accent: "cyan",
		highlights: [
			{ label: "Entorno", value: "Sin conexión" },
			{ label: "Datos", value: "Sync diferida" },
			{ label: "Operación", value: "Limpieza + traslado" },
		],
		frontend: ["React PWA", "Service Workers", "IndexedDB", "Tailwind"],
		backend: [
			"Node.js",
			"PostgreSQL",
			"API de sincronización",
			"Resolución de conflictos",
		],
		integrations: [
			"Mapas y geolocalización",
			"Panel administrativo web",
			"Reportes PDF",
		],
		challenge:
			"Operar sin conexión en obra y sincronizar limpiezas y movilizaciones sin perder datos ni duplicar registros.",
		features: [
			"Registro de limpiezas con fecha, operario y evidencia",
			"Movilizaciones: entrega, retiro y reubicación de unidades",
			"Cola offline: operaciones pendientes hasta tener red",
			"Sincronización bidireccional con el servidor central",
			"Vista de flota: estado por cliente, obra y última visita",
		],
		sideFeatures: [
			{
				title: "Offline-first",
				description:
					"Funciona sin señal en obra gracias a una base de datos local en el dispositivo.",
			},
			{
				title: "Sincronización diferida",
				description:
					"Las operaciones se encolan y suben al servidor al recuperar conexión.",
			},
			{
				title: "Registro de limpiezas",
				description:
					"Fecha, operario y evidencia de cada servicio realizado en terreno.",
			},
			{
				title: "Movilizaciones",
				description:
					"Entrega, retiro y reubicación de unidades con trazabilidad completa.",
			},
			{
				title: "Resolución de conflictos",
				description:
					"Sincronización bidireccional sin perder datos ni duplicar registros.",
			},
			{
				title: "Stack",
				description:
					"React PWA con Service Workers e IndexedDB; Node.js y PostgreSQL en el back.",
			},
		],
		imageSrc: createPlaceholderImage(
			"Baños químicos",
			"OFFLINE PWA",
			"#4cc9f0",
			"#7209b7",
		),
	},
];

const accentClasses = {
	violet: "text-violet border-violet/30 bg-violet/10",
	"blue-2": "text-blue-2 border-blue-2/30 bg-blue-2/10",
	cyan: "text-cyan border-cyan/30 bg-cyan/10",
} satisfies Record<Project["accent"], string>;

function ProjectMockup({ project }: { project: Project }) {
	return (
		<motion.div
			key={project.title}
			initial={{ opacity: 0, y: 44, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -32, scale: 0.98 }}
			transition={{ duration: 0.55, ease: "easeOut" }}
			className="relative w-full shrink-0"
		>
			<div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-violet/25 via-blue-2/10 to-cyan/20 blur-3xl" />
			<div className="relative mx-auto w-full">
				{project.mock === "iphone" ? (
					<div className="mx-auto w-[min(260px,100%)]">
						<Iphone src={project.imageSrc} />
					</div>
				) : (
					<div className="mx-auto w-full max-w-[400px]">
						<Safari
							key={project.imageSrc}
							url={project.url}
							imageSrc={project.imageSrc}
							mode="simple"
							className="w-full drop-shadow-2xl"
						/>
					</div>
				)}
			</div>
		</motion.div>
	);
}

function SideFeatureItem({
	feature,
	side,
	revealed,
}: {
	feature: SideFeature;
	side: "left" | "right";
	revealed: boolean;
}) {
	const isLeft = side === "left";

	return (
		<motion.div
			initial={{
				opacity: 0,
				x: isLeft ? -36 : 36,
				filter: "blur(6px)",
			}}
			animate={
				revealed
					? { opacity: 1, x: 0, filter: "blur(0px)" }
					: {
							opacity: 0,
							x: isLeft ? -36 : 36,
							filter: "blur(6px)",
						}
			}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`w-full max-w-xs ${isLeft ? "ml-auto text-right" : "mr-auto text-left"}`}
		>
			<h3 className="text-lg text-light xl:text-xl">{feature.title}</h3>
			<div className="my-2.5 h-px w-full bg-gradient-to-r from-transparent via-light/25 to-transparent" />
			<p className="text-sm leading-relaxed text-light/55">
				{feature.description}
			</p>
		</motion.div>
	);
}

function StackCard({
	icon: Icon,
	title,
	items,
	iconClassName,
}: {
	icon: typeof Code2;
	title: string;
	items: string[];
	iconClassName: string;
}) {
	return (
		<div className="liquid-glass rounded-2xl p-4">
			<div className={`mb-2.5 flex items-center gap-2 ${iconClassName}`}>
				<Icon size={16} />
				<span className="text-xs font-semibold uppercase tracking-wider">
					{title}
				</span>
			</div>
			<div className="flex flex-wrap gap-1.5">
				{items.map((item) => (
					<span
						key={item}
						className="rounded-full bg-light/5 px-2.5 py-1 text-[11px] text-light/70"
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

function ProjectDetails({ project }: { project: Project }) {
	return (
		<motion.div
			key={project.title}
			initial={{ opacity: 0, y: 28 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -24 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className="max-h-[calc(100svh-5rem)] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(241,241,241,0.2)_transparent]"
		>
			<div className="flex flex-wrap items-center gap-3">
				<p
					className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${accentClasses[project.accent]}`}
				>
					{project.type}
				</p>
				<p className="text-xs text-light/45">{project.role}</p>
			</div>

			<h2 className="mt-4 text-3xl tracking-tight text-light xl:text-5xl">
				{project.title}
			</h2>
			<p
				className="mt-2 text-base italic text-light/55"
				style={{ fontFamily: "'Instrument Serif', serif" }}
			>
				{project.tagline}
			</p>
			<p className="mt-3 text-sm leading-relaxed text-light/60 xl:text-[15px]">
				{project.description}
			</p>

			<div className="mt-5 grid grid-cols-3 gap-2">
				{project.highlights.map((item) => (
					<div
						key={item.label}
						className="liquid-glass rounded-2xl px-3 py-3 text-center"
					>
						<p className="text-[10px] uppercase tracking-wider text-light/40">
							{item.label}
						</p>
						<p className="mt-1 text-xs font-medium leading-snug text-light/85">
							{item.value}
						</p>
					</div>
				))}
			</div>

			<div className="mt-4 grid grid-cols-2 gap-3">
				<StackCard
					icon={Code2}
					title="Frontend"
					items={project.frontend}
					iconClassName="text-blue-2"
				/>
				<StackCard
					icon={Database}
					title="Backend"
					items={project.backend}
					iconClassName="text-violet"
				/>
				<div className="col-span-2 liquid-glass rounded-2xl p-4">
					<div className="mb-2 flex items-center gap-2 text-cyan">
						<Layers size={16} />
						<span className="text-xs font-semibold uppercase tracking-wider">
							Integraciones
						</span>
					</div>
					<div className="flex flex-wrap gap-1.5">
						{project.integrations.map((item) => (
							<span
								key={item}
								className="rounded-full bg-light/5 px-2.5 py-1 text-[11px] text-light/70"
							>
								{item}
							</span>
						))}
					</div>
				</div>
				<div className="col-span-2 liquid-glass rounded-2xl p-4">
					<div className="mb-2 flex items-center gap-2 text-violet/90">
						<Wrench size={16} />
						<span className="text-xs font-semibold uppercase tracking-wider">
							Desafío técnico
						</span>
					</div>
					<p className="text-xs leading-relaxed text-light/65">
						{project.challenge}
					</p>
				</div>
			</div>

			<div className="mt-4 liquid-glass rounded-2xl p-4">
				<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-light/50">
					Funcionalidades
				</p>
				<ul className="grid gap-2 sm:grid-cols-2">
					{project.features.map((feature) => (
						<li
							key={feature}
							className="flex items-start gap-2 text-xs leading-relaxed text-light/65"
						>
							<Sparkles
								className="mt-0.5 shrink-0 text-cyan"
								size={14}
							/>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="mt-4 flex items-center gap-3">
				<p className="font-mono text-xs text-light/35">{project.url}</p>
				{project.repoUrl && (
					<a
						href={project.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Repositorio de ${project.title} en GitHub`}
						className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors hover:text-cyan"
					>
						<GithubIcon size={14} />
						Repo
					</a>
				)}
			</div>
		</motion.div>
	);
}

function ProjectsSectionIntro() {
	const introRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(introRef, { once: true, amount: 0.45 });

	return (
		<div
			ref={introRef}
			className="relative mx-auto flex min-h-[52vh] max-w-6xl justify-center md:min-h-[58vh]"
		>
			<div className="text-center md:text-left">
				<motion.p
					initial={{ opacity: 0, filter: "blur(10px)" }}
					animate={
						isInView
							? { opacity: 1, filter: "blur(0px)" }
							: { opacity: 0, filter: "blur(10px)" }
					}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="text-sm uppercase tracking-widest text-blue-2/70"
				>
					Proyectos y experiencia
				</motion.p>

				<motion.h2
					initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
					animate={
						isInView
							? { opacity: 1, scale: 1, filter: "blur(0px)" }
							: { opacity: 0, scale: 0.94, filter: "blur(12px)" }
					}
					transition={{
						duration: 0.85,
						delay: 0.12,
						ease: "easeOut",
					}}
					className="mt-5 max-w-4xl text-4xl tracking-tight text-light md:text-6xl"
				>
					Construidos y lanzados para{" "}
					<span className="italic text-gradient-accent font-semibold">
						clientes reales.
					</span>
				</motion.h2>
				<motion.h3
					initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
					animate={
						isInView
							? { opacity: 1, scale: 1, filter: "blur(0px)" }
							: { opacity: 0, scale: 0.94, filter: "blur(12px)" }
					}
					transition={{
						duration: 0.85,
						delay: 0.12,
						ease: "easeOut",
					}}
					className="mt-5 max-w-4xl text-2xl tracking-tight text-light/60"
				>
					SaaS y proyectos funcionales, en producción y resolviendo
					problemas concretos de negocio.
				</motion.h3>
			</div>
		</div>
	);
}

export default function ProjectsSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const stickyTrackRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const panelInView = useInView(panelRef, { once: true, amount: 0.5 });
	const [activeProjectIndex, setActiveProjectIndex] = useState(0);
	const [revealedFeatures, setRevealedFeatures] = useState(0);
	const { scrollYProgress } = useScroll({
		target: stickyTrackRef,
		offset: ["start start", "end end"],
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const clamped = Math.min(0.999999, Math.max(0, latest));
		const segmentSize = 1 / projects.length;
		const index = Math.min(
			projects.length - 1,
			Math.floor(clamped / segmentSize),
		);
		const localProgress = (clamped - index * segmentSize) / segmentSize;

		const total = projects[index].sideFeatures.length;
		const revealStart = 0.06;
		const revealEnd = 0.78;
		const t = (localProgress - revealStart) / (revealEnd - revealStart);
		const count = Math.round(Math.min(1, Math.max(0, t)) * total);

		setActiveProjectIndex(index);
		setRevealedFeatures(count);
	});

	const activeProject = projects[activeProjectIndex];

	const leftFeatures: { feature: SideFeature; index: number }[] = [];
	const rightFeatures: { feature: SideFeature; index: number }[] = [];
	activeProject.sideFeatures.forEach((feature, index) => {
		(index % 2 === 0 ? leftFeatures : rightFeatures).push({
			feature,
			index,
		});
	});

	return (
		<section
			id="proyectos"
			ref={sectionRef}
			className="relative bg-dark px-6 pb-24 md:pb-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(114,9,183,0.16),_transparent_30%),radial-gradient(circle_at_80%_45%,_rgba(72,149,239,0.12),_transparent_34%)]" />

			<ProjectsSectionIntro />

			<div
				ref={stickyTrackRef}
				className="relative mx-auto hidden max-w-7xl lg:block"
				style={{
					height: `${projects.length * PROJECT_SCROLL_STEP_VH}vh`,
				}}
			>
				<div
					ref={panelRef}
					className="sticky top-0 flex h-svh flex-col items-center justify-center py-10"
				>
					<motion.div
						initial={{ opacity: 0, y: 56, scale: 0.97 }}
						animate={
							panelInView
								? { opacity: 1, y: 0, scale: 1 }
								: { opacity: 0, y: 56, scale: 0.97 }
						}
						transition={{ duration: 0.75, ease: "easeOut" }}
						className="flex w-full flex-col items-center"
					>
						<div
							key={activeProject.title}
							className="flex w-full flex-col items-center"
						>
							<motion.header
								initial={{ opacity: 0, y: -18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className="mb-10 flex flex-col items-center text-center xl:mb-12"
							>
								<div className="flex flex-wrap items-center justify-center gap-4">
									<span
										className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${accentClasses[activeProject.accent]}`}
									>
										{activeProject.type}
									</span>
									<h2 className="text-3xl tracking-tight text-light xl:text-4xl">
										{activeProject.title}
									</h2>
								</div>
								<p
									className="mt-3 text-base italic text-light/55"
									style={{
										fontFamily: "'Instrument Serif', serif",
									}}
								>
									{activeProject.tagline}
								</p>
								<p className="mt-3 max-w-2xl text-sm leading-relaxed text-light/60">
									{activeProject.description}
								</p>
							</motion.header>

							<div className="grid w-full grid-cols-[1fr_minmax(260px,420px)_1fr] items-center gap-8 xl:gap-14">
								<div className="flex flex-col items-end gap-10 xl:gap-12">
									{leftFeatures.map(({ feature, index }) => (
										<SideFeatureItem
											key={feature.title}
											feature={feature}
											side="left"
											revealed={index < revealedFeatures}
										/>
									))}
								</div>

								<div className="flex min-h-[220px] w-full shrink-0 flex-col items-center justify-center text-center">
									<ProjectMockup project={activeProject} />
									<div className="mt-6 flex items-center gap-3">
										<p className="font-mono text-xs text-light/35">
											{activeProject.url}
										</p>
										{activeProject.repoUrl && (
											<a
												href={activeProject.repoUrl}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Repositorio de ${activeProject.title} en GitHub`}
												className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors hover:text-cyan"
											>
												<GithubIcon size={14} />
												Repositorio
											</a>
										)}
									</div>
								</div>

								<div className="flex flex-col items-start gap-10 xl:gap-12">
									{rightFeatures.map(({ feature, index }) => (
										<SideFeatureItem
											key={feature.title}
											feature={feature}
											side="right"
											revealed={index < revealedFeatures}
										/>
									))}
								</div>
							</div>
						</div>

						<div className="mt-12 flex gap-2">
							{projects.map((project, index) => (
								<span
									key={project.title}
									aria-hidden="true"
									className={`h-2.5 rounded-full transition-all ${
										index === activeProjectIndex
											? "w-10 bg-cyan"
											: "w-2.5 bg-light/20"
									}`}
								/>
							))}
						</div>
					</motion.div>
				</div>
			</div>

			<div className="relative mx-auto grid max-w-6xl gap-10 lg:hidden">
				{projects.map((project) => (
					<article
						key={project.title}
						className="liquid-glass rounded-[2rem] p-5"
					>
						<ProjectMockup project={project} />
						<div className="mt-8">
							<ProjectDetails project={project} />
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

import { useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useInView,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { BookOpen } from "lucide-react";
import { CaseStudyModal, type CaseStudy } from "./CaseStudyModal";
import tuRepeImg from "../assets/projects/tu-repe-mobile.webp";
import tuRepeDashboardImg from "../assets/projects/tu-repe-safari.webp";
import bookifyDashboardImg from "../assets/projects/bookify-mobile.webp";
import bookifySafariImg from "../assets/projects/bookify-safari.webp";
import toiletsSafariImg from "../assets/projects/toilets-safari.webp";
import toiletsImg from "../assets/projects/toilets-mobile.webp";

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
	url: string | undefined;
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
	cardImageSrc: string;
	caseStudy: CaseStudy;
};

const PROJECT_SCROLL_STEP_VH = 150;
const COMPACT_FEATURE_BATCH_SIZE = 3;

function getCompactFeatureState(revealedFeatures: number) {
	if (revealedFeatures <= 0) {
		return { batchIndex: 0, visibleInBatch: 0 };
	}
	if (revealedFeatures <= COMPACT_FEATURE_BATCH_SIZE) {
		return {
			batchIndex: 0,
			visibleInBatch: revealedFeatures,
		};
	}
	return {
		batchIndex: 1,
		visibleInBatch: revealedFeatures - COMPACT_FEATURE_BATCH_SIZE,
	};
}

const projects: Project[] = [
	{
		title: "Tu Repe",
		type: "Video · Deportes",
		tagline: "Replay de partidos en clubes, al instante.",
		description:
			"Plataforma B2B2C para complejos deportivos. Se instalan cámaras en las canchas y los partidos se graban automáticamente según el horario del club. El jugador busca por fecha, hora y cancha, sin registrarse, y el sistema localiza el segmento exacto y genera URLs firmadas de descarga.",
		role: "Full Stack · streaming y producto",
		url: "turepe.aedestec.com",
		repoUrl: "https://github.com/Aedes/tu-repe",
		mock: "iphone",
		accent: "blue-2",
		highlights: [
			{ label: "Endpoints REST", value: "45" },
			{ label: "Tests automatizados", value: "50 archivos" },
			{ label: "Migraciones SQL", value: "34" },
		],
		frontend: ["React 19", "TypeScript", "Vite", "Zustand"],
		backend: ["Node.js", "Express 5", "MySQL 8", "FFmpeg", "Jest"],
		integrations: ["Backblaze B2", "Cloudinary", "JWT dual", "node-cron"],
		challenge:
			"Diseñar un pipeline de video de 7 etapas completamente autónomo: desde la cámara RTSP hasta el reproductor del jugador, con resiliencia ante fallos de red y búsqueda sin sistema de reservas.",
		features: [
			"Pipeline RTSP → ffmpeg segmentado → ingesta → Backblaze B2",
			"Grabación automática por cancha según horario comercial del club",
			"Búsqueda por ventana temporal sin sistema de reservas",
			"URLs firmadas de B2 con expiración (2 horas) por seguridad",
			"Clips grabados en el navegador (MediaRecorder) y convertidos a MP4 server-side",
			"Panel admin multi-club con white-label (logo, colores, branding por club)",
		],
		sideFeatures: [
			{
				title: "Pipeline de 7 etapas",
				description:
					"Cámara RTSP → ffmpeg → filesystem → chokidar → B2 → MySQL → reproductor HTML5. Completamente autónomo.",
			},
			{
				title: "Grabación automática",
				description:
					"node-cron evalúa cada minuto si el club está en horario. ffmpeg inicia o detiene la grabación sin intervención.",
			},
			{
				title: "Resiliencia ante fallos",
				description:
					"Cola failed_uploads con backoff exponencial (1m→24h) y hasta 10 reintentos por subida fallida.",
			},
			{
				title: "Sin sistema de reservas",
				description:
					"El turno se deriva de appointment_duration + hora seleccionada. Query de intersección temporal en MySQL.",
			},
			{
				title: "Clips desde el navegador",
				description:
					"MediaRecorder + captureStream() genera WebM en el cliente. El backend convierte a MP4 con ffmpeg.",
			},
			{
				title: "Multi-tenancy y white-label",
				description:
					"JWT dual (admin + dueño), middleware de ownership por recurso, tema CSS dinámico por club.",
			},
		],
		imageSrc: tuRepeImg,
		cardImageSrc: tuRepeDashboardImg,
		caseStudy: {
			projectTitle: "Tu Repe",
			type: "Video · Deportes",
			accent: "blue-2",
			context:
				"Clubes de pádel, fútbol y básquet tienen cámaras instaladas en sus canchas, pero los jugadores rara vez acceden a las grabaciones. Encontrar un partido de 90 minutos dentro de horas de video continuo es inviable sin automatización.",
			problem:
				"Automatizar la captura, almacenamiento y distribución de videos de partidos sin requerir intervención del club ni registro del jugador. El jugador solo conoce la fecha y hora de su turno y el sistema debe localizar el fragmento exacto.",
			solution:
				"Pipeline de 7 etapas: cámaras transmiten por RTSP → ffmpeg segmenta en chunks de 15 min → chokidar detecta cada archivo estabilizado → se sube a Backblaze B2 → se registra en MySQL → Express API genera URLs firmadas con expiración de 2h → el reproductor HTML5 hace seek directo al offset del turno. Todo el proceso es autónomo, sin intervención humana.",
			architecture: [
				"Cámara RTSP",
				"ffmpeg + cron",
				"/var/videos",
				"chokidar",
				"Backblaze B2",
				"MySQL 8",
				"Express API",
				"React Player",
			],
			technicalChallenges: [
				{
					title: "Grabación continua multi-cancha",
					problem:
						"Cada club tiene N canchas con streams RTSP independientes que deben grabarse en paralelo solo durante horario de apertura.",
					solution:
						"RecordingScheduler con node-cron cada minuto evalúa hora actual en timezone Argentina. VideoRecordingService mantiene un Map en memoria con procesos ffmpeg activos por courtId, con soporte para horarios que cruzan medianoche.",
				},
				{
					title: "Ingesta confiable sin corrupción",
					problem:
						"ffmpeg escribe archivos MP4 incrementalmente. Procesarlos antes de que terminen corrompe la ingesta a B2.",
					solution:
						"chokidar con awaitWriteFinish.stabilityThreshold de 10 segundos garantiza que el archivo está completo antes de iniciar el upload.",
				},
				{
					title: "Resiliencia ante fallos de red",
					problem:
						"Las subidas a cloud storage pueden fallar, perdiendo grabaciones definitivamente si solo se intenta una vez.",
					solution:
						"Tabla failed_uploads con worker de reintentos y backoff escalonado (1m→5m→15m→1h→6h→24h), máximo 10 intentos. cleanup worker elimina archivos locales de fallos permanentes.",
				},
				{
					title: "Búsqueda sin sistema de reservas",
					problem:
						"Los clubes no tienen reservas integradas, pero el jugador conoce su fecha y hora de partido.",
					solution:
						"Modelo de turno derivado de appointmentDuration del club: startTime + duración → ventana temporal → SQL query de intersección de rangos en la tabla videos por courtId.",
				},
			],
			results: [
				"45 endpoints REST con autenticación dual (admin + dueño de club) y autorización granular por recurso via middleware",
				"50 archivos de test automatizados con Jest + Supertest (unit + integration), incluyendo escenarios de fallo de ingesta",
				"34 migraciones SQL versionadas con runner idempotente, evidenciando evolución controlada del esquema",
				"Pipeline de video de 7 etapas completamente autónomo: desde la cámara hasta el navegador del jugador",
				"Clips generados en el navegador con MediaRecorder + conversión server-side WebM→MP4 con ffmpeg",
				"White-label por club: logo, portada y paleta de colores aplicados como CSS variables dinámicas",
			],
			technologies: [
				"TypeScript",
				"Node.js",
				"Express 5",
				"MySQL 8",
				"React 19",
				"Vite",
				"Zustand",
				"FFmpeg",
				"Backblaze B2",
				"Cloudinary",
				"JWT",
				"Docker",
				"Jest",
				"node-cron",
				"chokidar",
			],
		},
	},
	{
		title: "Bookify",
		type: "SaaS · Reservas",
		tagline:
			"Turnos, cobros y recordatorios automatizados para profesionales.",
		description:
			"Plataforma SaaS de gestión de turnos para profesionales y empresas de servicios del mercado argentino. Los clientes reservan sin registrarse en el portal público de cada empresa. Cobro de señas con Mercado Pago OAuth per-empresa, recordatorios programados con BullMQ y panel en tiempo real con Socket.io.",
		role: "Full Stack · pagos y automatización",
		url: "bookify.aedestec.com",
		repoUrl: "https://github.com/valentinoaraya/bookify-backend",
		mock: "iphone",
		accent: "violet",
		highlights: [
			{ label: "Estado", value: "En producción" },
			{ label: "Endpoints REST", value: "30" },
			{ label: "Planes SaaS", value: "3 tiers" },
		],
		frontend: ["React", "TypeScript", "Vite", "Ant Design", "FullCalendar"],
		backend: [
			"Node.js",
			"Express",
			"MongoDB",
			"Mongoose",
			"Redis",
			"BullMQ",
			"Socket.io",
		],
		integrations: [
			"Mercado Pago OAuth",
			"SMTP Brevo",
			"Socket.io tiempo real",
		],
		challenge:
			"Prevenir race conditions en reservas con pago: dos clientes podían seleccionar el mismo slot mientras uno completaba el checkout en Mercado Pago, generando doble cobro y turnos duplicados.",
		features: [
			"Portal público de reserva por empresa sin registro de cliente",
			"Cobro de señas con Mercado Pago OAuth — cada empresa cobra en su propia cuenta",
			"Bloqueo temporal del slot (15 min) durante el proceso de pago para evitar race conditions",
			"Reembolsos automáticos diferenciados: 50% cliente / 100% empresa / 100% sistema",
			"Recordatorios exactos al minuto con BullMQ (worker separado del API)",
			"Panel empresa en tiempo real con Socket.io: nuevas reservas y cancelaciones sin recargar",
		],
		sideFeatures: [
			{
				title: "Portal sin registro",
				description:
					"Los clientes reservan en /c/:empresa_id sin crear cuenta. Solo nombre, DNI y email para confirmar.",
			},
			{
				title: "OAuth por empresa",
				description:
					"Cada empresa vincula su Mercado Pago con OAuth. Las señas van directo a la cuenta del profesional.",
			},
			{
				title: "Anti race-condition",
				description:
					"pendingAppointments con TTL de 15 min bloquea el slot. Si el pago falla o el slot se ocupa, reembolso automático.",
			},
			{
				title: "Recordatorios con BullMQ",
				description:
					"Al confirmar un turno se encolan jobs con delay calculado al minuto exacto. Worker independiente del API.",
			},
			{
				title: "Tiempo real con Socket.io",
				description:
					"Rooms por companyId. El panel de la empresa actualiza reservas y cancelaciones sin refrescar.",
			},
			{
				title: "Suscripciones SaaS",
				description:
					"3 planes con cobro recurrente via PreApproval MP. Upgrade y downgrade sin fricciones desde el panel.",
			},
		],
		imageSrc: bookifyDashboardImg,
		cardImageSrc: bookifySafariImg,
		caseStudy: {
			projectTitle: "Bookify",
			type: "SaaS · Reservas",
			accent: "violet",
			context:
				"Las pymes de servicios argentinas (consultorios, estudios, profesionales independientes) gestionan su agenda con WhatsApp y planillas. El resultado es doble reservas, ausentismo sin consecuencias y cobros de señas sin automatización.",
			problem:
				"Digitalizar el ciclo completo del turno: disponibilidad, reserva sin fricción, cobro de señas con Mercado Pago, recordatorios automáticos y reembolsos según política del negocio. Todo en una plataforma SaaS accesible para profesionales independientes.",
			solution:
				"SaaS con 3 planes de suscripción. Cada empresa publica servicios y slots configurables. Los clientes reservan sin registrarse. Si el servicio tiene seña, se crea una preferencia Mercado Pago y se bloquea el slot 15 minutos (pendingAppointments TTL). El webhook de MP confirma el pago, crea el turno, programa recordatorios via BullMQ y emite el evento Socket.io al panel de la empresa. Si el slot se ocupó durante el checkout, el sistema reembolsa automáticamente.",
			architecture: [
				"React SPA",
				"Express + Socket.io",
				"MongoDB Atlas",
				"Redis + BullMQ",
				"Mercado Pago API",
				"SMTP Brevo",
			],
			technicalChallenges: [
				{
					title: "Race condition en reservas con pago",
					problem:
						"Dos clientes podían seleccionar el mismo slot mientras uno completaba el checkout en Mercado Pago, causando doble cobro y turno duplicado.",
					solution:
						"pendingAppointments con TTL de 15 minutos. Al crear la preferencia MP, el slot se marca como pendiente. Webhook verifica disponibilidad antes de confirmar. Si no hay slot, reembolso automático al 100%.",
				},
				{
					title: "Doble flujo de tokens Mercado Pago",
					problem:
						"La plataforma cobra suscripciones SaaS Y cada empresa necesita cobrar señas en su propia cuenta MP — requieren tokens distintos.",
					solution:
						"Token Aedes (env) para PreApproval (suscripciones) + OAuth Connect per-empresa para checkout preferences (señas). Cron diario renueva tokens OAuth antes de que expiren.",
				},
				{
					title: "Recordatorios exactos al minuto",
					problem:
						"Un cron que escanea toda la BD cada N minutos es impreciso y sobrecarga la base de datos.",
					solution:
						"BullMQ con delay calculado por turno: jobTime = appointmentDate − hoursBefore. Worker separado del API con 3 reintentos. IDs de jobs guardados en el documento Appointment para cancelación.",
				},
				{
					title: "Reembolsos diferenciados por actor",
					problem:
						"Políticas de devolución distintas según quién cancela (cliente, empresa o el sistema tras pago aprobado sin slot).",
					solution:
						"Cliente cancela → 50% de seña. Empresa cancela → 100%. Sistema (slot ocupado en webhook) → 100%. Función refund() centralizada con idempotency key.",
				},
			],
			results: [
				"30 endpoints REST con JWT dual (access 1h + refresh 7d) y renovación automática transparente en el frontend",
				"En producción en bookify.aedestec.com con clientes reales activos",
				"3 planes SaaS con cobro recurrente, upgrade y downgrade automatizados via Mercado Pago PreApproval",
				"8+ flujos de email transaccional con templates HTML para cada evento del ciclo de vida del turno",
				"Panel empresa en tiempo real con Socket.io: nuevas reservas visibles al instante sin recargar",
				"Capacidad configurable por slot para servicios grupales (atomicidad MongoDB $inc)",
			],
			technologies: [
				"TypeScript",
				"React",
				"Vite",
				"Node.js",
				"Express",
				"MongoDB",
				"Mongoose",
				"Redis",
				"BullMQ",
				"Socket.io",
				"JWT",
				"Mercado Pago",
				"Nodemailer",
				"Ant Design",
				"FullCalendar",
			],
		},
	},
	{
		title: "Gestión de baños químicos",
		type: "PWA · Industria",
		tagline: "Trazabilidad operativa en obra, con o sin señal.",
		description:
			"PWA instalable para Don Fortunato, empresa de alquiler de baños químicos en obras industriales de Catriel. Los operarios escanean QR de cada baño para registrar limpiezas y movilizaciones con GPS — incluso offline. Supervisores e clientes generan reportes PDF de auditoría con formato contractual (Techint/OLDVALV).",
		role: "Full Stack · PWA offline-first",
		url: undefined,
		repoUrl: undefined,
		mock: "iphone",
		accent: "cyan",
		highlights: [
			{ label: "Arquitectura", value: "BaaS + offline-first" },
			{ label: "RPC PostgreSQL", value: "Funciones optimizadas" },
			{ label: "Entorno", value: "Obras sin señal" },
		],
		frontend: [
			"React 19",
			"TypeScript",
			"Vite",
			"PWA / Workbox",
			"IndexedDB",
		],
		backend: [
			"Supabase",
			"PostgreSQL",
			"RLS policies",
			"Funciones RPC SQL",
		],
		integrations: ["EmailJS", "jsPDF", "html5-qrcode", "GitHub Actions CI"],
		challenge:
			"Operar sin conectividad en obras remotas y sincronizar registros de limpieza con GPS sin duplicados, mientras el panel del cliente cargaba en más de 10 segundos con múltiples queries N+1.",
		features: [
			"Escaneo QR con captura GPS (offline-first con IndexedDB)",
			"Sync automático al detectar red: upsert idempotente a Supabase",
			"Función RPC get_company_panel_snapshot: 5 LATERAL JOINs + JSONB aggregation → 1 sola llamada",
			"Supervisión individual y masiva de eventos con nombre del supervisor",
			"Reportes PDF diarios y mensuales con formato contractual industrial",
			"CI/CD keepalive con GitHub Actions para disponibilidad 24/7 en free tier",
		],
		sideFeatures: [
			{
				title: "Offline-first",
				description:
					"IndexedDB almacena el catálogo de baños y encola registros. Sync automático al detectar evento online.",
			},
			{
				title: "QR + GPS",
				description:
					"html5-qrcode activa la cámara trasera. La geolocalización tiene fallback de alta a baja precisión.",
			},
			{
				title: "RPC optimizada",
				description:
					"get_company_panel_snapshot con LATERAL JOINs y JSONB reemplaza decenas de queries. Una sola llamada de red.",
			},
			{
				title: "Supervisión formal",
				description:
					"Checks con nombre del supervisor, observaciones y notificación por email. Batch insert para supervisión masiva.",
			},
			{
				title: "Reportes contractuales",
				description:
					"PDFs generados en el cliente con jsPDF: planillas diarias y mensuales con formato auditado por Techint/OLDVALV.",
			},
			{
				title: "BaaS sin backend propio",
				description:
					"Supabase (PostgREST + GoTrue + RLS) elimina el servidor Node. Toda la lógica de datos en PostgreSQL.",
			},
		],
		imageSrc: toiletsImg,
		cardImageSrc: toiletsSafariImg,
		caseStudy: {
			projectTitle: "Gestión de Baños Químicos",
			type: "PWA · Industria",
			accent: "cyan",
			context:
				"Don Fortunato presta servicios de alquiler, limpieza y movilización de baños químicos a empresas industriales (Techint/OLDVALV) en Catriel, Río Negro. El control operativo dependía de planillas en papel, llamadas y registros manuales sin trazabilidad ni evidencia para sus clientes industriales.",
			problem:
				"Los operarios trabajan en obras remotas con señal intermitente o nula. Necesitaban registrar limpiezas y movilizaciones con GPS incluso offline. Los supervisores requerían un panel con estado en tiempo real y reportes PDF de auditoría con formato contractual para facturación mensual.",
			solution:
				"PWA instalable con arquitectura offline-first. Catálogo de baños descargado a IndexedDB al inicio del turno. El operario escanea el QR del baño, captura GPS y guarda el registro localmente. Al detectar evento online, sync automático via upsert idempotente a Supabase PostgreSQL. El panel de empresa consulta un snapshot optimizado via función RPC con LATERAL JOINs. Los reportes PDF se generan completamente en el cliente con jsPDF.",
			architecture: [
				"PWA + Service Worker",
				"IndexedDB (offline)",
				"Supabase PostgREST",
				"PostgreSQL + RLS",
				"Funciones RPC",
				"jsPDF client-side",
			],
			technicalChallenges: [
				{
					title: "Operación sin conectividad",
					problem:
						"Obras en Catriel con señal intermitente o nula. Sin internet, los operarios no podían registrar eventos.",
					solution:
						"Offline-first con IndexedDB: catálogo de baños descargado al inicio, registros guardados localmente, sync automático al detectar evento online, upsert con ignoreDuplicates para idempotencia.",
				},
				{
					title: "Performance del panel de empresa",
					problem:
						"La carga inicial requería múltiples queries .in() con payloads masivos de cleanings y checks, tardando más de 10 segundos.",
					solution:
						"Función RPC get_company_panel_snapshot con 5 LATERAL JOINs, JSONB aggregation y filtro de 24h server-side con índices compuestos. Una sola llamada de red reemplaza decenas de queries.",
				},
				{
					title: "Zona horaria en reportes contractuales",
					problem:
						"Timestamps UTC vs día de negocio local (UTC-3) causaban eventos asignados al día incorrecto en los PDFs de auditoría.",
					solution:
						"Módulo dateTime.ts con BUSINESS_TIMEZONE fijo y función toBusinessDayKey() usada consistentemente en reportes, filtros y validación de duplicados diarios.",
				},
			],
			results: [
				"Trazabilidad completa de cada baño con evidencia georreferenciada (GPS + timestamp) por limpieza y movilización",
				"Operación 100% funcional sin conectividad para operarios en obras remotas",
				"Panel de empresa reducido de múltiples queries lentas a una sola llamada RPC optimizada",
				"Reportes PDF diarios y mensuales automatizados con formato de planilla contractual industrial",
				"PWA instalable en Android e iOS con guía de onboarding específica para Safari",
				"CI/CD keepalive con GitHub Actions para disponibilidad 24/7 del free tier de Supabase",
			],
			technologies: [
				"React 19",
				"TypeScript",
				"Vite",
				"Supabase",
				"PostgreSQL",
				"PWA / Workbox",
				"IndexedDB",
				"html5-qrcode",
				"jsPDF",
				"EmailJS",
				"Vercel",
				"GitHub Actions",
			],
		},
	},
];

const accentClasses = {
	violet: "text-violet border-violet/30 bg-violet/10",
	"blue-2": "text-blue-2 border-blue-2/30 bg-blue-2/10",
	cyan: "text-cyan border-cyan/30 bg-cyan/10",
} satisfies Record<Project["accent"], string>;

function ProjectMockup({
	project,
	compact = false,
	sidebar = false,
}: {
	project: Project;
	compact?: boolean;
	sidebar?: boolean;
}) {
	const iphoneWidth = sidebar
		? "w-[min(195px,100%)]"
		: compact
			? "w-[min(200px,100%)] md:w-[min(240px,100%)] xl:w-[min(260px,100%)]"
			: "w-[min(260px,100%)]";
	const safariWidth = sidebar
		? "max-w-[260px]"
		: compact
			? "max-w-[280px] md:max-w-[340px] xl:max-w-[400px]"
			: "max-w-[400px]";

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
					<div className={`mx-auto ${iphoneWidth}`}>
						<Iphone src={project.imageSrc} />
					</div>
				) : (
					<div className={`mx-auto w-full ${safariWidth}`}>
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
	className,
}: {
	feature: SideFeature;
	side: "left" | "right";
	revealed: boolean;
	className?: string;
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
			className={`w-full xl:max-w-xs ${isLeft ? "ml-auto text-right" : "mr-auto text-left"} ${className ?? ""}`}
		>
			<h3 className="text-sm text-light md:text-base xl:text-xl">
				{feature.title}
			</h3>
			<div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-light/25 to-transparent md:my-2.5" />
			<p className="text-xs leading-relaxed text-light/55 md:text-sm">
				{feature.description}
			</p>
		</motion.div>
	);
}

function ProjectStickyActions({
	project,
	onCaseStudy,
}: {
	project: Project;
	onCaseStudy: () => void;
}) {
	return (
		<div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:mt-4 md:gap-3 min-[900px]:mt-6">
			{project.url && (
				<a
					href={`https://${project.url}`}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Ver ${project.title} en ${project.url}`}
					className="font-mono text-xs text-light/35 transition-colors cursor-pointer hover:text-cyan"
				>
					{project.url}
				</a>
			)}
			{project.repoUrl && (
				<a
					href={project.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Repositorio de ${project.title} en GitHub`}
					className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors hover:text-cyan"
				>
					<GithubIcon size={14} />
				</a>
			)}
			<button
				type="button"
				onClick={onCaseStudy}
				className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors cursor-pointer hover:text-cyan"
			>
				<BookOpen size={14} />
				Ver detalles
			</button>
		</div>
	);
}

function CompactFeatureBatch({
	projectTitle,
	features,
	batchIndex,
	visibleInBatch,
}: {
	projectTitle: string;
	features: SideFeature[];
	batchIndex: number;
	visibleInBatch: number;
}) {
	const batchStart = batchIndex * COMPACT_FEATURE_BATCH_SIZE;
	const batchFeatures = features.slice(
		batchStart,
		batchStart + COMPACT_FEATURE_BATCH_SIZE,
	);

	return (
		<div className="relative flex min-h-[240px] flex-col justify-center md:min-h-[260px]">
			<AnimatePresence mode="wait">
				<motion.div
					key={`${projectTitle}-batch-${batchIndex}`}
					initial={{ opacity: 0, x: 28 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -28 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="flex flex-col gap-4 md:gap-5"
				>
					{batchFeatures.map((feature, index) => (
						<SideFeatureItem
							key={feature.title}
							feature={feature}
							side="right"
							revealed={index < visibleInBatch}
							className="max-w-full"
						/>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

function ProjectCardMockup({ project }: { project: Project }) {
	return (
		<motion.div
			key={project.title}
			initial={{ opacity: 0, y: 32, scale: 0.97 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="relative w-full shrink-0"
		>
			<div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet/20 via-blue-2/10 to-cyan/15 blur-2xl" />
			<div className="relative mx-auto w-full max-w-[340px]">
				<Safari
					key={project.cardImageSrc}
					url={project.url}
					imageSrc={project.cardImageSrc}
					mode="simple"
					className="w-full drop-shadow-2xl"
				/>
			</div>
		</motion.div>
	);
}

function ProjectCardSummary({
	project,
	onCaseStudy,
}: {
	project: Project;
	onCaseStudy: () => void;
}) {
	return (
		<div>
			<div className="flex flex-wrap items-center gap-2">
				<p
					className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${accentClasses[project.accent]}`}
				>
					{project.type}
				</p>
				<p className="text-xs text-light/45">{project.role}</p>
			</div>

			<h2 className="mt-3 text-2xl tracking-tight text-light">
				{project.title}
			</h2>
			<p
				className="mt-2 text-base italic text-light/55"
				style={{ fontFamily: "'Instrument Serif', serif" }}
			>
				{project.tagline}
			</p>
			<p className="mt-3 text-sm leading-relaxed text-light/60">
				{project.description}
			</p>

			<div className="mt-5 flex flex-wrap items-center gap-3">
				{project.url && (
					<a
						className="font-mono text-xs text-light/35 transition-colors hover:text-cyan"
						href={`https://${project.url}`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Ver ${project.title} en ${project.url}`}
					>
						{project.url}
					</a>
				)}
				{project.repoUrl && (
					<a
						href={project.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Repositorio de ${project.title} en GitHub`}
						className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors hover:text-cyan"
					>
						<GithubIcon size={14} />
					</a>
				)}
				<button
					type="button"
					onClick={onCaseStudy}
					className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-light/60 transition-colors hover:text-cyan cursor-pointer"
				>
					<BookOpen size={14} />
					Ver detalles
				</button>
			</div>
		</div>
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
					Productos construidos y lanzados para{" "}
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
	const [activeCaseStudy, setActiveCaseStudy] = useState<
		(typeof projects)[number]["caseStudy"] | null
	>(null);
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

	const compactFeatureState = getCompactFeatureState(revealedFeatures);

	return (
		<>
			<CaseStudyModal
				caseStudy={activeCaseStudy}
				onClose={() => setActiveCaseStudy(null)}
			/>
			<section
				id="proyectos"
				ref={sectionRef}
				className="relative -mt-[2px] bg-dark px-6 pb-24 md:pb-32"
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(114,9,183,0.16),_transparent_30%),radial-gradient(circle_at_80%_45%,_rgba(72,149,239,0.12),_transparent_34%)]" />

				<ProjectsSectionIntro />

				<div
					ref={stickyTrackRef}
					className="relative mx-auto hidden max-w-7xl min-[500px]:block"
					style={{
						height: `${projects.length * PROJECT_SCROLL_STEP_VH}vh`,
					}}
				>
					<div
						ref={panelRef}
						className="sticky top-0 flex h-svh flex-col items-center justify-center py-6 md:py-8 xl:py-10"
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
								className="flex w-full flex-col items-center gap-10"
							>
								<motion.header
									initial={{ opacity: 0, y: -18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										ease: "easeOut",
									}}
									className="mb-4 flex flex-col items-center text-center min-[900px]:mb-8 xl:mb-12"
								>
									<div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
										<span
											className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${accentClasses[activeProject.accent]}`}
										>
											{activeProject.type}
										</span>
										<h2 className="text-2xl tracking-tight text-light md:text-3xl xl:text-4xl">
											{activeProject.title}
										</h2>
									</div>
									<p
										className="mt-2 text-sm italic text-light/55 md:mt-3 md:text-base"
										style={{
											fontFamily:
												"'Instrument Serif', serif",
										}}
									>
										{activeProject.tagline}
									</p>
									<p className="mt-2 max-w-2xl text-xs leading-relaxed text-light/60 md:mt-3 md:text-sm">
										{activeProject.description}
									</p>
								</motion.header>

								{/* Layout compacto: mock izquierda + features en batches (768–899px) */}
								<div className="grid w-full grid-cols-[minmax(195px,48%)_1fr] items-center gap-3 md:gap-4 min-[900px]:hidden">
									<div className="flex flex-col items-center justify-center">
										<ProjectMockup
											project={activeProject}
											sidebar
										/>
										<ProjectStickyActions
											project={activeProject}
											onCaseStudy={() =>
												setActiveCaseStudy(
													activeProject.caseStudy,
												)
											}
										/>
									</div>

									<CompactFeatureBatch
										projectTitle={activeProject.title}
										features={activeProject.sideFeatures}
										batchIndex={
											compactFeatureState.batchIndex
										}
										visibleInBatch={
											compactFeatureState.visibleInBatch
										}
									/>
								</div>

								{/* Layout amplio: mock centro + features a ambos lados (≥900px) */}
								<div className="hidden w-full grid-cols-[1fr_minmax(200px,420px)_1fr] items-center gap-4 min-[900px]:grid md:grid-cols-[1fr_minmax(240px,420px)_1fr] md:gap-6 xl:grid-cols-[1fr_minmax(260px,420px)_1fr] xl:gap-14">
									<div className="flex flex-col items-end gap-6 md:gap-8 xl:gap-12">
										{leftFeatures.map(
											({ feature, index }) => (
												<SideFeatureItem
													key={feature.title}
													feature={feature}
													side="left"
													revealed={
														index < revealedFeatures
													}
												/>
											),
										)}
									</div>

									<div className="flex min-h-[180px] w-full shrink-0 flex-col items-center justify-center text-center md:min-h-[200px] xl:min-h-[220px]">
										<ProjectMockup
											project={activeProject}
											compact
										/>
										<ProjectStickyActions
											project={activeProject}
											onCaseStudy={() =>
												setActiveCaseStudy(
													activeProject.caseStudy,
												)
											}
										/>
									</div>

									<div className="flex flex-col items-start gap-6 md:gap-8 xl:gap-12">
										{rightFeatures.map(
											({ feature, index }) => (
												<SideFeatureItem
													key={feature.title}
													feature={feature}
													side="right"
													revealed={
														index < revealedFeatures
													}
												/>
											),
										)}
									</div>
								</div>
							</div>

							<div className="mt-8 flex gap-2 md:mt-10 xl:mt-12">
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

				<div className="relative mx-auto grid max-w-6xl gap-10 min-[500px]:hidden">
					{projects.map((project) => (
						<article
							key={project.title}
							className="liquid-glass rounded-[2rem] p-5"
						>
							<ProjectCardMockup project={project} />
							<div className="mt-6">
								<ProjectCardSummary
									project={project}
									onCaseStudy={() =>
										setActiveCaseStudy(project.caseStudy)
									}
								/>
							</div>
						</article>
					))}
				</div>
			</section>
		</>
	);
}

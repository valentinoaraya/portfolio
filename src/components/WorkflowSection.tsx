import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
	Bot,
	Boxes,
	LayoutTemplate,
	Rocket,
	Server,
	ShieldAlert,
} from "lucide-react";

const layeredArchitecture = [
	"Router",
	"Controller",
	"Service",
	"Repository",
	"DB / BaaS",
];

const backendPractices = ["DRY", "KISS", "YAGNI", "SOLID", "TDD"];

const backendPoints = [
	{
		title: "TDD antes de implementar",
		description:
			"En Tu Repe: 50 archivos de test con Jest + Supertest antes de codear la funcionalidad. Testeo unit, integration y escenarios de fallo (ingesta corrupta, webhooks duplicados, red caída).",
	},
	{
		title: "Layered Architecture como base",
		description:
			"Router → Controller → Service → Repository → DB. Cada capa tiene una sola responsabilidad. Facilita testear, escalar y reemplazar partes sin romper todo.",
	},
	{
		title: "ORM o SQL directo según el contexto",
		description:
			"Mongoose para MongoDB + Mongoose en Bookify (lógica relacional liviana), MySQL 8 con queries SQL directo en Tu Repe (performance crítica y 34 migraciones versionadas), Supabase PostgREST en baños.",
	},
	{
		title: "Docker para entornos reproducibles",
		description:
			"Containerizo el stack de desarrollo para evitar el 'funciona en mi máquina'. MySQL + Node en Compose, misma configuración en dev y prod.",
	},
	{
		title: "Resiliencia y manejo de fallos",
		description:
			"No solo el happy path. Backoff exponencial para uploads fallidos, idempotency keys en webhooks de pagos, upsert idempotente para sync offline, reintentos con BullMQ.",
	},
];

const frontendPoints = [
	{
		title: "Primero el diseño, luego el código",
		description:
			"Antes de codear defino el UI: wireframe propio, referencia de diseño o mockup generado con IA. En Bookify usé Ant Design + FullCalendar. Este portfolio lo diseñé desde cero.",
	},
	{
		title: "React con estado bien estructurado",
		description:
			"Zustand para estado global liviano (Tu Repe), Context API para theming y sesión (Bookify), estado local para formularios y UI. Evito re-renders innecesarios con memoización selectiva.",
	},
	{
		title: "TypeScript en todo el stack",
		description:
			"Tipos compartidos entre frontend y backend, interfaces para contratos de API, discriminated unions para estados de máquina (turno: pending | confirmed | cancelled | refunded).",
	},
	{
		title: "Performance y experiencia en campo",
		description:
			"PWA instalable con Service Workers para offline-first (baños químicos), lazy loading de imágenes, seek preciso en video sin descargar el archivo completo (Tu Repe), skeleton loaders.",
	},
];

function PointList({
	points,
}: {
	points: { title: string; description: string }[];
}) {
	return (
		<ul className="mt-6 space-y-5">
			{points.map((point) => (
				<li key={point.title} className="flex gap-3">
					<span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan/70" />
					<div>
						<p className="text-base font-semibold text-light">
							{point.title}
						</p>
						<p className="mt-1 text-sm leading-relaxed text-light/55">
							{point.description}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}

export default function WorkflowSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.15 });

	return (
		<section
			id="metodologia"
			ref={ref}
			className="relative overflow-hidden bg-dark px-6 py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,_rgba(72,149,239,0.12),_transparent_40%)]" />

			<div className="relative mx-auto max-w-6xl">
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-sm uppercase tracking-widest text-blue-2/70"
				>
					Cómo trabajo
				</motion.p>
				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mt-5 max-w-4xl text-4xl tracking-tight text-light md:text-6xl"
				>
					Mi forma de{" "}
					<span
						className="italic text-gradient-accent"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						construir software
					</span>
				</motion.h2>

				<div className="mt-8 grid gap-6 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.3 }}
						className="liquid-glass flex flex-col rounded-3xl p-7 md:p-8"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet">
								<Server size={24} />
							</div>
							<div>
								<p className="text-xs uppercase tracking-widest text-light/40">
									Del lado del servidor
								</p>
								<h3 className="text-2xl font-semibold tracking-tight text-light">
									Backend
								</h3>
							</div>
						</div>

						<PointList points={backendPoints} />

						<div className="mt-7">
							<p className="text-xs uppercase tracking-widest text-light/40">
								Layered Architecture
							</p>
							<div className="mt-3 flex flex-wrap items-center gap-2">
								{layeredArchitecture.map((layer, index) => (
									<div
										key={layer}
										className="flex items-center gap-2"
									>
										<span className="rounded-lg bg-light/5 px-3 py-1.5 text-xs font-medium text-light/80">
											{layer}
										</span>
										{index <
											layeredArchitecture.length - 1 && (
											<span className="text-cyan/50">
												→
											</span>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="mt-7">
							<p className="text-xs uppercase tracking-widest text-light/40">
								Buenas prácticas
							</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{backendPractices.map((practice) => (
									<span
										key={practice}
										className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 text-xs font-semibold text-cyan/90"
									>
										{practice}
									</span>
								))}
							</div>
						</div>

						<div className="mt-7">
							<p className="text-xs uppercase tracking-widest text-light/40">
								Stack backend actual
							</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{[
									"Node.js",
									"Express 5",
									"TypeScript",
									"MySQL 8",
									"MongoDB",
									"Redis",
									"BullMQ",
									"Socket.io",
									"Docker",
									"Jest",
								].map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-light/10 bg-light/5 px-3 py-1 text-xs font-medium text-light/70"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						<div className="mt-4 flex items-center gap-2 text-sm text-light/50">
							<Boxes
								size={16}
								className="text-blue-2/70 shrink-0"
							/>
							<span>
								Docker Compose para que dev y prod sean
								idénticos.
							</span>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.35 }}
						className="liquid-glass flex flex-col rounded-3xl p-7 md:p-8"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-2/15 text-blue-2">
								<LayoutTemplate size={24} />
							</div>
							<div>
								<p className="text-xs uppercase tracking-widest text-light/40">
									Del lado del cliente
								</p>
								<h3 className="text-2xl font-semibold tracking-tight text-light">
									Frontend
								</h3>
							</div>
						</div>

						<PointList points={frontendPoints} />

						<div className="mt-7">
							<p className="text-xs uppercase tracking-widest text-light/40">
								Stack frontend actual
							</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{[
									"React 19",
									"TypeScript",
									"Vite",
									"Tailwind",
									"Zustand",
									"Framer Motion",
									"Ant Design",
									"FullCalendar",
									"PWA / Workbox",
								].map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-blue-2/20 bg-blue-2/5 px-3 py-1 text-xs font-medium text-blue-2/80"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.45 }}
					className="liquid-glass mt-6 flex flex-col gap-5 rounded-3xl p-7 md:flex-row md:items-center md:gap-7 md:p-8"
				>
					<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
						<Rocket size={24} />
					</div>
					<div>
						<p className="text-xs uppercase tracking-widest text-light/40">
							Despliegue a producción
						</p>
						<h3 className="mt-1 text-2xl font-semibold tracking-tight text-light">
							VPS Linux · Vercel · Supabase
						</h3>
						<p className="mt-3 text-base leading-relaxed text-light/60 md:text-lg">
							Tengo experiencia desplegando aplicaciones y
							configurando servidores desde cero: VPS Linux con
							nginx y HTTPS, setup completo para backends y
							Supabase para proyectos serverless como el de baños.
							<span className="inline-flex items-center gap-1 text-light">
								<ShieldAlert
									size={16}
									className="text-pink/80"
								/>
								Me hackearon una vez:{" "}
							</span>{" "}
							aprendí sobre fail2ban, SSH hardening, firewall UFW
							y monitoreo de logs más rápido que con cualquier
							tutorial. GitHub Actions para CI/CD.
						</p>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="liquid-glass mt-6 flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center md:gap-6"
				>
					<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
						<Bot size={24} />
					</div>
					<p className="text-base leading-relaxed text-light/70 md:text-lg">
						Uso la{" "}
						<span className="text-light">IA como un compañero</span>{" "}
						que potencia mi velocidad y productividad,{" "}
						<span className="text-light">
							siempre revisando y planeando antes de implementar
						</span>
						. La tecnología acelera el cómo, pero las decisiones
						siguen siendo mías.
					</p>
				</motion.div>
			</div>
		</section>
	);
}

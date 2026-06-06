import { CV_GOOGLE_DRIVE_URL } from "../constants/links";

const navLinks = [
	{ label: "Proyectos", href: "#proyectos" },
	{ label: "Desafíos", href: "#desafios" },
	{ label: "Metodología", href: "#metodologia" },
	{ label: "Sobre mí", href: "#sobre-mi" },
	{ label: "Contacto", href: "#contacto" },
];

const socialLinks = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/valentinoaraya/",
		icon: (
			<svg
				width={16}
				height={16}
				fill="currentColor"
				viewBox="0 0 16 16"
				aria-hidden="true"
			>
				<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
			</svg>
		),
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/tinoaraya/",
		icon: (
			<svg
				width={16}
				height={16}
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
		),
	},
	{
		label: "GitHub",
		href: "https://github.com/valentinoaraya",
		icon: (
			<svg
				width={16}
				height={16}
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
			</svg>
		),
	},
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-dark/10 bg-light px-6 py-12">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div>
						<span className="text-2xl font-semibold text-violet">
							VA
						</span>
						<p className="mt-2 max-w-xs text-sm leading-relaxed text-dark/50">
							Valentino Araya · Desarrollador Full Stack &
							Estudiante de Ingeniería en Sistemas.
						</p>
					</div>

					<nav
						aria-label="Footer navigation"
						className="flex flex-wrap gap-x-8 gap-y-2"
					>
						{navLinks.map(({ label, href }) => (
							<a
								key={label}
								href={href}
								className="text-sm text-dark/55 transition-colors hover:text-violet"
							>
								{label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-2">
						{socialLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								className="flex size-8 items-center justify-center rounded-full border border-dark/15 text-dark/55 transition-all hover:border-violet/30 hover:text-violet"
							>
								{link.icon}
							</a>
						))}
						<a
							href={CV_GOOGLE_DRIVE_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-2 rounded-full border border-dark/15 px-4 py-1.5 text-xs font-semibold text-dark/60 transition-all hover:border-violet/30 hover:text-violet"
						>
							Ver CV
						</a>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-dark/10 pt-6 sm:flex-row">
					<p className="text-xs text-dark/40">
						© {year} Valentino Araya. Todos los derechos reservados.
					</p>
					<p className="text-xs text-dark/30">
						Diseñado y desarrollado por mí.
					</p>
				</div>
			</div>
		</footer>
	);
}

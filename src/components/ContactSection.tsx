import { type FormEvent, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";

const CONTACT_EMAIL = "valentinoaraya04@gmail.com";

const socialLinks = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/valentinoaraya/",
		icon: (
			<svg
				width={18}
				height={18}
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
				width={18}
				height={18}
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
				width={18}
				height={18}
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
			</svg>
		),
	},
];

type FormState = "idle" | "sending" | "sent";

export default function ContactSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const [formState, setFormState] = useState<FormState>("idle");
	const [fields, setFields] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setFormState("sending");

		const subject = encodeURIComponent(
			`Contacto desde portfolio — ${fields.name}`,
		);
		const body = encodeURIComponent(
			`Hola Valentino,\n\n${fields.message}\n\n— ${fields.name}\n${fields.email}`,
		);

		window.open(
			`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
			"_blank",
		);

		setTimeout(() => {
			setFormState("sent");
			setFields({ name: "", email: "", message: "" });
		}, 600);
	};

	const inputClass =
		"min-w-0 w-full rounded-xl border border-dark/15 bg-white px-3 py-2.5 text-sm text-dark placeholder:text-dark/35 outline-none transition-all focus:border-violet/50 focus:ring-2 focus:ring-violet/15 sm:px-4 sm:py-3 sm:text-base";

	return (
		<section
			id="contacto"
			ref={ref}
			className="relative overflow-x-hidden bg-light px-4 py-20 sm:px-6 sm:py-24 md:py-32"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(114,9,183,0.06),_transparent_45%)]" />

			<div className="relative mx-auto min-w-0 max-w-6xl">
				<div className="grid min-w-0 gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
					<div className="min-w-0">
						<motion.p
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6 }}
							className="text-sm uppercase tracking-widest text-violet/70"
						>
							Contacto
						</motion.p>

						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="mt-4 text-3xl tracking-tight text-dark sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
						>
							Trabajemos{" "}
							<span
								className="italic"
								style={{
									fontFamily: "'Instrument Serif', serif",
									color: "#7209b7",
								}}
							>
								juntos
							</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="mt-4 text-base leading-relaxed text-dark/60 sm:mt-6 sm:text-lg md:text-xl"
						>
							¿Tenés un proyecto en mente o querés mejorar algo
							que ya existe? Mandame un mensaje y lo hablamos.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.3 }}
							className="mt-8 flex flex-col gap-4 sm:mt-10"
						>
							<a
								href={`mailto:${CONTACT_EMAIL}`}
								className="group flex min-w-0 items-center gap-2.5 text-sm font-medium text-dark/70 transition-colors hover:text-violet sm:gap-3 sm:text-base"
							>
								<span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dark/15 bg-white text-dark/60 transition-colors group-hover:border-violet/30 group-hover:text-violet">
									<Mail size={16} />
								</span>
								<span className="min-w-0 break-all">
									{CONTACT_EMAIL}
								</span>
								<ArrowRight
									size={14}
									className="hidden shrink-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:block"
								/>
							</a>

							<div className="mt-2 flex gap-3">
								{socialLinks.map((link) => (
									<a
										key={link.label}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={link.label}
										className="flex size-9 items-center justify-center rounded-full border border-dark/15 bg-white text-dark/60 transition-all hover:border-violet/30 hover:text-violet"
									>
										{link.icon}
									</a>
								))}
							</div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.25 }}
						className="min-w-0 w-full"
					>
						{formState === "sent" ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dark/10 bg-white px-5 py-12 text-center sm:rounded-3xl sm:px-10 sm:py-16"
							>
								<div className="flex size-16 items-center justify-center rounded-full bg-violet/10 text-violet">
									<Send size={26} />
								</div>
								<h3 className="text-2xl font-semibold text-dark">
									¡Mensaje listo para enviar!
								</h3>
								<p className="text-base text-dark/55">
									Se abrió tu cliente de correo con el
									mensaje. Solo falta que lo envíes.
								</p>
								<button
									type="button"
									onClick={() => setFormState("idle")}
									className="mt-4 text-sm font-medium text-violet underline-offset-4 hover:underline"
								>
									Enviar otro mensaje
								</button>
							</motion.div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-dark/10 bg-white p-4 sm:gap-5 sm:rounded-3xl sm:p-6 md:p-10"
							>
								<div className="grid min-w-0 gap-4 sm:grid-cols-2">
									<div className="flex min-w-0 flex-col gap-1.5">
										<label
											htmlFor="name"
											className="text-sm font-medium text-dark/70"
										>
											Nombre
										</label>
										<input
											id="name"
											name="name"
											type="text"
											required
											value={fields.name}
											onChange={handleChange}
											placeholder="Tu nombre"
											className={inputClass}
										/>
									</div>
									<div className="flex min-w-0 flex-col gap-1.5">
										<label
											htmlFor="email"
											className="text-sm font-medium text-dark/70"
										>
											Email
										</label>
										<input
											id="email"
											name="email"
											type="email"
											required
											value={fields.email}
											onChange={handleChange}
											placeholder="tu@email.com"
											className={inputClass}
										/>
									</div>
								</div>

								<div className="flex min-w-0 flex-col gap-1.5">
									<label
										htmlFor="message"
										className="text-sm font-medium text-dark/70"
									>
										Mensaje
									</label>
									<textarea
										id="message"
										name="message"
										required
										rows={5}
										value={fields.message}
										onChange={handleChange}
										placeholder="Contame sobre tu proyecto o idea..."
										className={`${inputClass} resize-none`}
									/>
								</div>

								<button
									type="submit"
									disabled={formState === "sending"}
									className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-violet px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-violet/90 disabled:opacity-70 sm:px-6 sm:py-3.5 sm:text-base"
								>
									{formState === "sending"
										? "Preparando..."
										: "Enviar mensaje"}
									<Send
										size={16}
										className="transition-transform group-hover:translate-x-0.5"
									/>
								</button>
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}

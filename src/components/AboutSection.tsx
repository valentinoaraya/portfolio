import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			id="sobre-mi"
			ref={ref}
			className="relative overflow-hidden bg-dark  px-6 pb-10 pt-32 md:pb-14 md:pt-44"
		>
			<div className="mx-auto max-w-6xl">
				<motion.p
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-sm uppercase tracking-widest text-blue-2/70"
				>
					About Us
				</motion.p>

				<motion.h2
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, delay: 0.1 }}
					className="mt-6 text-4xl leading-[1.1] tracking-tight text-light md:text-6xl lg:text-7xl"
				>
					Pioneering{" "}
					<span
						className="italic text-violet/80"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						ideas
					</span>{" "}
					for
					<br className="hidden md:block" />{" "}
					<span
						className="italic text-violet/80"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						minds that create, build, and inspire.
					</span>
				</motion.h2>
			</div>
		</section>
	);
}

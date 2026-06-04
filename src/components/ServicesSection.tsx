import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    tag: 'Strategy',
    title: 'Research & Insight',
    description:
      'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    accent: 'violet' as const,
  },
  {
    tag: 'Craft',
    title: 'Design & Execution',
    description:
      'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    accent: 'blue-2' as const,
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-dark bg-[radial-gradient(ellipse_at_center,_rgba(72,149,239,0.08)_0%,_transparent_60%)] px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <h2 className="text-3xl tracking-tight text-light md:text-5xl">
            What we do
          </h2>
          <p className="hidden text-sm text-blue-2/70 md:block">Our services</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="liquid-glass group overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  src={service.videoUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-indigo/10 to-transparent" />
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <p
                    className={`text-xs uppercase tracking-widest ${
                      service.accent === 'violet'
                        ? 'text-violet/80'
                        : 'text-blue-2/80'
                    }`}
                  >
                    {service.tag}
                  </p>
                  <div className="liquid-glass rounded-full p-2">
                    <ArrowUpRight
                      size={16}
                      className={
                        service.accent === 'violet' ? 'text-violet' : 'text-blue-2'
                      }
                    />
                  </div>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-light md:text-2xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-light/55">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-content">
        <motion.p className="hero-eyebrow" {...fadeUp(0.1)}>
          Proposta de Inovação em Bem-Estar a Bordo
        </motion.p>
        <motion.h1 className="hero-title" {...fadeUp(0.25)}>
          Creative Journey<br /><em>by Cléo</em>
        </motion.h1>
        <motion.p className="hero-subtitle" {...fadeUp(0.4)}>
          Laboratório de Arteterapia &amp; Terapias Vibracionais<br />
          <span>Exclusivo para MSC Cruzeiros</span>
        </motion.p>
        <motion.div className="hero-divider" {...fadeUp(0.5)} />
        <motion.p className="hero-desc" {...fadeUp(0.55)}>
          Uma experiência sensorial transformadora em alto-mar — onde a arte encontra a cura.
        </motion.p>
        <motion.a
          href="#conceito"
          className="btn-hero"
          {...fadeUp(0.65)}
          onClick={e => {
            e.preventDefault()
            const t = document.querySelector('#conceito')
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
          }}
        >
          Descobrir o Projeto
        </motion.a>
      </div>
      <div className="hero-scroll">
        <span>Rolar</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

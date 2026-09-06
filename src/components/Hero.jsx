import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="hero" id="hero">
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-aurora-2" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-content">
        <motion.p className="hero-eyebrow" {...fadeUp(0.1)}>
          {h.eyebrow}
        </motion.p>
        <motion.h1 className="hero-title" {...fadeUp(0.25)}>
          Creative Journey<br /><em>by Cléo</em>
        </motion.h1>
        <motion.p className="hero-subtitle" {...fadeUp(0.4)}>
          {h.subtitle}<br />
          <span>{h.exclusivo}</span>
        </motion.p>
        <motion.div className="hero-divider" {...fadeUp(0.5)} />
        <motion.p className="hero-desc" {...fadeUp(0.55)}>
          {h.desc}
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
          {h.btn}
        </motion.a>
      </div>
      <div className="hero-scroll">
        <span>{h.scroll}</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

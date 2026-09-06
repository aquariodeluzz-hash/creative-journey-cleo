import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Sobre.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Sobre() {
  const { t } = useLang()
  const s = t.sobre
  return (
    <section className="sobre" id="sobre">
      <div className="container">
        <div className="sobre-grid">
          <motion.div className="sobre-img-wrap" {...fadeUp(0)}>
            <div className="sobre-img-frame">
              <img
                src="/ws/perfil/WhatsApp Image 2026-08-31 at 09.51.10.jpeg"
                alt="Cleonice Carneiro Meirelles"
                className="sobre-img"
              />
            </div>
            <div className="sobre-img-badge">
              <span>{s.badge1}</span>
              <span>·</span>
              <span>CRTH-BR 20173</span>
            </div>
          </motion.div>

          <motion.div className="sobre-text" {...fadeUp(0.15)}>
            <span className="section-eyebrow">{s.eyebrow}</span>
            <h2 className="section-title">
              Cleonice Carneiro<br /><em>Meirelles</em>
            </h2>
            <p className="sobre-role">{s.role}</p>
            <p className="sobre-bio">{s.bio1}</p>
            <p className="sobre-bio">{s.bio2}</p>
            <div className="sobre-credentials">
              {s.creds.map(c => (
                <div key={c.year} className="credential">
                  <span className="cred-year">{c.year}</span>
                  <span className="cred-desc">{c.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

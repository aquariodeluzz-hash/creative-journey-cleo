import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Depoimentos.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Depoimentos() {
  const { t } = useLang()
  const d = t.depoimentos
  return (
    <section className="depoimentos" id="depoimentos">
      <div className="container">
        <motion.div className="dep-header" {...fadeUp(0)}>
          <span className="section-eyebrow">{d.eyebrow}</span>
          <h2 className="section-title">{d.titleLine1}<br /><em>{d.titleEm}</em></h2>
        </motion.div>

        <div className="dep-grid">
          {d.vozes.map((v, i) => (
            <motion.figure key={i} className="dep-card" {...fadeUp(0.08 * (i + 1))}>
              <span className="dep-mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="dep-quote">{v.quote}</blockquote>
              <figcaption className="dep-caption">
                <span className="dep-autor">{v.autor}</span>
                <span className="dep-contexto">{v.contexto}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

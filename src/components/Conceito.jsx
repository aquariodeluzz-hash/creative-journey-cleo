import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Conceito.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Conceito() {
  const { t } = useLang()
  const c = t.conceito
  return (
    <section className="conceito" id="conceito">
      <div className="container">
        <motion.div className="conceito-header" {...v(0)}>
          <span className="section-eyebrow">{c.eyebrow}</span>
          <h2 className="section-title">{c.titleLine1}<br /><em>{c.titleEm}</em></h2>
        </motion.div>

        <motion.blockquote
          className="conceito-quote"
          {...v(0.1)}
          dangerouslySetInnerHTML={{ __html: c.quote }}
        />

        <div className="pilares-grid">
          {c.pilares.map((p, i) => (
            <motion.div key={i} className="pilar" {...v(i * 0.1)}>
              <span className="pilar-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="fases">
          {c.fases.map((f, i) => (
            <motion.div key={i} className="fase" {...v(i * 0.08)}>
              <span className="fase-num">{f.num}</span>
              <div className="fase-content">
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

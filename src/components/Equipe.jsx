import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Equipe.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Equipe() {
  const { t } = useLang()
  const e = t.equipe
  return (
    <section className="equipe" id="equipe">
      <div className="container">
        <motion.div className="equipe-header" {...v(0)}>
          <span className="section-eyebrow">{e.eyebrow}</span>
          <h2 className="section-title">{e.titleLine1}<br /><em>{e.titleEm}</em></h2>
        </motion.div>

        <div className="equipe-grid">
          {e.membros.map((m, i) => (
            <motion.div key={i} className="equipe-card" {...v(i * 0.12)}>
              <div className="equipe-img-wrap">
                <img src={m.foto} alt={m.nome} />
              </div>
              <div className="equipe-info">
                <h3>{m.nome}</h3>
                <span className="equipe-cargo">{m.cargo}</span>
                <p className="equipe-bio">{m.bio}</p>
                <div className="equipe-tags">
                  {m.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="equipe-contact">
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                  <a href={`tel:${m.tel.replace(/\D/g,'')}`}>{m.tel}</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { workshops } from '../data/workshops'
import WorkshopRow from './WorkshopRow'
import { useLang } from '../i18n/LangContext'
import './Workshops.css'

export default function Workshops() {
  const { t } = useLang()
  const w = t.workshops
  return (
    <section className="workshops" id="workshops">
      <motion.div
        className="workshops-header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-eyebrow">{w.eyebrow}</span>
        <h2 className="section-title">
          {w.titleLine1}<br /><em>{w.titleEm}</em>
        </h2>
        <p className="workshops-intro">{w.intro}</p>
      </motion.div>

      <div className="workshops-list">
        {workshops.map((ws, i) => (
          <WorkshopRow key={ws.id} ws={ws} index={i} />
        ))}
      </div>
    </section>
  )
}

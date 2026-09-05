import { motion } from 'framer-motion'
import { workshops } from '../data/workshops'
import WorkshopRow from './WorkshopRow'
import './Workshops.css'

export default function Workshops() {
  return (
    <section className="workshops" id="workshops">
      <motion.div
        className="workshops-header"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-eyebrow">Programa Sensorial de Bordo</span>
        <h2 className="section-title">
          10 Workshops<br /><em>Exclusivos</em>
        </h2>
        <p className="workshops-intro">
          Cada vivência é uma experiência autônoma, criada para os dias de navegação —
          aproveitando a atmosfera de paz natural do oceano.
        </p>
      </motion.div>

      <div className="workshops-list">
        {workshops.map((ws, i) => (
          <WorkshopRow key={ws.id} ws={ws} index={i} />
        ))}
      </div>
    </section>
  )
}

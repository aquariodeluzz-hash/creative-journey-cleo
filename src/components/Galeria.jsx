import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { galeriaImages } from '../data/workshops'
import './Galeria.css'

const FILTERS = [
  { key: 'all',         label: 'Todas' },
  { key: 'aquarela',   label: 'Aquarela' },
  { key: 'abstrato',   label: 'Abstratos' },
  { key: 'mandala',    label: 'Mandalas' },
  { key: 'silhueta',   label: 'Silhuetas' },
  { key: 'especiarias', label: 'Especiarias' },
]

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
}

export default function Galeria() {
  const [filter, setFilter]   = useState('all')
  const [index,  setIndex]    = useState(-1)

  const filtered = useMemo(
    () => filter === 'all' ? galeriaImages : galeriaImages.filter(i => i.cat === filter),
    [filter]
  )

  const slides = filtered.map(i => ({ src: i.src, title: i.title }))

  return (
    <section className="galeria" id="galeria">
      <div className="container">
        <motion.div className="galeria-header" {...fadeUp}>
          <span className="section-eyebrow">Portfólio de Obras</span>
          <h2 className="section-title">Galeria<br /><em>de Arte</em></h2>
          <p className="galeria-intro">
            Obras produzidas nas vivências do Creative Journey — cada peça carrega
            a frequência do seu criador.
          </p>
        </motion.div>

        <motion.div className="galeria-filters" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="galeria-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                className="gal-item"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIndex(i)}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gal-overlay">
                  <span>{img.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails]}
        captions={{ showToggle: true }}
        thumbnails={{ border: 0, gap: 4 }}
        styles={{
          container: { backgroundColor: 'rgba(18,20,18,0.97)' },
          captionsTitleContainer: { background: 'transparent' },
          captionsTitle: { fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' },
        }}
      />
    </section>
  )
}

import { motion } from 'framer-motion'
import './Sobre.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

const credentials = [
  { year: '1990', desc: 'Licenciatura em Artes Plásticas — Faculdade Marcelo Tupinambá (via USP)' },
  { year: '2007', desc: 'Pós-Graduação em Terapias Alternativas — UNIFRAN (360h)' },
  { year: '2008', desc: 'Radiestesia, Radiônica e Geobiologia — Instituto Luz' },
  { year: '2009', desc: 'Mestrado em Reiki, Nível IIIB — Instituto Luz, São Paulo' },
  { year: '2021', desc: 'Terapeuta Holístico Vibracional — UNIABRATH (600h)' },
]

export default function Sobre() {
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
              <span>Mestra Reikiana</span>
              <span>·</span>
              <span>CRTH-BR 20173</span>
            </div>
          </motion.div>

          <motion.div className="sobre-text" {...fadeUp(0.15)}>
            <span className="section-eyebrow">A Facilitadora</span>
            <h2 className="section-title">
              Cleonice Carneiro<br /><em>Meirelles</em>
            </h2>
            <p className="sobre-role">
              Terapeuta Holística Vibracional · Mestra Reikiana · Professora de Artes Plásticas
            </p>
            <p className="sobre-bio">
              Profissional de Artes Plásticas com sólida formação acadêmica e Terapeuta Holística
              Vibracional com uma trajetória interdisciplinar consolidada ao longo de mais de
              quatro décadas. Especialista na fusão de processos criativos e artísticos com
              modalidades terapêuticas consagradas — especificamente a cromoterapia, a
              aromaterapia e a radiestesia.
            </p>
            <p className="sobre-bio">
              Proponente de laboratórios sensoriais exclusivos para o cenário internacional de
              cruzeiros marítimos premium.
            </p>
            <div className="sobre-credentials">
              {credentials.map(c => (
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

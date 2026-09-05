import { motion } from 'framer-motion'
import './Equipe.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

const membros = [
  {
    nome: 'Cleonice Carneiro Meirelles',
    cargo: 'Expertise — Facilitadora Principal',
    bio: 'Terapeuta Holística Vibracional, Mestra Reikiana e Professora de Artes Plásticas com mais de quatro décadas de trajetória. Proponente do Creative Journey para a MSC Cruzeiros.',
    tags: ['Arteterapia', 'Reiki Nível IIIB', 'Cromoterapia', 'Aromaterapia'],
    email: 'art.cleo@hotmail.com',
    tel: '+55 (11) 96488-2943',
    foto: '/ws/perfil/WhatsApp Image 2026-08-31 at 09.51.10.jpeg',
  },
  {
    nome: 'Suri Meirelles',
    cargo: 'Assistente da Expertise',
    bio: 'Jovem comunicativa e dedicada com sólida vivência em artes visuais, fotografia e artes cênicas. Inglês fluente — pronta para acolher passageiros de todas as nacionalidades.',
    tags: ['Fotografia', 'Teatro', 'Artes Visuais', 'Inglês Fluente'],
    email: 'suri.selina@gmail.com',
    tel: '+55 (15) 99760-5022',
    foto: '/ws/suri/WhatsApp Image 2026-08-31 at 10.09.11 (1).jpeg',
  },
]

export default function Equipe() {
  return (
    <section className="equipe" id="equipe">
      <div className="container">
        <motion.div className="equipe-header" {...v(0)}>
          <span className="section-eyebrow">A Equipe</span>
          <h2 className="section-title">Expertise &amp;<br /><em>Assistência</em></h2>
        </motion.div>

        <div className="equipe-grid">
          {membros.map((m, i) => (
            <motion.div key={i} className="equipe-card" {...v(i * 0.12)}>
              <div className="equipe-img-wrap">
                <img src={m.foto} alt={m.nome} />
              </div>
              <div className="equipe-info">
                <h3>{m.nome}</h3>
                <span className="equipe-cargo">{m.cargo}</span>
                <p className="equipe-bio">{m.bio}</p>
                <div className="equipe-tags">
                  {m.tags.map(t => <span key={t}>{t}</span>)}
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

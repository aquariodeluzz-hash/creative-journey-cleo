import { motion } from 'framer-motion'
import './Depoimentos.css'

/* ─────────────────────────────────────────────────────────
   FONTE ATUAL: frases reais da própria proposta Creative
   Journey (transcrição em /docs/TRANSCRICAO_COMPLETA.md).
   Substituir por depoimentos reais de participantes assim
   que forem coletados — manter mesma estrutura de campos.
   ───────────────────────────────────────────────────────── */
const vozes = [
  {
    quote: 'O universo é puramente dinâmico, emitindo energia e vibrando em frequências contínuas. Nós, seres humanos, funcionamos como receptores biológicos que captam e reagem a essas energias.',
    autor: 'Cleonice Meirelles',
    contexto: 'Manifesto Creative Journey',
  },
  {
    quote: 'Conduzir o passageiro a mudar conscientemente a sua estação interna — afastando-se das frequências da ansiedade moderna para se sintonizar com as frequências restauradoras da alegria e da paz profunda.',
    autor: 'Cleonice Meirelles',
    contexto: 'Objetivo central do projeto',
  },
  {
    quote: 'Pequenos gestos de carinho e arte transformam a viagem em uma jornada inesquecível de conexão e aprendizado.',
    autor: 'Cleonice Meirelles',
    contexto: 'Proposta de Ambientação',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Depoimentos() {
  return (
    <section className="depoimentos" id="depoimentos">
      <div className="container">
        <motion.div className="dep-header" {...fadeUp(0)}>
          <span className="section-eyebrow">Palavras que Guiam</span>
          <h2 className="section-title">Vozes do<br /><em>Projeto</em></h2>
        </motion.div>

        <div className="dep-grid">
          {vozes.map((v, i) => (
            <motion.figure key={i} className="dep-card" {...fadeUp(0.08 * (i + 1))}>
              <span className="dep-mark" aria-hidden="true">“</span>
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

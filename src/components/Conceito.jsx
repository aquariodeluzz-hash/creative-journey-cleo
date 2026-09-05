import { motion } from 'framer-motion'
import './Conceito.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

const pilares = [
  { icon: '◈', title: 'Cromoterapia & Espectro Solar', body: 'Paletas cromáticas selecionadas atuam no sistema nervoso central, estimulando a calma psicológica ou promovendo a vitalidade, criatividade e alegria.' },
  { icon: '◈', title: 'Aromaterapia & Óleos Essenciais', body: 'Aromas botânicos de alta frequência vibracional atuam diretamente no sistema límbico, acessando memórias positivas e facilitando a catarse emocional.' },
  { icon: '◈', title: 'Expressão Artística Terapêutica', body: 'O ato de criar como ferramenta ativa de prevenção e redução do estresse, guiado por orientação técnica e terapêutica especializada.' },
]

const fases = [
  { num: '01', title: 'Sintonização Sensorial e Imersão Aromática', body: 'Combinações exclusivas de óleos essenciais projetadas para desacelerar o ritmo cardíaco e a mente, limpando os ruídos mentais antes da criação.' },
  { num: '02', title: 'Fluxo Cromático e Expressão Artística Plástica', body: 'Os hóspedes manipulam tintas e misturam cores sintonizadas com frequências solares específicas. O foco reside no processo criativo com orientação terapêutica.' },
  { num: '03', title: 'Integração, Paz e Luz', body: 'Reflexão em grupo estruturada. A pintura é levada pelo hóspede como lembrança viva da sua imersão a bordo — uma obra que carrega a sua frequência restaurada.' },
]

export default function Conceito() {
  return (
    <section className="conceito" id="conceito">
      <div className="container">
        <motion.div className="conceito-header" {...v(0)}>
          <span className="section-eyebrow">O Conceito</span>
          <h2 className="section-title">O Laboratório de<br /><em>Bem-Estar</em></h2>
        </motion.div>

        <motion.blockquote className="conceito-quote" {...v(0.1)}>
          "O workshop <strong>Creative Journey</strong> é um laboratório de bem-estar exclusivo
          projetado para os hóspedes da MSC Cruzeiros. O objetivo central é conduzir o passageiro
          a mudar conscientemente a sua <em>'estação interna'</em> — afastando-se das frequências
          da ansiedade moderna, da pressão diária e do esgotamento digital, para se sintonizar
          com as frequências restauradoras da alegria, da paz profunda e do reequilíbrio sistêmico."
        </motion.blockquote>

        <div className="pilares-grid">
          {pilares.map((p, i) => (
            <motion.div key={i} className="pilar" {...v(i * 0.1)}>
              <span className="pilar-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="fases">
          {fases.map((f, i) => (
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

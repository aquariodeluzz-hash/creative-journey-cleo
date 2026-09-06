import { motion } from 'framer-motion'
import './Contato.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

const tableRows = [
  { prof: 'Cleonice Meirelles', cargo: 'Expertise', hora: '€ 100,00/h', total: '€ 500,00' },
  { prof: 'Suri Meirelles', cargo: 'Assistente', hora: '€ 30,00/h', total: '€ 150,00' },
]

export default function Contato() {
  return (
    <section className="contato" id="contato">
      <div className="container">
        <div className="contato-grid">
          <motion.div className="contato-left" {...v(0)}>
            <span className="section-eyebrow">Proposta Comercial</span>
            <h2 className="section-title">Investimento<br /><em>&amp; Contato</em></h2>
            <p className="contato-desc">
              O Creative Journey by Cléo é uma proposta exclusiva desenvolvida para elevar a
              experiência de bem-estar a bordo da MSC Cruzeiros a um novo patamar.
            </p>

            <div className="invest-table">
              <div className="invest-row invest-header">
                <span>Profissional</span>
                <span>Valor/hora</span>
                <span>Por Workshop</span>
              </div>
              {tableRows.map((r, i) => (
                <div key={i} className="invest-row">
                  <span>{r.prof} <em>{r.cargo}</em></span>
                  <span>{r.hora}</span>
                  <span>{r.total}</span>
                </div>
              ))}
              <div className="invest-row invest-subtotal">
                <span>Total por Workshop</span>
                <span></span>
                <span>€ 650,00</span>
              </div>
              <div className="invest-row invest-total">
                <span>Investimento Total<br /><em>10 Workshops + Materiais</em></span>
                <span></span>
                <span>€ 7.000,00</span>
              </div>
              <div className="invest-row invest-note">
                <span><em>*Valor referente a 10 workshops completos de 4 horas de execução + 1 hora de preparação cada, incluindo todos os materiais para 40 pessoas por sessão. Condição especial de lançamento para primeira temporada em navios MSC.</em></span>
              </div>
            </div>
          </motion.div>

          <motion.div className="contato-form-wrap" {...v(0.15)}>
            <form
              className="form"
              action="https://formsubmit.co/art.cleo@hotmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Contato via Creative Journey by Cléo" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="form-group">
                <label>Nome</label>
                <input type="text" name="name" placeholder="Seu nome completo" required />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" name="email" placeholder="seu@email.com" required />
              </div>
              <div className="form-group">
                <label>Organização</label>
                <input type="text" name="organization" placeholder="Ex: MSC Cruzeiros" />
              </div>
              <div className="form-group">
                <label>Mensagem</label>
                <textarea name="message" rows="5" placeholder="Descreva seu interesse no projeto..." required />
              </div>
              <button type="submit" className="btn-submit">Enviar Proposta</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

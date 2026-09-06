import { motion } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import './Contato.css'

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Contato() {
  const { t } = useLang()
  const c = t.contato
  return (
    <section className="contato" id="contato">
      <div className="container">
        <div className="contato-grid">
          <motion.div className="contato-left" {...v(0)}>
            <span className="section-eyebrow">{c.eyebrow}</span>
            <h2 className="section-title">{c.titleLine1}<br /><em>{c.titleEm}</em></h2>
            <p className="contato-desc">{c.desc}</p>

            <div className="invest-table">
              <div className="invest-row invest-header">
                <span>{c.thProfissional}</span>
                <span>{c.thHora}</span>
                <span>{c.thWorkshop}</span>
              </div>
              {c.rows.map((r, i) => (
                <div key={i} className="invest-row">
                  <span>{r.prof} <em>{r.cargo}</em></span>
                  <span>{r.hora}</span>
                  <span>{r.total}</span>
                </div>
              ))}
              <div className="invest-row invest-subtotal">
                <span>{c.totalLabel}</span>
                <span></span>
                <span>€ 650,00</span>
              </div>
              <div className="invest-row invest-total">
                <span>{c.investLabel}<br /><em>{c.investSub}</em></span>
                <span></span>
                <span>€ 7.000,00</span>
              </div>
              <div className="invest-row invest-note">
                <span><em>{c.note}</em></span>
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
                <label>{c.form.nome}</label>
                <input type="text" name="name" placeholder={c.form.nomePlaceholder} required />
              </div>
              <div className="form-group">
                <label>{c.form.email}</label>
                <input type="email" name="email" placeholder={c.form.emailPlaceholder} required />
              </div>
              <div className="form-group">
                <label>{c.form.org}</label>
                <input type="text" name="organization" placeholder={c.form.orgPlaceholder} />
              </div>
              <div className="form-group">
                <label>{c.form.msg}</label>
                <textarea name="message" rows="5" placeholder={c.form.msgPlaceholder} required />
              </div>
              <button type="submit" className="btn-submit">{c.form.submit}</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useLang } from '../i18n/LangContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const { nav } = t

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  const footerLinks = [
    { href: '#sobre',     label: nav.sobre },
    { href: '#conceito',  label: nav.conceito },
    { href: '#workshops', label: nav.workshops },
    { href: '#equipe',    label: nav.equipe },
    { href: '#contato',   label: nav.proposta },
  ]

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-main">Creative Journey</span>
          <span className="footer-logo-sub">by Cléo</span>
          <p>{f.tagline}<br />{f.subtitle}</p>
        </div>

        <div>
          <span className="footer-col-label">{f.navLabel}</span>
          <nav className="footer-links">
            {footerLinks.map(l => (
              <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href) }}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <span className="footer-col-label">{f.contactLabel}</span>
          <div className="footer-contact">
            <p>Cleonice Carneiro Meirelles</p>
            <a href="mailto:art.cleo@hotmail.com">art.cleo@hotmail.com</a>
            <a href="tel:+5511964882943">+55 (11) 96488-2943</a>
            <a href="https://linkedin.com/in/cleonice-meirelles" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{f.copyright}</p>
      </div>
    </footer>
  )
}

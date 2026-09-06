import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LangContext'
import './Navbar.css'

const FLAGS = [
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#sobre',     label: t.nav.sobre },
    { href: '#conceito',  label: t.nav.conceito },
    { href: '#workshops', label: t.nav.workshops },
    { href: '#equipe',    label: t.nav.equipe },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleLink = (e, href) => {
    e.preventDefault()
    scrollTo(href)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={e => handleLink(e, '#hero')}>
            <span className="logo-main">Creative Journey</span>
            <span className="logo-sub">by Cléo</span>
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={e => handleLink(e, l.href)}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#contato" className="nav-cta" onClick={e => handleLink(e, '#contato')}>
                {t.nav.proposta}
              </a>
            </li>
          </ul>

          <div className="nav-lang">
            {FLAGS.map(f => (
              <button
                key={f.code}
                className={`lang-btn${lang === f.code ? ' active' : ''}`}
                onClick={() => setLang(f.code)}
                aria-label={f.label}
                title={f.label}
              >
                <span className="lang-flag">{f.flag}</span>
                <span className="lang-code">{f.label}</span>
              </button>
            ))}
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile" role="dialog" aria-modal="true" aria-label={t.nav.menuLabel}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#contato" onClick={e => handleLink(e, '#contato')}>{t.nav.proposta}</a>
          <div className="nav-mobile-lang">
            {FLAGS.map(f => (
              <button
                key={f.code}
                className={`lang-btn${lang === f.code ? ' active' : ''}`}
                onClick={() => setLang(f.code)}
              >
                {f.flag} {f.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

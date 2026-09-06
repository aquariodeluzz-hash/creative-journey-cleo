import { useState, useEffect, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import './Navbar.css'

const FLAGS = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
]

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)
  const langRef = useRef(null)

  const current = FLAGS.find(f => f.code === lang) ?? FLAGS[0]

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

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    if (!langOpen) return
    const onOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [langOpen])

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

  const pickLang = (code) => {
    setLang(code)
    setLangOpen(false)
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

          {/* Seletor de idioma — dropdown */}
          <div className={`nav-lang-picker${langOpen ? ' is-open' : ''}`} ref={langRef}>
            <button
              className="lang-trigger"
              onClick={() => setLangOpen(o => !o)}
              aria-expanded={langOpen}
              aria-label="Selecionar idioma"
            >
              <span className="lang-flag">{current.flag}</span>
              <svg className="lang-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <ul className="lang-dropdown" role="listbox" aria-label="Idiomas">
              {FLAGS.map(f => (
                <li key={f.code}>
                  <button
                    role="option"
                    aria-selected={lang === f.code}
                    className={`lang-option${lang === f.code ? ' is-active' : ''}`}
                    onClick={() => pickLang(f.code)}
                  >
                    <span>{f.flag}</span>
                    <span>{f.label}</span>
                    {lang === f.code && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
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
                className={`lang-option${lang === f.code ? ' is-active' : ''}`}
                onClick={() => { pickLang(f.code); setMenuOpen(false) }}
              >
                <span>{f.flag}</span>
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { href: '#sobre',     label: 'Sobre' },
  { href: '#conceito',  label: 'Conceito' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#equipe',    label: 'Equipe' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
                Proposta
              </a>
            </li>
          </ul>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
          <a href="#contato" onClick={e => handleLink(e, '#contato')}>Proposta</a>
        </div>
      )}
    </>
  )
}

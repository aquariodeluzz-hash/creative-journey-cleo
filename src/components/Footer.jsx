import './Footer.css'

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-main">Creative Journey</span>
          <span className="footer-logo-sub">by Cléo</span>
          <p>Laboratório de Arteterapia &amp; Terapias Vibracionais<br />Projeto Exclusivo para MSC Cruzeiros</p>
        </div>

        <div>
          <span className="footer-col-label">Navegação</span>
          <nav className="footer-links">
            {['#sobre', '#conceito', '#workshops', '#equipe', '#contato'].map(h => (
              <a key={h} href={h} onClick={e => { e.preventDefault(); scrollTo(h) }}>
                {h.replace('#', '')}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <span className="footer-col-label">Contato</span>
          <div className="footer-contact">
            <p>Cleonice Carneiro Meirelles</p>
            <a href="mailto:art.cleo@hotmail.com">art.cleo@hotmail.com</a>
            <a href="tel:+5511964882943">+55 (11) 96488-2943</a>
            <a href="https://linkedin.com/in/cleonice-meirelles" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Creative Journey by Cléo — Cleonice Carneiro Meirelles · CRTH-BR 20173 (ABRATH)</p>
      </div>
    </footer>
  )
}

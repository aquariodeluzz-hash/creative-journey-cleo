import { useEffect, useState } from 'react'
import './ScrollProgress.css'

const SECTIONS = [
  { id: 'hero',      label: 'Início' },
  { id: 'sobre',     label: 'Sobre' },
  { id: 'conceito',  label: 'Conceito' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'equipe',    label: 'Equipe' },
  { id: 'contato',   label: 'Proposta' },
]

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [active, setActive]     = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.body.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)

      // detecta seção ativa
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(SECTIONS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <div className="scroll-ruler" aria-hidden="true">
      <div className="scroll-ruler-track">
        <div className="scroll-ruler-fill" style={{ height: `${progress * 100}%` }} />
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`scroll-ruler-dot${active === s.id ? ' is-active' : ''}`}
            onClick={() => scrollTo(s.id)}
            title={s.label}
          />
        ))}
      </div>
    </div>
  )
}

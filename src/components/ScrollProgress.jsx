import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import './ScrollProgress.css'

const SECTION_IDS = ['hero', 'sobre', 'conceito', 'workshops', 'equipe', 'contato']

export default function ScrollProgress() {
  const { t } = useLang()
  const sc = t.scroll
  const SECTIONS = [
    { id: 'hero',      label: sc.inicio },
    { id: 'sobre',     label: sc.sobre },
    { id: 'conceito',  label: sc.conceito },
    { id: 'workshops', label: sc.workshops },
    { id: 'equipe',    label: sc.equipe },
    { id: 'contato',   label: sc.proposta },
  ]

  const [progress, setProgress] = useState(0)
  const [active, setActive]     = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.body.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(SECTION_IDS[i])
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

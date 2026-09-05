import { useEffect, useState } from 'react'
import './ThemePicker.css'

const RAYS = [
  { id: 'ray-1', name: 'Azul',    ray: 'I',   virtue: 'Vontade · Poder',      swatch: '#3d5a80' },
  { id: 'ray-2', name: 'Dourado', ray: 'II',  virtue: 'Sabedoria · Amor',     swatch: '#b8955a' },
  { id: 'ray-3', name: 'Rosa',    ray: 'III', virtue: 'Amor Ativo',           swatch: '#b5738a' },
  { id: 'ray-4', name: 'Cristal', ray: 'IV',  virtue: 'Harmonia · Beleza',    swatch: '#c4bfae' },
  { id: 'ray-5', name: 'Verde',   ray: 'V',   virtue: 'Ciência · Cura',       swatch: '#5a7a5a' },
  { id: 'ray-6', name: 'Rubi',    ray: 'VI',  virtue: 'Devoção · Paz',        swatch: '#a04545' },
  { id: 'ray-7', name: 'Violeta', ray: 'VII', virtue: 'Transmutação · Ordem', swatch: '#7a5a8a' },
]

const STORAGE_KEY = 'creative-journey-theme'
const DEFAULT_THEME = 'ray-5'

export default function ThemePicker() {
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial = saved && RAYS.some(r => r.id === saved) ? saved : DEFAULT_THEME
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const pick = (id) => {
    setTheme(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  const current = RAYS.find(r => r.id === theme) ?? RAYS[4]

  return (
    <div className={`theme-picker${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="tp-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`Tema atual: ${current.name}. Abrir seletor de cores.`}
      >
        <span className="tp-toggle-dot" style={{ background: current.swatch }} />
        <span className="tp-toggle-label">
          <span className="tp-toggle-eyebrow">Raio</span>
          <span className="tp-toggle-name">{current.ray} · {current.name}</span>
        </span>
      </button>

      <div className="tp-panel" role="dialog" aria-label="Escolha dos 7 Raios">
        <div className="tp-panel-header">
          <span className="tp-panel-eyebrow">Os 7 Raios</span>
          <span className="tp-panel-title">Escolha a frequência</span>
        </div>
        <ul className="tp-list">
          {RAYS.map(r => (
            <li key={r.id}>
              <button
                type="button"
                className={`tp-item${theme === r.id ? ' is-active' : ''}`}
                onClick={() => pick(r.id)}
                aria-pressed={theme === r.id}
              >
                <span className="tp-swatch" style={{ background: r.swatch }} />
                <span className="tp-item-text">
                  <span className="tp-item-name">
                    <em>{r.ray}</em> · {r.name}
                  </span>
                  <span className="tp-item-virtue">{r.virtue}</span>
                </span>
                <span className="tp-check" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

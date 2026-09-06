import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import './ThemePicker.css'

const SWATCHES = {
  'ray-1': '#3d5a80', 'ray-2': '#b8955a', 'ray-3': '#b5738a',
  'ray-4': '#c4bfae', 'ray-5': '#5a7a5a', 'ray-6': '#a04545',
  'ray-7': '#7a5a8a', 'ray-8': null,
}

const STORAGE_KEY = 'creative-journey-theme'
const DEFAULT_THEME = 'ray-5'

export default function ThemePicker() {
  const { t } = useLang()
  const th = t.theme
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const initial = saved && th.rays.some(r => r.id === saved) ? saved : DEFAULT_THEME
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const pick = (id) => {
    setTheme(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  const current = th.rays.find(r => r.id === theme) ?? th.rays[4]

  return (
    <div className={`theme-picker${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="tp-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={th.openLabel(current.name)}
      >
        <span className={`tp-toggle-dot${theme === 'ray-8' ? ' tp-swatch--uv' : ''}`} style={SWATCHES[theme] ? { background: SWATCHES[theme] } : {}} />
        <span className="tp-toggle-label">
          <span className="tp-toggle-eyebrow">{th.rayLabel}</span>
          <span className="tp-toggle-name">{current.ray} · {current.name}</span>
        </span>
      </button>

      <div className="tp-panel" role="dialog" aria-label={th.panelAriaLabel}>
        <div className="tp-panel-header">
          <span className="tp-panel-eyebrow">{th.panelEyebrow}</span>
          <span className="tp-panel-title">{th.panelTitle}</span>
        </div>
        <ul className="tp-list">
          {th.rays.map(r => (
            <li key={r.id}>
              <button
                type="button"
                className={`tp-item${theme === r.id ? ' is-active' : ''}`}
                onClick={() => pick(r.id)}
                aria-pressed={theme === r.id}
              >
                <span className={`tp-swatch${r.id === 'ray-8' ? ' tp-swatch--uv' : ''}`} style={SWATCHES[r.id] ? { background: SWATCHES[r.id] } : {}} />
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

import { createContext, useContext, useState, useEffect } from 'react'
import { pt, en, es, fr } from './translations'

const LANGS = { pt, en, es, fr }
const STORAGE_KEY = 'cj-lang'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && LANGS[saved]) return saved
    const browser = navigator.language?.slice(0, 2)
    if (browser === 'fr') return 'fr'
    if (browser === 'es') return 'es'
    if (browser === 'en') return 'en'
    return 'pt'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = LANGS[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

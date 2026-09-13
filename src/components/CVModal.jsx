import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CVModal.css'

export default function CVModal({ open, onClose, cvData }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!cvData) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cv-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="cv-panel"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Curriculum Vitae"
          >
            <button className="cv-close" onClick={onClose} aria-label={cvData.close}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="cv-body">
              {/* Cabeçalho */}
              <header className="cv-header">
                <p className="cv-eyebrow">Curriculum Vitae</p>
                <h2 className="cv-name">
                  {cvData.nameLine1}<br /><em>{cvData.nameLine2}</em>
                </h2>
                <p className="cv-title-line">{cvData.titleLine}</p>
              </header>

              {/* Contato */}
              <div className="cv-contact-grid">
                <div className="cv-contact-item">
                  <span className="cv-contact-label">{cvData.contact.emailLabel}</span>
                  <a href={`mailto:${cvData.contact.email}`} className="cv-contact-value">
                    {cvData.contact.email}
                  </a>
                </div>
                <div className="cv-contact-item">
                  <span className="cv-contact-label">{cvData.contact.phoneLabel}</span>
                  <span className="cv-contact-value">{cvData.contact.phone}</span>
                </div>
                {cvData.contact.registroLabel && (
                  <div className="cv-contact-item">
                    <span className="cv-contact-label">{cvData.contact.registroLabel}</span>
                    <span className="cv-contact-value">{cvData.contact.registro}</span>
                  </div>
                )}
                {cvData.contact.linkedinLabel && (
                  <div className="cv-contact-item">
                    <span className="cv-contact-label">{cvData.contact.linkedinLabel}</span>
                    <span className="cv-contact-value">{cvData.contact.linkedin}</span>
                  </div>
                )}
                {cvData.contact.nationalityLabel && (
                  <div className="cv-contact-item">
                    <span className="cv-contact-label">{cvData.contact.nationalityLabel}</span>
                    <span className="cv-contact-value">{cvData.contact.nationality}</span>
                  </div>
                )}
                {cvData.contact.languagesLabel && (
                  <div className="cv-contact-item">
                    <span className="cv-contact-label">{cvData.contact.languagesLabel}</span>
                    <span className="cv-contact-value">{cvData.contact.languages}</span>
                  </div>
                )}
              </div>

              {/* Perfil */}
              <section className="cv-section">
                <h3 className="cv-section-title">{cvData.perfil.title}</h3>
                <p className="cv-paragraph">{cvData.perfil.body}</p>
              </section>

              {/* Competências / Habilidades */}
              {cvData.competencias && (
                <section className="cv-section">
                  <h3 className="cv-section-title">{cvData.competencias.title}</h3>
                  <ul className="cv-competencias">
                    {cvData.competencias.items.map((item) => (
                      <li key={item.label} className="cv-comp-item">
                        <span className="cv-comp-label">{item.label}:</span>
                        <span className="cv-comp-body"> {item.body}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Experiência Profissional (só Cleonice) */}
              {cvData.experiencia && (
                <section className="cv-section">
                  <h3 className="cv-section-title">{cvData.experiencia.title}</h3>
                  {cvData.experiencia.items.map((job) => (
                    <div key={job.cargo} className="cv-job">
                      <div className="cv-job-header">
                        <p className="cv-job-cargo">{job.cargo}</p>
                        <p className="cv-job-meta">{job.local} · {job.periodo}</p>
                      </div>
                      <ul className="cv-bullets">
                        {job.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {/* Idiomas (só Suri) */}
              {cvData.idiomas && (
                <section className="cv-section">
                  <h3 className="cv-section-title">{cvData.idiomas.title}</h3>
                  <ul className="cv-idiomas">
                    {cvData.idiomas.items.map((item) => (
                      <li key={item.lang} className="cv-idioma-item">
                        <span className="cv-idioma-lang">{item.lang}</span>
                        <span className="cv-idioma-level">{item.level}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Formação */}
              {cvData.formacao && (
                <section className="cv-section">
                  <h3 className="cv-section-title">{cvData.formacao.title}</h3>
                  {cvData.formacao.items.map((item) => (
                    <div key={item.titulo} className="cv-edu-item">
                      <div className="cv-edu-header">
                        <p className="cv-edu-titulo">{item.titulo}</p>
                        {(item.inst || item.periodo) && (
                          <p className="cv-edu-meta">
                            {[item.inst, item.periodo].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                      {item.desc && <p className="cv-edu-desc">{item.desc}</p>}
                    </div>
                  ))}
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

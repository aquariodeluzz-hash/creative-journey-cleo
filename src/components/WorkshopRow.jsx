import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, EffectFade, Keyboard } from 'swiper/modules'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import './WorkshopRow.css'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
}

export default function WorkshopRow({ ws, index }) {
  const isAlt = index % 2 !== 0
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = ws.images.map((src, i) => ({
    src,
    title: ws.title.replace(/"/g, ''),
    description: `${ws.tagline} · Obra ${String(i + 1).padStart(2, '0')} de ${String(ws.images.length).padStart(2, '0')}`,
  }))

  const openLightbox = (i) => setLightboxIndex(i ?? active)

  const goTo = (i) => {
    if (!swiperRef.current) return
    swiperRef.current.slideToLoop
      ? swiperRef.current.slideToLoop(i)
      : swiperRef.current.slideTo(i)
  }

  useEffect(() => {
    if (!swiperRef.current) return
    swiperRef.current.params.navigation.prevEl = prevRef.current
    swiperRef.current.params.navigation.nextEl = nextRef.current
    swiperRef.current.navigation?.destroy()
    swiperRef.current.navigation?.init()
    swiperRef.current.navigation?.update()
  }, [])

  return (
    <motion.div
      className={`ws-row${isAlt ? ' ws-row--alt' : ''}`}
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: 0.05 }}
    >
      {/* ── COLUNA DE MÍDIA ── */}
      <div className="ws-media">
        <div className="ws-slider">
          <Swiper
            modules={[Navigation, A11y, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={700}
            loop={ws.images.length > 1}
            keyboard={{ enabled: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={swiper => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            onSwiper={swiper => { swiperRef.current = swiper }}
            onSlideChange={swiper => setActive(swiper.realIndex)}
            className="ws-swiper"
          >
            {ws.images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="ws-slide-wrap">
                  <img
                    src={src}
                    alt={`${ws.title} — obra ${i + 1}`}
                    loading="lazy"
                    onClick={() => openLightbox(i)}
                    className="ws-slide-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {ws.images.length > 1 && (
            <>
              <button ref={prevRef} className="ws-nav ws-nav--prev" aria-label="Foto anterior">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button ref={nextRef} className="ws-nav ws-nav--next" aria-label="Próxima foto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          <button className="ws-expand" onClick={() => openLightbox(active)} aria-label="Ver em tela cheia">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="ws-counter" aria-hidden="true">
            <span className="ws-num-ghost">{ws.num}</span>
          </div>

          {ws.images.length > 1 && (
            <div className="ws-progress" aria-hidden="true">
              <span className="ws-progress-current">{String(active + 1).padStart(2, '0')}</span>
              <span className="ws-progress-sep" />
              <span className="ws-progress-total">{String(ws.images.length).padStart(2, '0')}</span>
            </div>
          )}
        </div>

        {ws.images.length > 1 && (
          <div className="ws-thumbs" role="tablist" aria-label={`Miniaturas — ${ws.title}`}>
            {ws.images.map((src, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Ver obra ${i + 1}`}
                className={`ws-thumb${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTEÚDO ── */}
      <div className="ws-content">
        <span
          className="ws-eyebrow"
          style={{ backgroundColor: ws.color, color: '#fff' }}
        >
          Workshop {ws.num}
        </span>
        <h3 className="ws-title">{ws.title}</h3>
        <p className="ws-tagline">{ws.tagline}</p>

        <div className="ws-details">
          {ws.musica && (
            <div className="ws-detail-row">
              <span className="ws-detail-label">Música</span>
              <span className="ws-detail-val">{ws.musica}</span>
            </div>
          )}
          {ws.aroma && (
            <div className="ws-detail-row">
              <span className="ws-detail-label">Aroma</span>
              <span className="ws-detail-val">{ws.aroma}</span>
            </div>
          )}
          <div className="ws-detail-row">
            <span className="ws-detail-label">Técnica</span>
            <span className="ws-detail-val">{ws.tecnica}</span>
          </div>
          <div className="ws-detail-row">
            <span className="ws-detail-label">Turma</span>
            <span className="ws-detail-val">{ws.capacidade}</span>
          </div>
        </div>

        <div className="ws-phases">
          {ws.acolhimento && (
            <div className="ws-phase">
              <span className="ws-phase-label">Acolhimento</span>
              <p className="ws-phase-text">{ws.acolhimento}</p>
            </div>
          )}
          {ws.desenvolvimento && (
            <div className="ws-phase">
              <span className="ws-phase-label">Desenvolvimento</span>
              <p className="ws-phase-text">{ws.desenvolvimento}</p>
            </div>
          )}
          {ws.encerramento && (
            <div className="ws-phase">
              <span className="ws-phase-label">Encerramento</span>
              <p className="ws-phase-text">{ws.encerramento}</p>
            </div>
          )}
        </div>

        {ws.materiais && ws.materiais.length > 0 && (
          <div className="ws-materiais">
            <span className="ws-materiais-label">Materiais</span>
            <ul className="ws-materiais-list">
              {ws.materiais.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        )}

        {ws.images.length > 1 && (
          <button
            type="button"
            className="ws-gallery-cta"
            onClick={() => openLightbox(active)}
          >
            <span>Ver galeria completa · {ws.images.length} obras</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── LIGHTBOX PREMIUM ── */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails, Counter]}
        captions={{ showToggle: true, descriptionTextAlign: 'center' }}
        thumbnails={{ border: 0, gap: 6, width: 96, height: 68, padding: 4, borderRadius: 2 }}
        counter={{ container: { style: { top: 'unset', bottom: 0, left: 'unset', right: 0 } } }}
        carousel={{ finite: false, preload: 2 }}
        animation={{ fade: 350, swipe: 500 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container:            { backgroundColor: 'rgba(18,20,18,0.97)' },
          root:                 { '--yarl__color_backdrop': 'rgba(18,20,18,0.97)' },
          captionsTitleContainer: { background: 'transparent' },
          captionsTitle:        { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 300, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.02em' },
          captionsDescriptionContainer: { background: 'transparent' },
          captionsDescription:  { fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' },
        }}
      />
    </motion.div>
  )
}

import { useEffect, useRef, useState } from 'react'
import './AudioPlayer.css'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = 0.35
    audio.loop = true

    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true)
      }).catch(() => {
        // autoplay blocked — show button so user can start manually
      })
    }

    // Try immediately; if blocked, try on first user interaction
    tryPlay()
    const onInteract = () => {
      if (!playing) tryPlay()
      window.removeEventListener('click', onInteract)
      window.removeEventListener('keydown', onInteract)
    }
    window.addEventListener('click', onInteract)
    window.addEventListener('keydown', onInteract)

    // Fade in the button after 1s
    const timer = setTimeout(() => setVisible(true), 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', onInteract)
      window.removeEventListener('keydown', onInteract)
    }
  }, [])

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/only-time.mp3" preload="auto" />
      <button
        className={`audio-ball${visible ? ' is-visible' : ''}${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pausar música' : 'Tocar música'}
        title={playing ? 'Pausar' : 'Tocar'}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="4" width="4" height="16" rx="1"/>
            <rect x="15" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4l14 8-14 8V4z"/>
          </svg>
        )}
        <span className="audio-ripple" />
      </button>
    </>
  )
}

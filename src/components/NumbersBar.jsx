import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './NumbersBar.css'

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const duration = 1400
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setVal(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref} className="number-val">{val}{suffix}</span>
}

const items = [
  { target: 10,  suffix: '',   label: 'Workshops Exclusivos' },
  { target: 40,  suffix: '+',  label: 'Anos de Experiência' },
  { target: 3,   suffix: '',   label: 'Modalidades Terapêuticas' },
  { target: 600, suffix: 'h', label: 'Formação Holística' },
]

export default function NumbersBar() {
  return (
    <section className="numbers-bar">
      <div className="numbers-inner">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="number-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Counter target={item.target} suffix={item.suffix} />
            <span className="number-label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

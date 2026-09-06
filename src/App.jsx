import { LangProvider }  from './i18n/LangContext'
import Navbar            from './components/Navbar'
import ScrollProgress    from './components/ScrollProgress'
import Hero              from './components/Hero'
import NumbersBar        from './components/NumbersBar'
import Sobre             from './components/Sobre'
import Conceito          from './components/Conceito'
import Workshops         from './components/Workshops'
import Depoimentos       from './components/Depoimentos'
import Equipe            from './components/Equipe'
import Contato           from './components/Contato'
import Footer            from './components/Footer'
import ThemePicker       from './components/ThemePicker'
import AudioPlayer       from './components/AudioPlayer'

export default function App() {
  return (
    <LangProvider>
      <ThemePicker />
      <ScrollProgress />
      <Navbar />
      <AudioPlayer />
      <Hero />
      <NumbersBar />
      <Sobre />
      <Conceito />
      <Workshops />
      <Depoimentos />
      <Equipe />
      <Contato />
      <Footer />
    </LangProvider>
  )
}

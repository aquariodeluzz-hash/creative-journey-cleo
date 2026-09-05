import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import NumbersBar  from './components/NumbersBar'
import Sobre       from './components/Sobre'
import Conceito    from './components/Conceito'
import Workshops   from './components/Workshops'
import Depoimentos from './components/Depoimentos'
import Equipe      from './components/Equipe'
import Contato     from './components/Contato'
import Footer      from './components/Footer'
import ThemePicker from './components/ThemePicker'

export default function App() {
  return (
    <>
      <ThemePicker />
      <Navbar />
      <Hero />
      <NumbersBar />
      <Sobre />
      <Conceito />
      <Workshops />
      <Depoimentos />
      <Equipe />
      <Contato />
      <Footer />
    </>
  )
}

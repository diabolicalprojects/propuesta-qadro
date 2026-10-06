import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App

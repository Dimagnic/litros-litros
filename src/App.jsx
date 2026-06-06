import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CMSProvider } from '@/context/CMSContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Home from '@/pages/Home'
import Alimentos from '@/pages/Alimentos'
import Hamburguesa from '@/pages/Hamburguesa'
import Eventos from '@/pages/Eventos'
import MenuPromo from '@/pages/MenuPromo'
import CartaCompleta from '@/pages/CartaCompleta'
import Reserva from '@/pages/Reserva'

export default function App() {
  return (
    <CMSProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/alimentos"   element={<Alimentos />} />
            <Route path="/hamburguesa" element={<Hamburguesa />} />
            <Route path="/eventos"     element={<Eventos />} />
            <Route path="/carta"       element={<CartaCompleta />} />
            <Route path="/menu-promo"  element={<MenuPromo />} />
            <Route path="/reserva"     element={<Reserva />} />
            <Route path="/*"           element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </CMSProvider>
  )
}

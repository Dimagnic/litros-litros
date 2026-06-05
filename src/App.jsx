import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CMSProvider } from '@/context/CMSContext'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Toast from '@/components/Toast'
import LoginModal from '@/admin/LoginModal'
import AdminPanel from '@/admin/AdminPanel'
import Home from '@/pages/Home'
import MenuPromo from '@/pages/MenuPromo'
import CartaCompleta from '@/pages/CartaCompleta'
import Reserva from '@/pages/Reserva'
import AlimentoDetalle from '@/pages/AlimentoDetalle'
import EventoDetalle from '@/pages/EventoDetalle'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/menu-promo"          element={<MenuPromo />} />
          <Route path="/carta"               element={<CartaCompleta />} />
          <Route path="/reserva"             element={<Reserva />} />
          <Route path="/alimento/:id"        element={<AlimentoDetalle />} />
          <Route path="/evento/:id"          element={<EventoDetalle />} />
          <Route path="/*"                   element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
      <LoginModal />
      <AdminPanel />
    </>
  )
}

export default function App() {
  return (
    <CMSProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </CMSProvider>
  )
}

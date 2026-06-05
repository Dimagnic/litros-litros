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
import Alimentos from '@/pages/Alimentos'
import Hamburguesa from '@/pages/Hamburguesa'
import Eventos from '@/pages/Eventos'
import CartaCompleta from '@/pages/CartaCompleta'
import MenuPromo from '@/pages/MenuPromo'
import Reserva from '@/pages/Reserva'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/alimentos"  element={<Alimentos />} />
          <Route path="/hamburguesa" element={<Hamburguesa />} />
          <Route path="/eventos"    element={<Eventos />} />
          <Route path="/carta"      element={<CartaCompleta />} />
          <Route path="/menu-promo" element={<MenuPromo />} />
          <Route path="/reserva"    element={<Reserva />} />
          <Route path="/*"          element={<Home />} />
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

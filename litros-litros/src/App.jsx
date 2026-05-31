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
import Menu from '@/pages/Menu'
import Karaoke from '@/pages/Karaoke'
import Events from '@/pages/Events'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/menu"     element={<Menu />} />
          <Route path="/karaoke"  element={<Karaoke />} />
          <Route path="/eventos"  element={<Events />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
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

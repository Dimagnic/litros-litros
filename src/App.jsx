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

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/*" element={<Home />} />
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>
)

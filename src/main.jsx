import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/global.css'
import Navbar from './components/navbar/navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
  </StrictMode>,
)

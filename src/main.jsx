import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/global.css'
import Navbar from './components/navbar/navbar.jsx'
import Carousel from './components/carousel/carousel.jsx'
import Schedule from './components/schedule/schedule.jsx'
import Sponsors from './components/sponsors/sponsors.jsx'
import Footer from './components/footer/footer.jsx'
// import Slides from './data/slides.json'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Carousel/>
    <Schedule/>
    <Sponsors />
    <Footer />
  </StrictMode>
)

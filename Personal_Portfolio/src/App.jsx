import { useEffect } from 'react'
import './App.css'
import AboutSection from './components/AboutSection'
import Header from './components/Header'
import Hero_section from './components/Hero_section'
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectsSection from './components/Project'
import Footer from './components/Footer'




function App() {
useEffect(() => {
  AOS.init({ duration: 1200, once: true });
}, []);

  return (
<>
<Header/>
<Hero_section/>
<AboutSection/>
<ProjectsSection/>
<Footer/>
</>
  )
}

export default App

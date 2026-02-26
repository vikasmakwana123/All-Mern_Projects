import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import MusicUpload from './pages/MusicUpload.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginForm from './components/LoginForm.jsx'

import './App.css'


function App() {
  return (
    <Routes>
      
      <Route path='/auth/upload' element={<MusicUpload/>}/>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
  )
}

export default App

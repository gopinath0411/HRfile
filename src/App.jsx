import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AppointmentLetterForm from './appointment'
import Forms from './forms'
import LoginPage from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/forms' element={<Forms />} />
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App

import React from 'react'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'

export function App() {
  return (
  <div>
    
    <Nav></Nav>
    
    <main>
      <Routes>
        <Route path={'/'} element={<Home />}/>
      </Routes>
    </main>

    <Footer />
  </div>
  )
}

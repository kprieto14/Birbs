import React from 'react'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { AddBird } from './pages/AddBird'
import { BirdCageList } from './pages/BirdCageList'

export function App() {
  return (
  <div>
    
    <Nav />
    
    <main>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/birdcage-list'} element={<BirdCageList />}/>
        <Route path={'/add-bird'} element={<AddBird />}/>
      </Routes>
    </main>

    <Footer />
  </div>
  )
}

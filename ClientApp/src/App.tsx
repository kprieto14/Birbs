import React from 'react'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { AddBird } from './pages/AddBird'
import { BirdCageList } from './pages/BirdCageList'
import { Register } from './pages/Register'
import { SignIn } from './pages/SignIn'
import { EditBird } from './pages/EditBird'
import { ErrorPage } from './pages/404page'

export function App() {
  return (
    <div className='app'>
      
        <Nav />
        
        <div className='background-image'>
          <Routes>
            <Route path={'/'} element={<Home />}/>
            <Route path={'/birdcage-list'} element={<BirdCageList />}/>
            <Route path={'/add-bird'} element={<AddBird />}/>
            <Route path={'/edit-bird/:id'} element={<EditBird />}/>
            <Route path={'/login'} element={<SignIn />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'*'} element={<ErrorPage />}/>
            {/* <Route path={'/followers'} element={<Follow />} /> */}
          </Routes>
        </div>

        <Footer />
    </div>
  )
}

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'
import { AddBird } from './pages/AddBird'
import { BirdCageList } from './pages/BirdCageList'
import { Register } from './pages/Register'
import { SignIn } from './pages/SignIn'
import { EditBird } from './pages/EditBird'
import { ErrorPage } from './pages/404page'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from 'react-bootstrap'

export function App() {
  const { isLoading } = useAuth0()

  return (
    <div className='app'>
      
        <Nav />
        
      {
        // I need a PageLoader component here, would cool to have a bird animation here
        isLoading && (
          <div>
            <Spinner animation="border" variant="info" aria-label='Loading for login'/>
          </div>
        )
      }

        <div className='background-image'>
          <Routes>
            <Route path={'/'} element={ <Home /> }/>
            <Route path={'/birdcage-list'} element={ <BirdCageList /> }/>
            <Route path={'/add-bird'} element={ <AddBird /> }/>
            <Route path={'/edit-bird/:id'} element={ <EditBird /> }/>
            <Route path={'/login'} element={ <SignIn /> } />
            <Route path={'/register'} element={ <Register /> } />
            <Route path={'*'} element={ <ErrorPage /> }/>
            {/* <Route path={'/followers'} element={<Follow />} /> */}
          </Routes>
        </div>

        <Footer />
    </div>
  )
}

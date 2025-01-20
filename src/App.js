import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Loading from './pages/Loading/Loading'
import './style/App.css'

const Home = React.lazy(() => import('./pages/Home/Home'))
const Login = React.lazy(() => import('./pages/Signup&Login/Login/Login'))
const Signup = React.lazy(() => import('./pages/Signup&Login/Signup/Signup'))
const Signout = React.lazy(() => import('./pages/Signup&Login/Signout/Signout'))
const Profile = React.lazy(() => import('./pages/Profile/Profile'))

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-out" element={<Signout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  )
}

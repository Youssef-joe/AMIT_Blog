import React from 'react'
import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Projects/Home'
import About from './Projects/About'
import Projects from './Projects/Projects'
import SignIn from './Projects/SignIn'
import SignUp from './Projects/SignUp'
import Dashboard from './Projects/Dashboard'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

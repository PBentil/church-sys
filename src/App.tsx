// import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Members from './pages/Member'
import Diocese from './pages/Diocese'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/members' element={<Members />} />
      <Route path='/diocese' element={<Diocese />} />
    </Routes>
    </>
  )
}

export default App

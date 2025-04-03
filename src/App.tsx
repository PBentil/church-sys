
// import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from "./pages/admin/Dashboard.tsx";
import Members from "./pages/admin/Member.tsx";
import Events from "./pages/admin/event.tsx";

function App() {


  return (
      <>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/members' element={<Members />} />
          <Route path='/events' element={<Events />} />
        </Routes>
      </>
  )
}

export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Profile from '@/Pages/Profile'
import Home from '@/Pages/Home'
// import Home from '@Pages/Home'
// import Thread from '@/components/Thread'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/:username/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

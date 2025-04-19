
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Profile from '@/Pages/Profile'


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/:username/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

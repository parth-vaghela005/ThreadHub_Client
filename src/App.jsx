import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Profile from '@/Pages/Profile'
import Home from '@/Pages/Home'
import ImageCaptionCard from '../src/Pages/ImageCaptionCard'
import CreatePostModal from '.././src/Pages/CreatePostModal'
// import {CreatePostModal} from '@Pages/CreatePostModal'
// import ImageCaptionCard from '@Pages/ImageCaptionCard'
// import Home from '@Pages/Home'
// import Thread from '@/components/Thread'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />    
        <Route path="create-post" element={<CreatePostModal />} />
        <Route path="/:username/profile" element={<Profile />} />
        <Route path="/generate" element={<ImageCaptionCard />} />
      </Route>
    </Routes>
  )
}

export default App

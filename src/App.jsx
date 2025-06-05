  import React from 'react'
  import { Routes, Route } from 'react-router-dom'
  import MainLayout from '@/layout/MainLayout'
  import Profile from '@/Pages/Profile'
  import Home from '@/Pages/Home'
  import ImageCaptionCard from '../src/Pages/ImageCaptionCard'
  import CreatePostModal from '.././src/Pages/CreatePostModal'
  import SignupForm from '../src/Pages/SignupForm'
import LoginForm from '../src/Pages/LoginForm'
import { useSelector } from 'react-redux';
import CommentSection from '../src/Pages/CommentSection'
import EditProfile from '../src/Pages/EditProfile'
  function App() {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />    
          <Route path="create-post" element={<CreatePostModal />} />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/profile/EditProfile" element={<EditProfile />} />
          <Route path="/generate" element={<ImageCaptionCard />} />
          <Route path="/post/:Id" element={<CommentSection />} />
          </Route>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        </Routes>
    )
  }
    export default App

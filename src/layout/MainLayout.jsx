import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar' // Assuming you're using alias

function MainLayout() {
  return (
    <div className="flex">
    <Sidebar />     
    <Outlet />         
  </div>
  )
}

export default MainLayout


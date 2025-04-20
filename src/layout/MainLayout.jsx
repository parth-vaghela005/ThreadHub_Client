import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '@/components/Sidebar' // Assuming you're using alias

function MainLayout() {

  return (

    <>
     <div className="flex">
    <Sidebar />    
    <div className="ml-64 "> 
    <Outlet />
  </div> 
    {/* <Outlet />          */}
  </div>
 =
    </>
   

  )
}

export default MainLayout


import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import FollowSuggestion from '../Pages/FollowSuggestion'

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed or sticky */}
      <div className="w-64 fixed h-full z-10">
        <Sidebar />
      </div>
      <div className="ml-64 flex w-full justify-between">
        <div className="flex-1 max-w-[700px] border-x border-gray-700 min-h-screen">
          <Outlet />
        </div>
        <div className="hidden xl:block w-[300px] p-4">
          <FollowSuggestion />
        </div>
      </div>
    </div>
  )
}
export default MainLayout

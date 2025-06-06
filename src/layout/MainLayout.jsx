import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import FollowSuggestion from '../Pages/FollowSuggestion';
import { HiOutlineMenu } from 'react-icons/hi';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex w-full min-h-screen bg-[#16181c] text-white">
      {/* Sidebar toggle button for small/medium screens */}
      <button
        className="fixed top-4 left-4 z-60 block lg:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <HiOutlineMenu size={28} />
      </button>

      {/* Sidebar (fixed on large screens, overlay on small) */}
      {/* Large screens: sidebar fixed on left */}
      <aside className="w-64 hidden lg:block fixed top-0 left-0 h-screen border-r border-gray-800 bg-[#16181c] z-50">
        <Sidebar />
      </aside>

      {/* Sidebar overlay for small screens */}
      {sidebarOpen && (
        <>
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Sidebar drawer */}
          <aside className="fixed top-0 left-0 w-64 h-screen bg-[#16181c] border-r border-gray-800 z-60 p-6 overflow-auto">
            <Sidebar onClose={closeSidebar} />
          </aside>
        </>
      )}

      {/* Main content + right suggestion */}
      <main className={`flex flex-1 flex-col lg:ml-64 w-full lg:flex-row justify-between`}>
        {/* Center Feed */}
        <section className="flex-1 w-full max-w-full lg:max-w-[700px] border-x border-gray-700 min-h-screen px-4 py-6 bg-[#16181c]">
          <Outlet />
        </section>

        {/* Follow Suggestion - right sidebar on xl and above */}
        <aside className="hidden xl:block w-[300px] p-4 bg-[#16181c] border-l border-gray-800 min-h-screen">
          <FollowSuggestion />
        </aside>
      </main>
    </div>
  );
}

export default MainLayout;

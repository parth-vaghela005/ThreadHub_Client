import React, { useState } from 'react'
import { MdHomeFilled } from 'react-icons/md'
import { Search } from 'lucide-react'
import { CgProfile } from "react-icons/cg"
import { CiBookmark } from "react-icons/ci"
import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'
// import {CreatePostModal }from 'Pages/CreatePostModal'
// import CreatePostModal from './CreatePostModal'  
import CreatePostModal from '../Pages/CreatePostModal'

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const user = {
    username: "Parth_Vaghela09",
  }

  const profileUrl = `/${user.username.replaceAll(" ", "_").toLowerCase()}/profile`

  function MenuItem({ icon, label }) {
    return (
      <div className="flex items-center font-bold gap-4 p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-150">
        {icon}
        <span className="text-lg font-medium">{label}</span>
      </div>
    )
  }

  return (
    <>
      <div className="sidebar fixed left-0 top-0 flex flex-col justify-between h-screen w-64 border-r border-gray-800 text-white p-6">
        {/* Top Menu */}
        <div className="menus flex flex-col gap-2.5">
          <Link to={`/home`}>
            <MenuItem icon={<MdHomeFilled size={30} />} label="Home" />
          </Link>

          <MenuItem icon={<Search size={30} />} label="Search" />

          <Link to={profileUrl}>
            <MenuItem icon={<CgProfile size={30} />} label="Profile" />
          </Link>

          {/* Post Button */}
          <div onClick={() => setIsModalOpen(true)}>
            <MenuItem icon={<CirclePlus size={30} />} label="Post" />
          </div>

          <MenuItem icon={<CiBookmark size={30} />} label="Bookmarks" />
        </div>

        {/* Bottom Profile Info */}
        <div className="bottom mt-auto flex flex-row gap-3 items-center hover:bg-gray-800 transition-all duration-150 rounded-full cursor-pointer">
          <div className="flex items-center font-bold gap-4 p-3 rounded-full cursor-pointer">
            <div className='h-[50px] w-[50px] rounded-full'>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
                className='h-full w-full rounded-full flex justify-center items-center'
                alt="profile"
              />
            </div>
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-[15px] text-white">parth vaghela</span>
            <span className="text-[12px] font-medium text-gray-600">@parth vaghela</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Sidebar

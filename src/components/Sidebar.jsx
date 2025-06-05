import React, { useEffect, useState } from 'react'
import { MdHomeFilled } from 'react-icons/md'
import { Search } from 'lucide-react'
import { CgProfile } from "react-icons/cg"
import { CiBookmark } from "react-icons/ci"
import { CirclePlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';        
import { toast } from 'sonner'
import { logout } from '../redux/slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import axios  from 'axios'
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const user = useSelector((state) => state.author.user);
const profileUrl = `/${user.username.replaceAll(" ", "_").toLowerCase()}/profile`
 function MenuItem({ icon, label }) {
    return (
      <div className="flex items-center font-bold gap-4 p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-150">
        {icon}
        <span className="text-lg font-medium">{label}</span>
      </div>
    )
  }
const HandleLogout = async() =>{
  const res  = await axios.get('http://localhost:5000/api/v1/auth/logout',{
    withCredentials: true,
  })
  if(res.data.success){
    dispatch(logout())
    toast.success(res.data.message)
    navigate('/login')
  }    
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
          <Link   to={`/create-post`}>
            <MenuItem icon={<CirclePlus size={30} />} label="Post" />
          </Link>
          {/* <div className="bg-blue-500  text-white"> */}
          <MenuItem icon={<CiBookmark  className='text-pink-300 bg-pink-200 w-6 h-6" ' size={30} />} label="Bookmarks" />
      {/* </div> */}
      
        </div>
        <div className="bottom mt-auto flex flex-row gap-3 items-center hover:bg-gray-800 transition-all duration-150 rounded-full cursor-pointer">
      {/* Profile Image Container */}
      <div className="flex items-center gap-4 p-3 rounded-full cursor-pointer">
        {/* <div className="h-[50px] w-[50px] rounded-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div> */}
      </div>
      <div className="flex flex-col gap-0">
        <button
          className="flex items-center text-white"
          onClick={HandleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
      </div>
    </>
  )
}export default Sidebar

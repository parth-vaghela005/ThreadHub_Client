import React from 'react'
import { MdHomeFilled } from 'react-icons/md'
import { Search } from 'lucide-react';
import { CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function Sidebar() {
   
const user  = {
  username: "Parth_Vaghela09",
  
}
    function MenuItem({ icon, label }) {
        return (
          <div className="flex items-center font-bold gap-4 p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-150">
            {icon}
            <span className="text-lg font-medium">{label}</span>
          </div>
        )
      }
  return (
    <div className="sidebar flex flex-col justify-between h-screen w-64 border-r border-gray-800  text-white p-6">
      {/* Top Menu */}
      <div className="menus flex flex-col gap-2.5">
        <MenuItem icon={<MdHomeFilled size={30} />} label="Home" />
        <MenuItem icon={<Search size={30} />} label="Search" />
        <Link to={`/${user.username.replaceAll(" ", "_").toLowerCase()}/profile`}>
        <MenuItem icon={<CgProfile size={30} />} label="Profile" />
        </Link>
        
        <MenuItem icon={<CirclePlus size={30} />} label="Post" />
        <MenuItem icon={<CiBookmark size={30} />} label="Bookmarks" />
        

        {/* <MenuItem icon={<MdHomeFilled size={30} />} label="Settings" />
        <MenuItem icon={<MdHomeFilled size={30} />} label="Messages" />
        <MenuItem icon={<MdHomeFilled size={30} />} label="Notifications" /> */}

      
      </div>

      {/* Bottom Menu (or footer links, logout, etc.) */}
      <div className="bottom mt-auto flex flex-row gap-3 items-center  hover:bg-gray-800 transition-all duration-150 rounded-full cursor-pointer">
      <div className="flex items-center font-bold gap-4 p-3 rounded-full cursor-pointer">
        
      <div className='   h-[50px] w-[50px] rounded-full'> 
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" className='h-full w-full rounded-full flex justify-center items-center' alt="" />
    </div>
        
          
          </div>
          <div className='flex flex-col gap-0'>
            <span className="text-[15px]  text-white">
                parth vaghela
            </span>
            <span className="text-[12px] font-medium text-gray-600">
                @parth vaghela
            </span>
          </div>
      </div>
    </div>
  )
}
export default Sidebar

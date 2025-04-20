import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { MapPin } from 'lucide-react';
import { CalendarRange } from 'lucide-react';

function Profile() {
  const { username } = useParams()
  const [bio, setBio] = useState("");
  // setBio("")
  const user = {
    isAuthorizes: true,
    isFollow: false
  }
  
  return (
    <>
      <div className='profile text-white w-[700px]    border-gray-600'>
        <div className='header flex gap-7  px-3 py-3 cursor-pointer '>
          <Link to={`/`}>
          <IoIosArrowRoundBack size={40} className='back  hover:bg-gray-800  rounded-full  ' />
          </Link>
         
          <div className='flex flex-col gap-0'>
            <p className='text-[20px] font-bold'>
              {username}
            </p>
            <p className='text-[14px] font-medium text-gray-500'>
              0 post
            </p>
          </div>
        </div>
        <div className="cover_image bg-gray-700 h-60   overflow-hidden ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
            alt="Cover"
            className="w-full h-full "
          />
        </div>

        <div className='main'>
          <div className='1  flex justify-between px-5 items-center '>
            <div className='   h-[130px] w-[130px] border-4 mt-[-65px] border-black rounded-full'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" className='h-full w-full rounded-full flex justify-center items-center' alt="" />
            </div>
            <div>
              {
                user.isAuthorizes ? (<button className='border-[1px]  hover:bg-gray-900 rounded-full cursor-pointer px-5 py-2 font-bold' style={{ borderColor: 'rgb(83, 100, 113)' }}>
                  Edit Profile
                </button>) : (<button className='border-[1px]  hover:bg-gray-900 rounded-full cursor-pointer px-5 py-2 font-bold' style={{ borderColor: 'rgb(83, 100, 113)' }}>
                  {
                    user.isFollow ? <p>Following</p> : <p >Follow</p>
                  }
                </button>)
              }
            </div>
          </div>
<div className='2 flex flex-col  px-5 mt-3 gap-0'>
<p className='text-[20px] font-bold '>
parth vaghela
</p>
<p className=''  style={{ color: 'rgb(113, 118, 123)' }}>
@Parth_vaghela09
</p>
</div>
<div className='3  text-[#71767b] whitespace-pre-line mt-4 px-5 '>
  Parth Vaghela | Coder
  
{
  // bio.trim() === "" ? <p className='text-gray-500'></p> : <p className='text-gray-500'>{bio}</p>
}
</div>
<div className='4 mt-3 flex items-center gap-4   px-5 '>
<div className='location flex gap-1.5 items-center '>
<MapPin size={20} className='text-gray-500'/>
<span className='text-gray-500 text-[15px]'>
  Bhavnagar
</span>
</div>
<div className='join flex gap-1.5 items-center'>

< CalendarRange size={20} className='text-gray-500'/>
<span className='text-gray-500 text-[15px]'>
  Joined November 2023
</span>
</div>

</div>
<div className='5 flex gap-10 mt-3 px-5 '>
  <div className='follower flex items-center hover:underline cursor-pointer'>
       <span className='font-bold text-[#71767b] ' >3</span>
        <span className='text-[#71767b] text-[14px] pl-1 '>Follower</span>
  </div>
  <div className='follower flex items-center hover:underline cursor-pointer'>
       <span className='font-bold text-[#71767b] ' >5</span>
        <span className='text-[#71767b] text-[14px] pl-1 '>Following</span>
  </div>

</div>
<div className='6 mt-8'>

<div >
  <Link  to={`/${username}/posts`} className='cursor-pointer border-b-1 border-gray-600  hover:bg-gray-800 px-7 py-5   font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
      Posts
    </span>
  </Link>
  <Link  to={`/${username}/posts`} className='cursor-pointer   border-b-1 border-gray-600 hover:bg-gray-800 px-8 py-5  font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
      Replies
    </span>
  </Link>
  <Link  to={`/${username}/posts`} className='cursor-pointer   border-b-1 border-gray-600 hover:bg-gray-800 px-8 py-5   font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
     Highlights
    </span>
  </Link>
  <Link  to={`/${username}/posts`} className='cursor-pointer  border-b-1 border-gray-600  hover:bg-gray-800 px-8 py-5  font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
      Articles
    </span>
  </Link>
  <Link  to={`/${username}/posts`} className='cursor-pointer   border-b-1 border-gray-600 hover:bg-gray-800 px-8 py-5   font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
      Media
    </span>
  </Link>
  <Link  to={`/${username}/posts`} className='cursor-pointer  border-b-1 border-gray-600  hover:bg-gray-800 px-8 py-5   font-bold '>
  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500  '>
      Likes
    </span>
  </Link>

    
</div>

</div>
        </div>

      </div>
    </>

  )
}
export default Profile

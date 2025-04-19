import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

function Profile() {
  const { username } = useParams()
  const [bio, setBio] = useState("");
  const user = {
    isAuthorizes: true,
    isFollow: false
  }
  
  return (
    <>
      <div className='profile text-white w-[700px] border-r-2 border-r-gray-600'>
        <div className='header flex gap-7 border-b-gray-600 border-b-2 px-3 py-3 cursor-pointer '>
          <Link to={`/`}>
          <IoIosArrowRoundBack size={40} className='back  hover:bg-gray-800  rounded-full  ' />
          </Link>
         
          <div className='flex flex-col gap-0'>
            <p className='text-[20px] font-bold'>
              {username}
            </p>
            <p className='text-[14px] font-medium text-gray-600'>
              0 post
            </p>
          </div>
        </div>
        <div className="cover_image bg-gray-700 h-60   overflow-hidden rounded-md">
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
                    user.isFollow ? (<p>Following</p>) : (<p >Follow</p>)
                  }


                </button>)
              }
            </div>
          </div>
<div className='2 flex flex-col  px-5 mt-4 gap-0'>
<p className='text-[20px] font-bold '>
parth vaghela
</p>
<p className=''  style={{ color: 'rgb(113, 118, 123)' }}>
@Parth_vaghela09
</p>
</div>
<div className='whitespace-pre-line mt-4 px-5 '>
  Parth Vaghela | B.C.A | Coder
</div>
        </div>

      </div>
    </>

  )
}

export default Profile

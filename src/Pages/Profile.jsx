import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { MapPin, CalendarRange } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Thread from "../components/Thread";

function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const loggedin = useSelector((state) => state.author.user);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/auth/user/${username}`);
        setUser(res.data.user);
        console.log(res.data.user);
        setPosts(res.data.user.posts || []);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [username]);
console.log(posts , "posts");

  const formatJoinDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="">
      <div className='profile text-white w-[700px] border-gray-600'>
        {/* Header */}
        <div className='header flex gap-7 px-3 py-3 cursor-pointer'>
          <Link to={`/`}>
            <IoIosArrowRoundBack size={40} className='back hover:bg-gray-800 rounded-full' />
          </Link>
          <div className='flex flex-col gap-0'>
            <p className='text-[20px] font-bold'>{user.name || "User"}</p>
            <p className='text-[14px] font-medium text-gray-500'>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="cover_image bg-gray-700 h-60 overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Main Section */}
        <div className='main'>
          <div className='1 flex justify-between px-5 items-center'>
            <div className='h-[130px] w-[130px] border-4 mt-[-65px] border-black rounded-full overflow-hidden'>
              <img src={user.profilePic} alt="Profile" className='w-full h-full object-cover' />
            </div>
            <div>
              {user.username === loggedin?.username ? (
                <Link to="/profile/EditProfile" >
                <button className='border hover:bg-gray-900 rounded-full cursor-pointer px-5 py-2 font-bold' style={{ borderColor: 'rgb(83, 100, 113)' }}>
                  Edit Profile
                </button>
                 </Link>
              ) : (
                <button className='border hover:bg-gray-900 rounded-full cursor-pointer px-5 py-2 font-bold' style={{ borderColor: 'rgb(83, 100, 113)' }}>
                  {user.isFollow ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>

          {/* Name and Username */}
          <div className='2 flex flex-col px-5 mt-3 gap-0'>
            <p className='text-[20px] font-bold'>{user.name}</p>
            <p className='text-[15px]' style={{ color: 'rgb(113, 118, 123)' }}>@{user.username}</p>
          </div>

          {/* Bio */}
          {user.bio?.trim() && (
            <div className='3 text-[#71767b] whitespace-pre-line mt-4 px-5'>
              <p className='text-gray-500'>{user.bio}</p>
            </div>
          )}

          {/* Location & Join Date */}
          <div className='4 mt-3 flex items-center gap-4 px-5'>
            {user.location?.trim() && (
              <div className='location flex gap-1.5 items-center'>
                <MapPin size={20} className='text-gray-500' />
                <span className='text-gray-500 text-[15px]'>{user.location}</span>
              </div>
            )}
            {user.createdAt && (
              <div className='join flex gap-1.5 items-center'>
                <CalendarRange size={20} className='text-gray-500' />
                <span className='text-gray-500 text-[15px]'>
                  Joined {formatJoinDate(user.createdAt)}
                </span>
              </div>
            )}
          </div>

          {/* Followers and Following */}
          <div className='5 flex gap-10 mt-3 px-5'>
            <div className='follower flex items-center hover:underline cursor-pointer'>
              <span className='font-bold text-[#71767b]'>{user.followers?.length || 0}</span>
              <span className='text-[#71767b] text-[14px] pl-1'>Follower</span>
            </div>
            <div className='follower flex items-center hover:underline cursor-pointer'>
              <span className='font-bold text-[#71767b]'>{user.following?.length || 0}</span>
              <span className='text-[#71767b] text-[14px] pl-1'>Following</span>
            </div>
          </div>

          {/* Tabs */}
          <div className='6 mt-8'>
            <div className='flex'>
              {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(tab => (
                <Link
                  key={tab}
                  to={`/${username}/posts`}
                  className='cursor-pointer border-b border-gray-600 hover:bg-gray-800 px-7 py-5 font-bold'
                >
                  <span className='text-[#71767b] hover:border-b-4 pb-3 border-b-blue-500'>{tab}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className='7 px-0 mt-4'>
          {posts.map((post, index) => (
            <Thread key={index} post={post} display={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;

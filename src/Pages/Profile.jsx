import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MapPin, CalendarRange } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Thread from '../components/Thread';

function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.author.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/auth/user/${username}`);
        setUser(res.data.user);
        setPosts(res.data.user.posts || []);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, [username]);

  const formatJoinDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="bg-[#16181c] min-h-screen w-full text-white pb-10">
      <div className="max-w-[700px] w-full mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <Link to="/home">
            <IoIosArrowRoundBack
              size={35}
              className="hover:bg-gray-800 p-1 rounded-full"
            />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{user.name || 'User'}</h1>
            <p className="text-gray-500 text-sm">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full h-48 bg-gray-700 overflow-hidden rounded-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info Row */}
        <div className="flex justify-between items-center mt-[-40px] px-1">
          {/* Profile Pic */}
          <div className="w-28 h-28 rounded-full border-4 border-[#16181c] overflow-hidden bg-black">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Button */}
          {user.username === loggedInUser?.username ? (
            <Link to="/profile/EditProfile">
              <button className="border border-gray-600 px-4 py-1.5 rounded-full font-semibold hover:bg-gray-900">
                Edit Profile
              </button>
            </Link>
          ) : (
            <button className="border border-gray-600 px-4 py-1.5 rounded-full font-semibold hover:bg-gray-900">
              {user.isFollow ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* Name & Username */}
        <div className="mt-4">
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio?.trim() && (
          <p className="text-gray-400 mt-3 whitespace-pre-line">{user.bio}</p>
        )}

        {/* Location & Join Date */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 mt-4 text-sm">
          {user.location?.trim() && (
            <div className="flex items-center gap-1">
              <MapPin size={18} />
              <span>{user.location}</span>
            </div>
          )}
          {user.createdAt && (
            <div className="flex items-center gap-1">
              <CalendarRange size={18} />
              <span>Joined {formatJoinDate(user.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Followers */}
        <div className="flex gap-6 mt-3 text-sm">
          <div className="hover:underline cursor-pointer text-gray-400">
            <span className="font-bold text-white">{user.followers?.length || 0}</span> Followers
          </div>
          <div className="hover:underline cursor-pointer text-gray-400">
            <span className="font-bold text-white">{user.following?.length || 0}</span> Following
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-700">
          <div className="flex flex-wrap">
            {['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'].map((tab) => (
              <Link
                key={tab}
                to={`/${username}/posts`}
                className="px-4 py-3 text-sm font-semibold text-gray-400 hover:text-blue-500"
              >
                {tab}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="mt-4 space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Thread key={index} post={post} display={true} />
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

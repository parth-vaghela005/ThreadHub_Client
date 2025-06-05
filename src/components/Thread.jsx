import React, { useState } from 'react';
import {
  MdOutlineDeleteOutline,
  MdFavoriteBorder,
  MdOutlineBookmarkBorder,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
// import { FaBookmark } from "react-icons/fa";
import { FaHeart, FaRegCommentDots } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LikeAnsDisLike from '../Api/LikeAnsDisLike.js';

const Thread = ({ post, display = false }) => {
  const user = useSelector((state) => state.author.user);
  const userId = user?._id;
  const [likes, setLikes] = useState(post?.likes || []);
  const handleLike = async (id) => {
    if (!userId || !post?._id) return;
    try {
      const res = await LikeAnsDisLike(id);
      if (likes.includes(userId)) {
        setLikes((prev) => prev.filter((uid) => uid !== userId));
      } else {
        setLikes((prev) => [...prev, userId]);
      }
      console.log('Like/Dislike Response:', res);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  const defaultProfilePic =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s';

  return (
    <div className="w-full max-w-[700px] text-white border-gray-600">
      <div className="thread border border-gray-800 shadow-sm">
        {/* Header */}
        <div className="header flex justify-between items-start p-3 gap-3">
          <div className="userinfo flex gap-3">
            <div className="min-w-[50px] min-h-[50px] h-[50px] w-[50px] border-4 border-black rounded-full overflow-hidden">
              <img
                src={post?.author?.profilePic || defaultProfilePic}
                className="h-full w-full object-cover"
                alt="user"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-[18px]">
                  {post?.author?.name || 'Anonymous'}
                </span>
                <span className="text-[#71767b]">
                  @{post?.author?.username || 'anonymous'}
                </span>
              </div>
              <div className="text-white whitespace-pre-line pt-1">
                {post?.description || 'No description available.'}
              </div>
            </div>
          </div>
          <div className="delete">
            <MdOutlineDeleteOutline
              size={25}
              className="cursor-pointer text-gray-400 hover:text-red-400"
            />
          </div>
        </div>
        {post?.mediaUrl && (
          <div className="main px-4 w-[80%] mx-auto pb-4">
            <div className="w-full rounded-md overflow-hidden">
              {post.mediaType === 'image' ? (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="w-full max-h-96 object-cover"
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full max-h-[500px] rounded-md"
                />
              )}
            </div>
          </div>
        )}      
        {display && (
          <div className="flex justify-around items-center px-6 py-3 border-t border-gray-800 text-gray-400">
            {/* Comment */}
            <div className="group flex items-center gap-1 cursor-pointer transition duration-150">
                 <Link to={`/post/${post._id}`} key={post._id}>
              <div className="p-2 rounded-full group-hover:bg-blue-500/20 transition">
                <FaRegCommentDots
                  size={20}
                  className="group-hover:text-blue-400"
                />
              </div>
              </Link>
              <span className="text-sm">{post?.comments?.length || 0}</span>
            </div>

            {/* Like */}
            <div
              className="group flex items-center gap-1 cursor-pointer transition duration-150"
              onClick={() => handleLike(post?._id)}
            >
              <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition">
                {likes.includes(userId) ? (
                  <FaHeart size={20} className="text-pink-500" />
                ) : (
                  <MdFavoriteBorder size={20} />
                )}
              </div>
              <span className="text-sm">{likes.length}</span>
            </div>

            {/* Bookmark */}
            <div className="group flex items-center gap-1 cursor-pointer transition duration-150">
              <div className="p-2 rounded-full group-hover:bg-yellow-400/20 transition">
                <MdOutlineBookmarkBorder
                  size={20}
                  className="group-hover:text-yellow-400"
                />
              </div>
              <span className="text-sm">10</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Thread;

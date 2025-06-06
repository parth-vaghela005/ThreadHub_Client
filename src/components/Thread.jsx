import React, { useState } from 'react';
import {
  MdOutlineBookmarkBorder,
  MdOutlineDeleteOutline,
} from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LikeAnsDisLike from '../Api/LikeAnsDisLike.js';

const Thread = ({ post, display = false }) => {
  console.log("" , post.author?.name);
  
  const user = useSelector((state) => state.author.user);
  const userId = user?._id;
  const [likes, setLikes] = useState(post?.likes || []);

  const handleLike = async (id) => {
    if (!userId || !post?._id) return;
    try {
      await LikeAnsDisLike(id);
      if (likes.includes(userId)) {
        setLikes((prev) => prev.filter((uid) => uid !== userId));
      } else {
        setLikes((prev) => [...prev, userId]);
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const defaultProfilePic =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s';

  return (
    <>
      <style>{`
        @keyframes like-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        .animate-like-pop {
          animation: like-pop 0.3s ease forwards;
        }
      `}</style>

      <div className="w-full max-w-2xl mx-auto bg-[#16181c] border border-[#2f3336] rounded-2xl overflow-hidden mb-6 font-sans">
        {/* Header */}
        <div className="flex items-start gap-3 p-4">
          <img
            src={post?.author?.profilePic || defaultProfilePic}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white text-base font-semibold leading-tight">
                  {post?.author?.name || 'Anonymous'}{' '}
                  <span className="text-gray-400 text-sm font-normal">
                    @{post?.author?.username || 'anonymous'}
                  </span>
                </h4>
              </div>
              <MdOutlineDeleteOutline
                size={20}
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              />
            </div>
            <p className="text-gray-200 text-sm mt-1 leading-relaxed">
              {post?.description || '[No content]'}
            </p>
          </div>
        </div>

        {/* Media */}
        {post?.mediaUrl && post?.mediaType && (
          <div className="w-full aspect-video bg-black flex items-center justify-center overflow-hidden rounded-md">
            {post.mediaType === 'image' ? (
              <img
                src={post.mediaUrl}
                alt="media"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* Caption */}
        {post?.caption && (
          <p className="text-white text-sm px-4 pt-2 font-normal leading-snug">
            {post.caption}
          </p>
        )}

        {/* Footer (actions) */}
        {display && (
          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-400 border-t border-gray-700">
            <Link
              to={`/post/${post?._id}`}
              className="flex items-center gap-1 hover:text-blue-500 font-medium"
            >
              <FaRegCommentDots size={15} />
              <span>{post?.comments?.length || 0}</span>
            </Link>

            <div
              onClick={() => handleLike(post?._id)}
              className="flex items-center gap-1 cursor-pointer select-none"
              style={{ userSelect: 'none' }}
              aria-label="Like Button"
            >
              {likes.includes(userId) ? (
                <AiFillHeart
                  size={20}
                  className="text-pink-500 animate-like-pop"
                  style={{ transition: 'color 0.3s ease' }}
                />
              ) : (
                <AiOutlineHeart
                  size={20}
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                />
              )}
              <span
                className={`text-sm font-semibold ${
                  likes.includes(userId) ? 'text-pink-500' : 'text-gray-400'
                }`}
              >
                {likes.length}
              </span>
            </div>

            <div className="flex items-center gap-1 hover:text-yellow-500 cursor-pointer font-medium">
              <MdOutlineBookmarkBorder size={16} />
              <span>10</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Thread;

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
// import { format, formatDistanceToNowStrict, differenceInHours } from 'date-fns';
import {
  MdOutlineDeleteOutline,
  MdFavoriteBorder,
  MdOutlineBookmarkBorder,
} from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import formatPostTime from '../Pages/formatPostTime.js';
function Thread({post}) {
  const url  = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s'
  return (
    <div className="w-full max-w-[700px] text-white border-gray-600 mx-auto">
      <div className="thread border border-gray-800  shadow-sm">
        {/* Header */}
        <div className="header flex justify-between items-start p-3 gap-3">
          <div className="userinfo flex gap-3">
            <div className="min-w-[50px] min-h-[50px] h-[50px] w-[50px] border-4 border-black rounded-full overflow-hidden">
              <img
                src={post.author?.profilePic || url}
                className="h-full w-full object-cover"
                alt="user"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-[18px]">{
                  post?.author?.name || "Anonymous"
                  }
                </span>
                <span className="text-[#71767b]">
  @{post?.author?.username || 'Anonymous'}
</span>

                <span className="text-[#71767b] flex items-center gap-1">·{formatPostTime(post.createdAt)}</span>
              </div>
              <div className="text-white whitespace-pre-line pt-1">
               {
                post?.description || "No description available."
          
               }
              </div>
            </div>
          </div>

          {/* Delete Icon */}
          <div className="delete">
            <MdOutlineDeleteOutline
              size={25}
              className="cursor-pointer text-gray-400 hover:text-red-400"
            />
          </div>
        </div>

        {/* File Preview */}
        {post.mediaUrl && (
          <div className="main px-4 w-[80%] mx-auto pb-4">
            <div className="w-full rounded-md overflow-hidden">
              {post.mediaType === 'image' ? (
                <img
                  src={post.mediaUrl}
                  alt=""
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

        {/* Action Buttons */}
        <div className="flex justify-around items-center px-6 py-3 border-t border-gray-800 text-gray-400">
          {/* Comment */}
          <div className="group flex items-center gap-1 cursor-pointer transition duration-150">
            <div className="p-2 rounded-full group-hover:bg-blue-500/20 transition">
              <FaRegCommentDots
                size={20}
                className="group-hover:text-blue-400"
              />
            </div>
            <span className="text-sm">{post.comments.length}</span>
          </div>

          {/* Like */}
          <div className="group flex items-center gap-1 cursor-pointer transition duration-150">
            <div className="p-2 rounded-full group-hover:bg-pink-500/20 transition">
              <MdFavoriteBorder
                size={20}
                className="group-hover:text-pink-500"
              />
            </div>
            <span className="text-sm">{post.likes.length}</span>
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
      </div>
    </div>
  );
}

export default Thread;

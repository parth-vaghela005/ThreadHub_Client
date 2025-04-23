import CreateComment from "../Api/CreateComment.js";
import { useState } from "react";

export default function ReplyBox({ username, postId, refreshPost }) {
    const [reply, setReply] = useState("");
  
    const HandleComment = async () => {
      await CreateComment(postId, reply);
      setReply("");
      refreshPost(); // 🔥 fetch updated post & show new comment
    };
  
    return (
      <div className="w-[700px] bg-black text-white border border-gray-800 py-2 px-2 ">
        <p className="text-sm text-blue-400 mb-2">
          Replying to <span className="hover:underline cursor-pointer">@{username}</span>
        </p>
  
        <input
          type="text"
          placeholder="Post your reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full bg-black border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
  
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-4 text-blue-400">
            <span className="cursor-pointer">🖼️</span>
            <span className="cursor-pointer">🎞️</span>
            <span className="cursor-pointer">🔁</span>
            <span className="cursor-pointer">😊</span>
            <span className="cursor-pointer">📍</span>
          </div>
  
          <button
            className="bg-gray-600 text-white rounded-full px-6 py-1 hover:bg-gray-500 disabled:opacity-50"
            disabled={!reply.trim()}
            onClick={HandleComment}
          >
            Reply
          </button>
        </div>
      </div>
    );
  }
  
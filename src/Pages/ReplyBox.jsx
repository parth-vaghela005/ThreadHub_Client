import CreateComment from "../Api/CreateComment.js";
import { useState } from "react";

export default function ReplyBox({ username, postId, refreshPost }) {
  const [reply, setReply] = useState("");

  const HandleComment = async () => {
    if (!reply.trim()) return;
    await CreateComment(postId, reply);
    setReply("");
    refreshPost(); 
  };
  return (
    <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 w-full text-white">
      <p className="text-sm text-blue-400 mb-3">
        Replying to{" "}
        <span className="hover:underline cursor-pointer font-medium">
          @{username}
        </span>
      </p>

      <input
        type="text"
        placeholder="Post your reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full bg-[#1a1c20] border border-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center justify-between mt-4">
        {/* Emoji & media icons */}
        <div className="flex gap-3 text-gray-400 text-xl">
          <button className="hover:text-blue-400">🖼️</button>
          <button className="hover:text-blue-400">🎞️</button>
          <button className="hover:text-blue-400">🔁</button>
          <button className="hover:text-blue-400">😊</button>
          <button className="hover:text-blue-400">📍</button>
        </div>

        <button
          onClick={HandleComment}
          disabled={!reply.trim()}
          className="bg-blue-600 hover:bg-blue-500 transition px-5 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

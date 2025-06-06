import React, { useEffect, useState } from 'react';
import GetPostById from '../Api/GetPostById.js';
import { useParams, Link } from 'react-router-dom';
import Thread from '../components/Thread.jsx';
import ReplyBox from '../Pages/ReplyBox.jsx';
import { IoIosArrowRoundBack } from 'react-icons/io';

function CommentSection() {
  const [post, setPost] = useState(null);
  const { Id } = useParams();

  const fetchPost = async () => {
    const result = await GetPostById(Id);
    setPost(result);
  };

  useEffect(() => {
    fetchPost();
  }, [Id]);

  if (!post) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-white">
      {/* Header */}
      <header className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          className="p-2 rounded-full bg-[#1f1f1f] hover:bg-[#2c2c2c] transition"
        >
          <IoIosArrowRoundBack size={28} />
        </Link>
        <h2 className="text-2xl font-semibold">Post Details</h2>
      </header>

      {/* Main Post */}
      <section className="mb-6">
        <Thread post={post} display={false} />
      </section>

      {/* Reply Input */}
      <section className="mb-8 border border-[#2f3336] rounded-xl p-4 bg-[#1a1c20]">
        <ReplyBox
          username={post?.author?.username}
          postId={Id}
          refreshPost={fetchPost}
        />
      </section>

      {/* Comments */}
      <section className="space-y-6">
        {post?.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <Thread key={comment._id} post={comment} display={false} />
          ))
        ) : (
          <p className="text-gray-400 text-center">No comments yet. Be the first to reply!</p>
        )}
      </section>
    </div>
  );
}

export default CommentSection;

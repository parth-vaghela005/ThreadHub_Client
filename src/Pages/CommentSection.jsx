// CommentSection.jsx
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

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="header flex gap-7 items-center px-3 py-3 cursor-pointer">
        <Link to={`/`}>
          <IoIosArrowRoundBack size={40} className="back text-white hover:bg-gray-800 rounded-full" />
        </Link>
        <div className="flex flex-col gap-0">
          <p className="text-[20px] text-white font-bold">Post</p>
        </div>
      </div>

      <div><Thread post={post} display={true} /></div>

      <div className="mt-5">
        <ReplyBox username={post?.author?.username} postId={Id} refreshPost={fetchPost} />
      </div>

      <div className="mt-5">
        {post?.comments?.map((comment) => (
          <Thread key={comment._id} post={comment} display={false} />
        ))}
      </div>
    </>
  );
}

export default CommentSection;

import React, { useEffect, useState } from 'react'
import Thread from '../components/Thread'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const fetchPosts  = async()=>{
    setLoading(true); 
  const res  = await axios.get(`http://localhost:5000/api/v1/auth/getAll`);
    const data = res.data;
setPosts(data);
    setLoading(false); 
  }
  useEffect(() => {
    fetchPosts();
  }, []);
if(loading)return <h1>Loading...</h1>
  return (
     <>
      { 
    posts.map((post,index) => (
    <Link to={`/post/${post._id}`} key={post._id}>
      <Thread post={post} display={true} />
    </Link>
    ))
   }  
 </>
  )
}
export default Home

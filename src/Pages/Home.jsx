// import Thread from 'components/Thread'
import React, { useEffect, useState } from 'react'
import Thread from '../components/Thread'
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const fetchPosts  = async()=>{
    setLoading(true); 
  const res  = await axios.get(`http://localhost:5000/api/v1/auth/getAll`);// ✅ logs actual object
    const data = res.data;
// console.log(data);

   setPosts(data);
    setLoading(false); 
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts , "get")
  return (

    <>
    <h1 className='text-white'>
      Home
    </h1>
  { 
    

    
    posts.map((post,index) => (
      <Thread key={post._id} post={post} />
    ))
   }
    
    </>
  )
}
export default Home

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FollowSuggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const fetchSuggestions = async (count = 3) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/auth/suggestion?size=${count}`);
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);
  const handleFollowClick = (username) => {
    navigate(`/${username}/profile`);
  };
  const handleShowMore = () => {
    fetchSuggestions(3);
  };
  return (
    <div className="bg-black text-white p-4 rounded-lg fixed right-30 w-[300px]">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      {suggestions.map((user, index) => (
        <div key={index} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.profilePic || '/default-profile.png'}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <span className="font-semibold">{user.name}</span>
              <br />
              <span className="text-gray-400 text-sm">@{user.username}</span>
            </div>
          </div>
          <button
            className="bg-white text-black rounded-full px-4 py-1 font-semibold hover:bg-gray-200"
            onClick={() => handleFollowClick(user.username)}
          >
           View
          </button>
        </div>
      ))}
      <button
        className="text-blue-400 hover:underline text-sm"
        onClick={handleShowMore}
      >
        Show more
      </button>
    </div>
  );
};
export default FollowSuggestion;

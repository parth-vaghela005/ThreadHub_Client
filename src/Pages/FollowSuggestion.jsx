import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FollowSuggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [count, setCount] = useState(5); // default 5 profiles
  const navigate = useNavigate();

  const fetchSuggestions = async (size) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/auth/suggestion?size=${size}`);
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions(count);
  }, [count]);

  const handleFollowClick = (username) => {
    navigate(`/${username}/profile`);
  };

  const handleShowMore = () => {
    setCount((prev) => prev + 3);
  };

  return (
    <div
      className="fixed top-6 right-16 w-[400px] bg-[#16181c] rounded-lg p-5 shadow-xl border border-gray-700"
      style={{ maxHeight: 'calc(100vh - 1.5rem)', overflowY: 'auto' }}
    >
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>

      {suggestions.length === 0 ? (
        <p className="text-gray-400">No suggestions found</p>
      ) : (
        suggestions.map((user, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={user.profilePic || '/default-profile.png'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
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
        ))
      )}

      {suggestions.length > 0 && (
        <button
          className="text-blue-400 hover:underline text-sm mt-2"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default FollowSuggestion;

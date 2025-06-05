import { toast } from 'sonner';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.author.user);

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        "http://localhost:5000/api/v1/auth/profile/edit", 
        { name, bio, location },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message || "Profile updated successfully");

      // ✅ Optional null check
      navigate(`/${user?.username}/profile`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-200 text-center">Edit Profile</h2>

        {/* Name */}
        <div>
          <label className="block text-gray-400 mb-1 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-[#2c2c2c] border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-400 mb-1 font-medium">Bio</label>
          <textarea
            rows="3"
            className="w-full px-4 py-2 bg-[#2c2c2c] border border-gray-700 rounded-md resize-none text-gray-200 placeholder-gray-500 focus:outline-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-400 mb-1 font-medium">Location</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-[#2c2c2c] border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-[#121212] text-white font-semibold rounded-md border border-cyan-400 hover:bg-cyan-700 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { Search, CirclePlus, LogOut } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import { CiBookmark } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../redux/slices/authSlice';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.author.user);
  const profileUrl = `/${user.username.replaceAll(' ', '_').toLowerCase()}/profile`;

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/auth/logout', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  const MenuItem = ({ icon, label }) => (
    <div className="flex items-center gap-4 p-3 text-white hover:bg-gray-800 rounded-full cursor-pointer transition-all">
      {icon}
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );

  return (
    <nav className="flex flex-col justify-between h-full p-6">
      <div className="space-y-2">
        <Link to="/home">
          <MenuItem icon={<MdHomeFilled size={28} />} label="Home" />
        </Link>
        <MenuItem icon={<Search size={28} />} label="Search" />
        <Link to={profileUrl}>
          <MenuItem icon={<CgProfile size={28} />} label="Profile" />
        </Link>
        <Link to="/create-post">
          <MenuItem icon={<CirclePlus size={28} />} label="Post" />
        </Link>
        <MenuItem icon={<CiBookmark size={28} />} label="Bookmarks" />
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-400 hover:bg-red-900 rounded-full px-4 py-2 mt-4"
      >
        <LogOut size={20} /> Logout
      </button>
    </nav>
  );
}
export default Sidebar;

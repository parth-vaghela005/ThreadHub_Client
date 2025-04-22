import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosCloudUpload } from 'react-icons/io';
// import { generateCaption } from './generateCaption';
import { toast } from "sonner";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreatePostModal() {
  const navigate = useNavigate();
  const isOpen  = true;
  const onClose = () => {
    setDesc('');
    setFile(null);
    setPreviewUrl(null);
    setLoading(false); // reset loading
  };
  const formData   = new FormData();
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [Posts,setPosts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new loading state
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
  
    if (selected) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setPreviewUrl(URL.createObjectURL(selected));
  
        const currentDesc = desc;
  
        // ✅ Only generate caption if it's an image
        if (selected.type.startsWith('image')) {
          setLoading(true); // Start loader
        
          try {
         
            // const generatedCaption = await generateCaption(base64Image);
            setDesc(currentDesc + '\n' + generatedCaption); // ✅ Only append caption
          } catch (err) {
            setDesc(currentDesc + '\n[Failed to generate caption]');
          }
  
          setLoading(false); // End loader
        }
      };
      reader.readAsDataURL(selected);
    }
  };
  formData.append('file', file);
  formData.append('description',desc)
  const handlePost = async () => {
    setLoading(true);
  const res  = await axios.post(`http://localhost:5000/api/v1/auth/create`,formData, {
    headers: { 'Content-Type': 'multipart/form-data' } });
    console.log("data", res.data); // ✅ logs actual object
  setLoading(false)
  toast.success(res.data.message);
  navigate('/home')
    // setLoading(true); // show loading in Post bun

    // setTimeout(() => {
    //   // simulate posting
    //   onClose();
    //   setDesc('');
    //   setFile(null);
    //   setPreviewUrl(null);
    //   setLoading(false); // reset loading
    // }, 1000); // you can replace this with real API call
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#16181c] text-white rounded-lg w-full max-w-xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Create a Post</h2>

        {/* Description */}
        <textarea
          rows={4}
          className="w-full bg-transparent border border-gray-600 p-3 rounded-lg resize-none focus:outline-none focus:border-blue-500"
          placeholder="What's happening?"
          maxLength={280}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* File Upload */}
        <div className="mt-3 flex items-center gap-2">
          <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg">
            <IoIosCloudUpload size={20} /> Upload Image/Video
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mt-2 pl-3">
            {file?.type?.startsWith('image') ? (
              <img src={previewUrl} alt="preview" className="w-[200px] h-[200px]" />
            ) : (
              <video src={previewUrl} controls className="w-[250px] h-[250px] rounded-md" />
            )}
          </div>
        )}

        {/* Post Button with loader */}
        <button
          className="mt-5 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2"
          onClick={handlePost}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
          
            </>
          ) : (
            'Post'
          )}
        </button>
      </div>
     
    </div>
  
  );
}

export default CreatePostModal;

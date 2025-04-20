import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoIosCloudUpload } from 'react-icons/io'; // ✅ Added icon for upload

function CreatePostModal({ isOpen, onClose }) {
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
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
        { console.log(file)}
        {previewUrl && (
          <div className="mt-2 pl-3 ">
            {file?.type?.startsWith('image') ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-[200px] h-[200px] "  // ✅ Set minimum height to 200px
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-[250px] h-[250px] rounded-md"  // ✅ Set minimum height to 200px
              />
            )}
          </div>
        )}

        {/* Post Button */}
        <button
          className="mt-5 w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          onClick={() => {
            console.log('Posted:', { desc, file });
            onClose();
            setDesc('');
            setFile(null);
            setPreviewUrl(null);
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePostModal;

import React, { useState } from "react";
import axios from "axios";

const ImageCaptionCard = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      setImage(base64Image); // For preview
      const pureBase64 = image.replace(/^data:image\/[a-z]+;base64,/, ""); 

      await generateCaption(pureBase64);
    };

    reader.readAsDataURL(file);
  };

  const generateCaption = async (base64) => {
    setLoading(true);
    setCaption("");

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
        {
          inputs: base64,
        },
        {
          headers: {
            Authorization: `Bearer  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`, // 🔐 Replace with your key
            "Content-Type": "application/json",
          },
        }
      );

      const generated = response.data?.[0]?.generated_text;
      setCaption(generated || "No caption generated.");
    } catch (error) {
      console.error("Caption generation error:", error);
      setCaption("❌ Error generating caption.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-white border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">🧠 AI Image Caption Generator</h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium">📷 Select an image:</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </label>

      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Selected"
            className="w-full h-auto rounded-md border"
          />
        </div>
      )}

      {loading ? (
        <p className="text-blue-600 font-medium">⏳ Generating caption...</p>
      ) : caption ? (
        <div className="mt-2 bg-gray-100 p-3 rounded">
          <p className="text-gray-700 font-medium">📝 Generated Caption:</p>
          <p className="text-gray-800">{caption}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ImageCaptionCard;

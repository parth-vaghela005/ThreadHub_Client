import axios from 'axios';

export async function generateCaption(base64) {
  try {
    // Remove the prefix 'data:image/jpeg;base64,' from the Base64 string if present
    const base64Data = base64.split(',')[1];

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
      {
        inputs: base64Data,  // Pass only the raw Base64 data
      },
      {
        headers: {
          Authorization: `Bearer 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`, // 🔐 Replace with your key
          "Content-Type": "application/json",
        },
      }
    );

    const generated = response.data?.[0]?.generated_text;
    return generated || "No caption generated.";
  } catch (error) {
    console.error("Caption generation error:", error);
    return "❌ Error generating caption.";
  }
}
    
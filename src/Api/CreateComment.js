import axios  from "axios";
const API_URL = "http://localhost:5000/api/v1/Post";
async function CreateComment(postId, data) {

    const response = await axios.post(`${API_URL}/${postId}/comment`, { data },
        { withCredentials: true }
    );
    return response.data;
}
export default CreateComment;

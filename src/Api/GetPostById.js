import axios from 'axios'
async function GetPostById(Id) {
    const API_URL = "http://localhost:5000/api/v1/Post";
        try {
        const response = await axios.get(`${API_URL}/${Id}`);
        return response.data.post;
        } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    };
}
export default GetPostById

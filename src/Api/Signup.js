import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/auth/regestration";
const signup = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};
export default signup;
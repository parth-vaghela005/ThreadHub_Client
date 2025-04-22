import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/auth/login";
 async function Login (Data) {
  const res = await axios.post(API_URL, Data,{ withCredentials: true })
  return res.data;
}
export default Login

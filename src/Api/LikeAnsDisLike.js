import axios from 'axios';

async function LikeAnsDisLike(Id) {
  const response = await axios.post(
    `http://localhost:5000/api/v1/Post/${Id}/Like`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}
export default LikeAnsDisLike;

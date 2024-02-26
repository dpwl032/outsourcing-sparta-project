import axios from 'axios';

// export const detailapi = axios.create({
//   baseURL: 'http://localhost:4000',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

const getTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/class`)
    console.log(response.data);
    return response.data;
}

export { getTodos};
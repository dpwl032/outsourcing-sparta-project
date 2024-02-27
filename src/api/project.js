import axios from 'axios';

// export const detailapi = axios.create({
//   baseURL: 'http://localhost:4000',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// 데이터만 불러오기
export const getTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/class`)
    console.log(response.data);
    return response.data;
}


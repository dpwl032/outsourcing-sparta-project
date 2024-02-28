import { jsonApi } from './user';
import { authApi } from './user';

//mutation (RUD)
// json db에 user의 하위정보를 가져오는 api
const addProfile = async (profile) => {
  const response = await jsonApi.post('/userRoles', profile);
  return response;
};

const editProfile = async (formData) => {
  const response = await authApi.patch('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

// const addYoutube = async (newUrl) => {
//   const response = await YoutubeApi.post('/youtube', newUrl);
//   console.log('you', response);
//   return response;
// };

export { addProfile, editProfile };

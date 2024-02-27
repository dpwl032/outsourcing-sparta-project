import { jsonApi } from './user';
import { authApi } from './user';

//mutation (RUD)
// json db에 user의 하위정보를 가져오는 api
const addProfile = async (profile) => {
  const response = await jsonApi.post('/userRoles', profile);
  return response;
};

const editProfile = async (formData) => {
  console.log('formData', formData);
  const response = await authApi.patch('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
};

export { addProfile, editProfile };

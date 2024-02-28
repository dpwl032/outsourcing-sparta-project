import { jsonApi } from './user';
import { authApi } from './user';
import { YoutubeApi } from './youtube';

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

//class
//클래스 오픈
const addClass = async (newClass) => {
  const response = await jsonApi.post('/class', newClass);
  return response;
};

const addYoutube = async (newUrl) => {
  const response = await YoutubeApi.post('/youtube', newUrl);
  console.log('you', response);
  return response;
};

//

//클래스 삭제
const deleteClass = async (id) => {
  const response = await jsonApi.delete(`/class/${id}`);
  return response;
};

//

const editClass = async (id) => {
  const response = await jsonApi.patch(`/class/${id}`);
  return response;
};

//review
const addReview = async (newReview) => {
  const response = await jsonApi.post('/review', newReview);
  return response;
};

export { addProfile, editProfile, addClass, deleteClass, addReview, editClass, addYoutube };

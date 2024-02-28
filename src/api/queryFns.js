import { authApi, jsonApi } from './user';
import { YoutubeApi } from './youtube';

//query(C)
// 모든 user의 하위정보를 가져오는 api
const getProfile = async () => {
  const response = await jsonApi.get('/userRoles');
  return response;
};

const getInfo = async () => {
  const response = await authApi.get('/user');
  return response;
};

//class
const getClass = async () => {
  const response = await jsonApi.get('/class');
  return response;
};

//review
const getReview = async () => {
  const response = await jsonApi.get('/review');
  return response;
};

//youtube

const getYoutube = async () => {
  const response = await YoutubeApi.get('/class');
  return response;
};

export { getProfile, getInfo, getClass, getReview };

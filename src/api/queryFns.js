import { authApi, jsonApi } from './user';

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

export { getProfile, getInfo, getClass, getReview };

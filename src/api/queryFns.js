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

//map
const getClass = async (pageId) => {
  const response = await jsonApi.get(`/businessInfo`);
  return response;
};

export { getProfile, getInfo, getClass };

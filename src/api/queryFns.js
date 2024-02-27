import { jsonApi } from './user';

//query(C)
// 모든 user의 하위정보를 가져오는 api
const getProfile = async () => {
  const response = await jsonApi.get('/userRoles');
  return response;
};

export { getProfile };

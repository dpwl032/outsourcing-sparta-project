import { jsonApi } from './user';

//mutation (RUD)
// json db에 user의 하위정보를 가져오는 api
const addProfile = async (profile) => {
  const response = await jsonApi.post('/userRoles', profile);
  return response;
};

export { addProfile };

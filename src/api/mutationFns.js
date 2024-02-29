import { jsonApi } from './user';
import { authApi } from './user';

//mutation (RUD)
// json db에 user의 하위정보를 가져오는 api
const addProfile = async (profile) => {
  const response = await jsonApi.post('/userRoles', profile);
  return response;
};

const editProfile = async (formData) => {
  try {
    const response = await authApi.patch('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const editingObj = {};
    const { nickname, avatar } = response.data;
    if (nickname) editingObj.nickname = nickname;
    if (avatar) editingObj.avatar = avatar;

    // JSON 서버에 내 리뷰들의 닉네임과 아바타 변경
    const userId = localStorage.getItem('userId');

    const { data: myReviews } = await jsonApi.get(`/reviews?createdBy=${userId}`);

    for (const myReview of myReviews) {
      await jsonApi.patch(`/reviews/${myReview.id}`, editingObj);
    }

    return response;
  } catch (err) {
    console.error('An error occurred while editing profile:', err);
    throw err;
  }
};

//예지 추가-찜

const addLikes = async ({ likeUser, reviewId }) => {
  const response = await jsonApi.patch(`/businessInfo/${reviewId}`, {
    $push: { likes: likeUser }
  });
  return response;
};

//예지 추가
//클래스 오픈
const addBusinessInfo = async (formData) => {
  try {
    const response = await jsonApi.post('/businessInfo', formData);
    console.log('test', response.data);
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

//클래스 삭제
const deleteBusinessInfo = async (id) => {
  const response = await jsonApi.delete(`/businessInfo/${id}`);
  return response;
};

//

const editBusinessInfo = async (id) => {
  const response = await jsonApi.patch(`/businessInfo/${id}`);
  return response;
};

export { addProfile, editProfile, addLikes, addBusinessInfo };

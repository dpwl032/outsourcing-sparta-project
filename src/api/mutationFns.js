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
    console.log('1', userId);
    const { data: myReviews } = await jsonApi.get(`/reviews?createdBy=${userId}`);

    console.log('2', myReviews);
    for (const myReview of myReviews) {
      await jsonApi.patch(`/reviews/${myReview.id}`, editingObj);
      console.log('3', myReview.id);
      console.log('test', editingObj);
    }
    console.log('4', response);
    return response;
  } catch (err) {
    console.error('An error occurred while editing profile:', err);
    throw err;
  }
};

// const addYoutube = async (newUrl) => {
//   const response = await YoutubeApi.post('/youtube', newUrl);
//   console.log('you', response);
//   return response;
// };

export { addProfile, editProfile };

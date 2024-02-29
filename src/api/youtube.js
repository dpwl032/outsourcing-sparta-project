import axios from 'axios';

export const testYoutubeApi = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY
  }
});

export const searchVideos = async () => {
  try {
    const response = await testYoutubeApi.get('search', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20
      }
    });

    console.log(response);
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

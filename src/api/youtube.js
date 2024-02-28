import axios from 'axios';

export const YoutubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
  }
});

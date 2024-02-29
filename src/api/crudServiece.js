import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = `${process.env.REACT_APP_CLASS}`;

export const addBusinessInfo = async (businessInfo) => {
  const response = await axios.post(`${API_URL}/businessInfo`, {
    id: uuidv4(),
    ...businessInfo
  });
  return response.data;
};

export const editBusinessInfo = async ({ id, infoToUpdate }) => {
  const response = await axios.put(`${API_URL}/businessInfo/${id}`, { ...infoToUpdate });
  return response.data;
};

export const fetchBusinessInfo = async (id) => {
  const response = await axios.get(`${API_URL}/businessInfo/${id}`);
  return response.data;
};

export const deleteBusinessInfo = async (id) => {
  await axios.delete(`${API_URL}/businessInfo/${id}`);
};

export const postReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData);
  return response.data;
};

export const fetchReviews = async (createdOn) => {
  const response = await axios.get(`${API_URL}/reviews?createdOn=${createdOn}`);
  return response.data;
};

export const updateReview = async (id, reviewData) => {
  const response = await axios.put(`${API_URL}/reviews/${id}`, reviewData);
  return response.data;
};

export const deleteReview = async (id) => {
  await axios.delete(`${API_URL}/reviews/${id}`);
};

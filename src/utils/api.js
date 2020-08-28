import axios from 'axios';

export const createInstance = config => axios.create(config);

export const createPostRequest = ({ url, body, config }, instance = axios) => {
  return instance.post(url, body, config);
};

export const createGetRequest = ({ url, config }, instance = axios) => {
  return instance.get(url, config);
};

export const getAuthHeader = token => {
  return { 'Authorization': `Bearer ${token}` };
};

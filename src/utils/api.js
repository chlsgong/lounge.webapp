import axios from 'axios';
import qs from 'qs';

export const createInstance = config => axios.create(config);

export const createPostRequest = ({ url, body, query }, instance = axios) => {
  return instance.post(
    url,
    qs.stringify(body),
    { params: query },
  );
};

export const createGetRequest = () => {};

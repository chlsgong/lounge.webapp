import axios from 'axios';
import qs from 'qs';

export const createPostRequest = ({ url, body, query }) => {
  return axios.post(
    url,
    qs.stringify(body),
    { params: query },
  );
};

export const createGetRequest = () => {};

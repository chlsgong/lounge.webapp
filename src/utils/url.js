import qs from 'qs';

export const getURLParams = query => qs.parse(query, { ignoreQueryPrefix: true });
export const createURLQuery = params => qs.stringify(params, { addQueryPrefix: true });
export const appendURLPathParam = (url, params) => {
  let newURL = url;
  params.forEach(p => newURL = `${newURL}/${p}`);
  return newURL;
};

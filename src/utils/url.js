import qs from 'qs';

export const getURLParams = (query) => qs.parse(query, { ignoreQueryPrefix: true });
export const createURLQuery = (params) => qs.stringify(params, { addQueryPrefix: true });

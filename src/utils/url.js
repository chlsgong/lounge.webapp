import qs from 'qs';

export const getURLParams = () => {
  const urlSearchString = window.location.search.substring(1);
  const params = qs.parse(urlSearchString);

  return params;
};

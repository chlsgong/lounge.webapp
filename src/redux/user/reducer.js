import { requestSpotifyUserProfile } from './actions';

// User reducer

export const initialState = {
  country: '',
  displayName: '',
  email: '',
  explicitContent: null,
  externalUrls: null,
  followers: null,
  href: '',
  id: '',
  images: [],
  product: '',
  type: '',
  uri: '',
};

export const extraReducer = {
  [requestSpotifyUserProfile.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      country: payload?.country,
      displayName: payload?.display_name,
      email: payload?.email,
      explicitContent: payload?.explicit_content,
      externalUrls: payload?.external_urls,
      followers: payload?.followers,
      href: payload?.href,
      id: payload?.id,
      images: payload?.images,
      product: payload?.product,
      type: payload?.type,
      uri: payload?.uri,
    };
  },
};

import { requestSpotifyUserProfile, requestLoungeUser } from './actions';

// User reducer

export const initialState = {
  id: '',
  spotify: {
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
  },
};

export const extraReducer = {
  [requestSpotifyUserProfile.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      spotify: {
        ...state.spotify,
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
      },
    };
  },
  [requestLoungeUser.fulfilled]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      id: payload?._id,
      spotify: {
        ...state.spotify,
        id: payload?.spotifyId,
      },
    };
  },
};

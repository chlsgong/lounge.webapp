const dev = {
  server: {
    URL: 'https://localhost:8443',
  },
  spotify: {
    // REDIRECT_URI: 'http://localhost:3000', // Not secure
    REDIRECT_URI: 'https://localhost:3000',
    CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_SECRET,
    CLIENT_ID: process.env.REACT_APP_SPOTIFY_ID,
  },
};

const prod = {
  server: {
    URL: 'https://loungemusic.app:8443',
  },
  spotify: {
    REDIRECT_URI: 'https://loungemusic.app',
    CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_SECRET,
    CLIENT_ID: process.env.REACT_APP_SPOTIFY_ID,
  },
};

const config = process.env.REACT_APP_ENV === 'prod'
  ? prod
  : dev;

export default {
  ...config
};

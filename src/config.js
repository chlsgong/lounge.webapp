const dev = {
  server: {
    URL: 'https://localhost:8443',
  },
  spotify: {
    REDIRECT_URI: 'http://localhost:3000',
  },
};

const prod = {
  server: {
    URL: 'https://chlsgong.com:8443',
  },
  spotify: {
    REDIRECT_URI: 'https://chlsgong.com',
  },
};

const config = process.env.REACT_APP_ENV === 'prod'
  ? prod
  : dev;

export default {
  ...config
};

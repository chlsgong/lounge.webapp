const dev = {
  server: {
    URL: 'https://localhost:8443',
  },
  spotify: {
    REDIRECT_URI: 'http://localhost:3000',
    CLIENT_SECRET: '10f26b66944143449acf95adcc4074bb',
    CLIENT_ID: '16efad44cfd54e3ea050d602af68eadd',
  },
};

const prod = {
  server: {
    URL: 'https://chlsgong.com:8443',
  },
  spotify: {
    REDIRECT_URI: 'https://chlsgong.com',
    CLIENT_SECRET: '10f26b66944143449acf95adcc4074bb',
    CLIENT_ID: '16efad44cfd54e3ea050d602af68eadd',
  },
};

const config = process.env.REACT_APP_ENV === 'prod'
  ? prod
  : dev;

export default {
  ...config
};

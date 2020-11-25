import { isBrowser } from 'react-device-detect';
import store from './redux/store';
import { initWebApp, setBrowser } from './redux/app/actions';

const init = () => {
  store.dispatch(initWebApp());
  store.dispatch(setBrowser(isBrowser));
  return store;
};

export default init;

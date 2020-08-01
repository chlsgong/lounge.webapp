import store from './redux/store';
import { initWebApp } from './redux/app/actions';

const init = () => {
  store.dispatch(initWebApp());
  return store;
};

export default init;

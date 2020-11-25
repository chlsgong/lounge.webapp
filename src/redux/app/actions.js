import { createAction } from '@reduxjs/toolkit';
import appSlice from './slice';

const { actions } = appSlice;

export const { setBrowser } = actions;
export const initWebApp = createAction('app/initWebApp');
export const loadReduxState = createAction('app/loadReduxState');

export const selectApp = state => state.app;
export const selectIsBrowser = state => selectApp(state).isBrowser;

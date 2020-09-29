import history from '../history';

/* eslint-disable-next-line import/prefer-default-export */
export const gotoRoute = (route, naviMethod = 'push') =>
  history[naviMethod](route);

import { GET_USER } from './constants';

export const getUser = user => ({
  type: GET_USER,
  user
});

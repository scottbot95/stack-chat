import axios from '../axios';

import { GET_USER } from './constants';
import defaultUser from './initialState';
import history from '../../history';

export const getUser = user => ({
  type: GET_USER,
  user
});

export const login = (username, password) => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/login', { username, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (error) {
    console.error(error);
  }
};

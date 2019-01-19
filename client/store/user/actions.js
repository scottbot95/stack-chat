import axios from '../axios';

import { GET_USER, REMOVE_USER } from './constants';
import defaultUser from './initialState';
import history from '../../history';

export const getUser = user => ({
  type: GET_USER,
  user
});

export const removeUser = () => ({
  type: REMOVE_USER
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

export const signup = userData => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/signup', userData);
  } catch (error) {
    dispatch(getUser({ error }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (err) {
    console.error(err);
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

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(getUser(defaultUser));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

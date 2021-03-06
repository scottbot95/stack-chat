import axios from '../axios';

import { GET_USER, REMOVE_USER } from './constants';
import defaultUser from './initialState';
import history from '../../history';
import { fetchChannelList, getChannels } from '../channels/actions';
import initialChannels from '../channels/initialState';

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
    dispatch(fetchChannelList());
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const signup = userData => async dispatch => {
  let res;
  setTimeout(async () => {
    try {
      res = await axios.post('/auth/signup', userData);
    } catch (error) {
      dispatch(getUser({ error }));
    }

    try {
      dispatch(getUser(res.data));
      dispatch(fetchChannelList());
      history.push('/home');
    } catch (err) {
      console.error(err);
    }
  }, 2000);
};

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
    if (res.data) return dispatch(fetchChannelList());
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(getUser(defaultUser));
    dispatch(getChannels(initialChannels));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

import initialState from './initialState';
import { SET_TITLE, SHOW_SIDEBAR, TOGGLE_SIDEBAR } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.title };
    case SHOW_SIDEBAR:
      return { ...state, showSidebar: action.show };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    default:
      return state;
  }
};

import { SET_TITLE, SHOW_SIDEBAR, TOGGLE_SIDEBAR } from './constants';

export const setTitle = title => ({
  type: SET_TITLE,
  title
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});

export const showSidebar = show => ({
  type: SHOW_SIDEBAR,
  show
});

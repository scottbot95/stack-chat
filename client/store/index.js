import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import channelsReducer from './channels';
import messagesReducer from './messages';
import userReducer from './user';
import windowReducer from './window';

const reducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  user: userReducer,
  window: windowReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

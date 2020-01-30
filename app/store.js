import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import appReducer from './redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let middleware = [thunkMiddleware.withExtraArgument({ axios })];

if (process.browser) {
  // We'd like the redux logger to only log messages when it's running in the
  // browser, and not when we run the tests from within Mocha.
  middleware = [...middleware, createLogger({ collapsed: true })];
}

const RESET_STORE = 'RESET_STORE';
export const resetStore = () => ({ type: RESET_STORE });
export const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
    return appReducer(state, action);
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  // 👇 This uses the Redux DevTools extension, assuming you have it installed in your browser.
  // 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
  composeWithDevTools(applyMiddleware(...middleware))
);

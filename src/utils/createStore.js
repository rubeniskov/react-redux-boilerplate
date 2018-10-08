import {
  createStore, applyMiddleware, compose
} from 'redux';

export const _createStore = (reducer, preloadedState, enhancer) => {

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    return enhancer(_createStore)(reducer, preloadedState);
  }

  let composeEnhancers = compose;

  if (__DEV__) {
    if (typeof global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  return createStore(reducer || (state => state), preloadedState, composeEnhancers());
};

export default _createStore;

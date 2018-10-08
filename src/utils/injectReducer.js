import {combineReducers} from 'redux';

export default (store, key, reducer) => {
  store.asyncReducers = {[key]: reducer, ...store.asyncReducers};
  store.replaceReducer(combineReducers(store.asyncReducers));
};

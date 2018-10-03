import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/users';


const epicMiddleware = createEpicMiddleware();

const defaultUserState = {
  name: 'Pepe',
  surname: 'González'
};

export default (initialState = {}) => {
  let composeEnhancers = compose;

  if (__DEV__) {
    console.log('pepe');
    if (typeof global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(combineReducers({
    user(state = defaultUserState, action) {
      console.log(action);
      switch (action.type) {
        case 'USER_LOAD_SUCCESS':
          return {
            ...state,
            loading: false,
            ...action.payload
          };
        case 'USER_LOADING':
          return {
            ...state,
            loading: true
          };
        default:
          return state;
      }
    }
  }), initialState, composeEnhancers(applyMiddleware(epicMiddleware)));
  epicMiddleware.run(rootEpic);
  return store;
};

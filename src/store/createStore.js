import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/users';


const epicMiddleware = createEpicMiddleware();

const defaultUserState = {
  name: 'Pepe',
  surname: 'González'
};

export default (initialState = {}) => {
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
  }), initialState, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};

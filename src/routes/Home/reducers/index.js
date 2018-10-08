import {combineReducers} from 'redux';

const defaultUserState = {
  name: 'Pepe',
  surname: 'González'
};

export default combineReducers({
  user: (state = defaultUserState, action) => {
    switch (action.type) {
      case 'USER_LOAD_SUCCESS':
        return {
          ...state,
          ...action.payload
        };
      case 'USER_LOADING':
        return {
          ...state
        };
      default:
        return state;
    }
  }
});

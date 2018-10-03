import React from 'react';
import {Provider} from 'react-redux';
import UserLoadButton from './UserLoadButton';
import UserViewData from './UserViewData';

export default ({store, routes, ...rest}) => (
  <Provider store={store}>
    <div>
      <UserViewData />
      <br />
      <UserLoadButton />
    </div>
  </Provider>);

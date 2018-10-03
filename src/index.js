import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './store';
import UserLoadButton from './components/UserLoadButton';
import UserViewData from './components/UserViewData';


ReactDOM.render(
  <Provider store={createStore()}>
    <div>
      <UserViewData />
      <br />
      <UserLoadButton />
    </div>
  </Provider>,
  document.getElementById('app')
);


module.hot.accept();

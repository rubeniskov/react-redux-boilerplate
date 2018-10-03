import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from './store';
import App from './components/App';
import routes from './routes/index';

// Store Initialization
// ------------------------------------
const store = createStore(global.__INITIAL_STATE__);

// Render Setup
// ------------------------------------
const MOUNT_NODE = global.document.getElementById('app');

let render = () => {
  ReactDOM.render(<App store={store} routes={routes(store)} />, MOUNT_NODE);
};

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept([
      './components/App', './routes/index'
    ], () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }));
  }
}

// Let's Go!
// ------------------------------------
// if (!__TEST__) render();
//
render();

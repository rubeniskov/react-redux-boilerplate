import './index.scss';
import React from 'react';
import { applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import enhancerLoader from './utils/enhancerReduxLoader';
import {
  createLoader, createEpicMiddleware, createRoutes, createHistory, createStore
} from './utils';
import App from './components/App';
import _routes from './routes';

// Store Initialization
// ------------------------------------
const epic = createEpicMiddleware();
const loader = createLoader();
const store = createStore(global.__INITIAL_STATE__, compose(applyMiddleware(epic), enhancerLoader(loader)));
const routes = createRoutes(_routes)(store, epic);
const history = createHistory();
// Render Setup
// ------------------------------------
const MOUNT_NODE = global.document.getElementById('app');

let render = (elem) => {
  ReactDOM.render(<App {...{
    history, store, routes, loader
  }} />, elem);
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
        renderApp(MOUNT_NODE);
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
      render(MOUNT_NODE);
    }));
  }
}

// Let's Go!
// ------------------------------------
// if (!__TEST__) render();
//
render(MOUNT_NODE);

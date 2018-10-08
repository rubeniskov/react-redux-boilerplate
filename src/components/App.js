import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Router, Switch, Route} from 'react-router';
import LoaderProvider from './LoaderProvider';

export default ({
  store, routes, history, layout, loader, ...rest
}) => (
  <StoreProvider store={store}>
    <LoaderProvider loader={loader}>
      <Router history={history}>
        <Switch>
          {routes.map((route, key) => {
            const {component, layout, ...props} = route;
            const Layout = layout || (({children}) => (<div>{children}</div>));
            const Component = component;
            return (
              <Route
                key={key}
                component={() => (<Layout><Component /></Layout>)}
                {...props} />
            );
          })}
        </Switch>
      </Router>
    </LoaderProvider>
  </StoreProvider>
);

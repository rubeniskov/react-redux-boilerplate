import {applyMiddleware, compose} from 'redux';
import {Subject} from 'rxjs';


export const createLoaderMiddleware = loader => (store) => {
  const action$ = new Subject();
  loader.subscribe = fn => action$.subscribe((action) => {
    fn(action, store.getState());
  });
  return next => (action) => {
    action$.next(action);
    return next(action);
  };

};

export default loader => createStore => (reducer, initialState, enhancer = (a => a)) => createStore(reducer, initialState, compose(applyMiddleware(createLoaderMiddleware(loader)), enhancer));

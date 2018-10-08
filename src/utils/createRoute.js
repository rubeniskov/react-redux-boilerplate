import Loadable from 'react-loadable';
import injectAsyncReducer from './injectAsyncReducer';
import injectAsyncEpic from './injectAsyncEpic';

export default (name, {
  component, loading = () => 'Loading...', reducer, epic, ...props
}) => (store, epicMiddleware) => ({
  key: name,
  component: Loadable({
    loading,
    loader: () => {
      const ret = component(),
        [cmp, {reducer, epic}] = ret.length ? ret : [ret, {}];
      return Promise.all([cmp, reducer, epic]).then(([cmp, reducer, epic]) => {
        if (reducer) injectAsyncReducer(store, name, reducer.default || reducer);
        if (epic) injectAsyncEpic(epicMiddleware, epic.default || epic);
        return (cmp.default || cmp);
      }, console.log);
    }
  }),
  ...props
});

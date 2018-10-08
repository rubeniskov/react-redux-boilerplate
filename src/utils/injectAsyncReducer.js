import injectReducer from '@local/utils/injectReducer';

export default(store, key, reducer) => Promise.resolve(reducer).then(reducer => injectReducer(store, key, reducer.default || reducer));

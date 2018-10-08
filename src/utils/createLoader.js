

export default opts => ({
  subscribe: () => {
    console.warn('// WARNING: You must provide the enhancerLoader into createStore to subscribe the redux events');
  }
});

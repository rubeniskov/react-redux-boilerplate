

export default routes => (store, epic) => routes.map(route => route(store, epic));

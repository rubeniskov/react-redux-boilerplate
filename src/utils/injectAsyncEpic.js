import injectEpic from '@local/utils/injectEpic';

export default(epicMiddleware, epic) => Promise.resolve(epic).then(epic => injectEpic(epicMiddleware, epic));

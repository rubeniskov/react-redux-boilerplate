export default (epicMiddleware, epic) => epicMiddleware && epic && epicMiddleware.run(epic);

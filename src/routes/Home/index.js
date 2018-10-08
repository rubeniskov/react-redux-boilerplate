import LayoutMain from '@local/layouts/LayoutMain';
import createRoute from '@local/utils/createRoute';

export default createRoute('home', {
  path: '/',
  layout: LayoutMain,
  component: () => [
    import('./components/HomeView'), {
      reducer: import('./reducers'),
      epic: import('./epics')
    }]
});

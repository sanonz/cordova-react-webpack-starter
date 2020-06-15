import HomePage from './components/pages/HomePage/';
import ListPage from './components/pages/ListPage/';
import AboutPage from './components/pages/AboutPage/';
import PullToRefreshPage from './components/pages/PullToRefreshPage/';

const routes = [{
  path: '/',
  component: HomePage,
}, {
  path: '/list',
  component: ListPage,
}, {
  path: '/about',
  component: AboutPage,
}, {
  path: '/pull-to-refresh',
  component: PullToRefreshPage,
}];

export default routes;

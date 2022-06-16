import Home from './pages/Home.js';
import Life from './pages/Life.js';
import Trip from './pages/Trip.js';
import NotFound from './pages/NotFound.js';
import Food from './pages/Food';
import Culture from './pages/Culture';
import { $ } from './util/util';

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/life', view: Life },
    { path: '/food', view: Food },
    { path: '/trip', view: Trip },
    { path: '/culture', view: Culture },
  ];

  const pageMatches = routes.map(route => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);
  if (match) {
    return match.route.view;
  } else {
    new NotFound($('#root'));
  }
};
export default router;

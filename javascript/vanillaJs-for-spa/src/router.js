import Home from './pages/Home.js';
import Life from './pages/Life.js';
import Trip from './pages/Trip.js';
import NotFound from './pages/NotFound.js';
import Food from './pages/Food.js';
import Culture from './pages/Culture.js';
import { $ } from './util/util.js';
import Bookmark from './pages/Bookmark.js';

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/life', view: Life },
    { path: '/food', view: Food },
    { path: '/trip', view: Trip },
    { path: '/culture', view: Culture },
    { path: '/bookmark', view: Bookmark },
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

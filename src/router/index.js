import VueRouter from 'vue-router';
import Home from '../spa/Home';

function load(path) {
  return () => System.import(`${path}.vue`);
}

export const routes = [
  // {
  //   path: '/',
  //   name: 'Hello',
  //   component: Hello,
  // },
  {
    path: '/',
    // path: '/busapp-pwa/',
    component: Home,
    children: [
      {
        path: 'map',
        name: 'map',
        component: load('../spa/map/Map'),
      },
      {
        path: 'form',
        name: 'form',
        component: load('../spa/route/Form'),
      },
    ],
  },
];

export const VueRouterObject = {
  routes,
  // mode: 'history',
  saveScrollPosition: true,
};

export const router = new VueRouter(VueRouterObject);

export default VueRouterObject;

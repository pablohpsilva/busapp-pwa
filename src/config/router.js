import VueRouter from 'vue-router';

import Home from '../spa/Home';
import Map from '../spa/map/Map';
import NotFound from '../spa/NotFound';

/* eslint-disable import/prefer-default-export */
export const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/map',
    children: [
      {
        path: 'map',
        name: 'map',
        component: Map,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export const VueRouterObject = {
  routes,
  mode: 'history',
  saveScrollPosition: true,
};

export const router = new VueRouter(VueRouterObject);

export default VueRouterObject;

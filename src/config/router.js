import VueRouter from 'vue-router';

import Home from '../spa/Home';
import Map from '../spa/map/Map';
import Form from '../spa/route/Form';
import NotFound from '../spa/NotFound';

/* eslint-disable import/prefer-default-export */
export const routes = [
  {
    // path: '/busapp-pwa',
    path: '/busapp-pwa/',
    component: Home,
    children: [
      {
        path: 'map',
        name: 'map',
        component: Map,
      },
      {
        path: 'form',
        name: 'form',
        component: Form,
      },
    ],
  },
  // {
  //   path: '*',
  //   component: NotFound,
  // },
];

export const VueRouterObject = {
  routes,
  mode: 'history',
  saveScrollPosition: true,
};

export const router = new VueRouter(VueRouterObject);

export default VueRouterObject;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import City from '../views/city/city.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // 首页城市列表
  {
    path: '/city/:cityId',
    name: 'City',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "City" */ '../views/city/city.vue'),
  },
  // 所有商铺列表
  {
    path: '/msite',
    name: 'Msite',
    component: () => import(/* webpackChunkName: "Msite" */ '../views/msite/msite.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;

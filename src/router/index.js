import Vue from 'vue';
import VueRouter from 'vue-router';
import Join from '../views/Join.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'join',
    component: Join,
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/Chat.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

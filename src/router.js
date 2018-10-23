import Vue from 'vue'
import store from './store.js'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Test from './views/Test.vue'

Vue.use(Router)

const if_isNotAuth = (to, from, next) => {
  if (!store.getters.is_loggued) {
    next();
    return ;
  }
  next('/dashboard');
}

const if_isAuth = (to, from, next) => {
  if (store.getters.is_loggued) {
    next();
    return ;
  }
  next('/');
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: if_isNotAuth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: if_isAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: if_isAuth
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

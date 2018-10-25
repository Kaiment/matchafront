import Vue from 'vue'
import store from './store.js'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Settings from './views/Settings.vue'
import Profile from './views/Profile.vue'
import Change_password from './views/Change_password.vue'
import Change_email from '@/views/Change_email.vue'
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
      path: '/settings',
      component: Settings,
      children: [
        {
          path: 'profile',
          component: Profile,
          beforeEnter: if_isAuth
        },
        {
          path: 'change_password',
          component: Change_password,
          beforeEnter: if_isAuth
        },
        {
          path: 'change_email',
          component: Change_email,
          beforeEnter: if_isAuth
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Login from '@/views/login/index'
import Live from '@/views/live/index'
import Playback from '@/views/playback/index'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [{
          path: 'live',
          name: 'Live',
          component: Live
        },{
          path: 'playback',
          name: 'Playback',
          component: Playback
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }    
  ]
});

// 全局拦截，验证是否登录
router.beforeEach((to, from, next) => {
  var userPath = '/login';
  if (to.path === userPath) {
    sessionStorage.removeItem('username');
  }
  var user = sessionStorage.getItem('username');
  if (!user && to.path !== userPath) {
    next({ path: userPath})
  } else {
    next();
  }
});

export default router

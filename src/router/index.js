import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const title = '| Simple User Board'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: `Find ${title}`
    }
  },
  {
    path: '/following',
    name: 'following',
    component: Home,
    meta: {
      title: `Following ${title}`
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Home,
    meta: {
      title: `Search ${title}`
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

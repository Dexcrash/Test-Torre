import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'TeamForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamForm.vue')
  },
  {
    path: '/results',
    name: 'TeamResults',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamResults.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

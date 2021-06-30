import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Testing from "../components/Testing.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '/triangle', component: Testing },
      { path: '/commission', component: Testing },
      { path: '/charge', component: Testing },
      { path: '/calendar', component: Testing },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

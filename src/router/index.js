import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",   
    component: () => import("../views/login.vue"),
  },
  {
    path: "/",
    name: "login2",   
    component: () => import("../views/login2.vue"),
  },
  {
    path: "/",
    name: "login3",   
    component: () => import("../views/login3.vue"),
  },
  {
    path: "/register1",
    name: "register1",   
    component: () => import("../views/register1.vue"),
  },
  {
    path: "/register2",
    name: "register2",   
    component: () => import("../views/register2.vue"),
  },
  {
    path: "/user1",
    name: "user1",   
    component: () => import("../views/user1.vue"),
  },
  {
    path: "/user2",
    name: "user2",   
    component: () => import("../views/user2.vue"),
  },
  {
    path: "/user3",
    name: "user3",   
    component: () => import("../views/user3.vue"),
  },
  //用户主页
  {
    path: "/user1/postc",
    name: "postc",   
    component: () => import("../components/user1/postc.vue"),
  },
  {
    path: "/user1/getc",
    name: "getc",   
    component: () => import("../components/user1/getc.vue"),
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

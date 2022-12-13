import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from "@/views/ListView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/article',
    name: 'article',
    component: ArticleView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

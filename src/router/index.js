import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    name: 'home',
    path: '/home',
    // 路由的懒加载技术，也就是当你访问这个路由时，他才会加载这个路由里面的数据
    component: () => import('pages/home'),
    children: [{
      name: 'home-product',
      path: 'product/:id',
      component: () => import('pages/product')
    }]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search')
  },
  {
    path: '*',
    // 指定路由跳转的地方
    redirect: '/home'
  }
]
export default new Router({
  routes
})

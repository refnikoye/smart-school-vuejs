//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import signup from '../views/signup.vue'

//define a routes
const routes = [
    {
        path: '/',
        name: 'signup',
        component: signup
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/userlogin',
        name: 'userlogin',
        component: () => import('@/views/user_login.vue')
    },
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: () => import('@/views/admin/Index.vue')
    },
    {
        path: '/add_user',
        name: 'add_user',
        component: () => import('@/views/admin/add_user.vue')
    },
    {
        path: '/userdashboard',
        name: 'userdashboard',
        component: () => import('@/views/user/index.vue')
    },
    {
        path: '/sendmessage/:id',
        name: 'sendmessage',
        component: () => import('@/views/user/sendmessage.vue')
    },
    {
        path: '/newcomment',
        name: 'newcomment',
        component: () => import('@/components/NewComment.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router
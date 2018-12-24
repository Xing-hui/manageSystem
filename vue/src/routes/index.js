import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('components/Login.vue')
const Layout = () => import('components/Layout.vue')
const Home = () => import('components/Home.vue')
const Staff = () => import('components/Staff.vue')
const Attendance = () => import('components/Attendance.vue')
const Performance = () => import('components/Performance.vue')
const Wage = () => import('components/Wage.vue')
const Notice = () => import('components/Notice.vue')

export const asyncRouterMap = [
    {
        path: '/customer',
        name: '员工管理',
        component: Layout,
        redirect: '/customer/list',
        children: [
            {
                path: 'list',
                name: '员工列表',
                component: Staff,
            }
        ]
    },
    {
        path: '/product',
        component: Layout,
        name: '出勤管理',
        redirect: '/product/category_list',
        children: [
            {
                path: 'category_list',
                name: '出勤列表',
                component: Attendance
            }
        ]
    },
    {
        path: '/order',
        component: Layout,
        name: '绩效管理',
        redirect: '/order/list',
        children: [
            {
                path: 'list',
                name: '绩效列表',
                component: Performance
            }
        ]
    },
    {
        path: '/price',
        component: Layout,
        name: '消息管理',
        redirect: '/price/list',
        children: [
            {
                path: 'list',
                name: '消息列表',
                component: Notice
            }
        ]
    },
    {
        path: '/finance',
        component: Layout,
        name: '工资管理',
        redirect: '/finance/list',
        children: [
            {
                path: 'list',
                name: '工资列表',
                component: Wage
            }
        ]
    }
]

export const constantRouterMap = [
    {
        path: '/login',
        name: '登录',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        name: '',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: '首页',
                component: Home
            }
        ]
    }
]

export default new VueRouter({routes: constantRouterMap})
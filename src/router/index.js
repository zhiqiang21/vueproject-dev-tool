/**
 * @file app路由入口文件
 * @date 2019/03/20
 * @author hpuhouzhiqiang@didiglobal.com
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


// 路由按需打包+加载
export const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/home',
            component: () => import(/* webpackChunkName: "home" */ '../routes/home/')
        },
        {
            path: '/others',
            component: () => import(/* webpackChunkName: "others" */ '../routes/others')
        }
    ]
});

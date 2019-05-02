/**
 * @file home子页面路由引入方式
 * @date 2019/03/20
 * @author hpuhouzhiqiang@gmail.com
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from './index.vue';

Vue.use(VueRouter);


// 路由按需打包+加载
export const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        // 路由同步加载
        {
            path: '/',
            component: IndexPage
        },
        // 路由按需加载
        {
            path: '/aa',
            component: () => import(/* webpackChunkName: "aa" */ './children/aa.vue')
        },
        {
            path: '/bb',
            component: () => import(/* webpackChunkName: "bb" */ './children/bb.vue')
        }
    ]
});

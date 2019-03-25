/**
 * @file 页面的入口文件
 * @date 2019/03/19
 * @author hpuhouzhiqiang@didiglobal.com
 */

import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';

import * as CustomFilters from './common/js/filters';


// 构建全局的fiters
Object.keys(CustomFilters).forEach(item => {
    Vue.filter(item, CustomFilters[item]);
});

console.log('*************process.env.NODE_ENV****************');
console.log(process.env.NODE_ENV);
console.log('*******************************');


new Vue({
    store,
    el: '#passenger-wallet-app',
    router,
    render: h => h(App)
});
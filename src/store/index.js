/**
 * @file vuex初始化文件
 * @date 2019/03/25
 * @author hpuhouzhiqiang@didiglobal.com
 */

import vue from 'vue';
import vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
// import state from './state';
import mutations from './mutations';

vue.use(vuex);

const envString = process.env.NODE_ENV !== 'production';

const STORAGE_KEY = 'passenger-wallet';

const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        window.localStorage && window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
};


const loadStorage = key => {
    let resultData = {};

    if (window.localStorage) {
        resultData = JSON.parse(window.localStorage.getItem(key) || '{}');
    }
    return resultData;
};


export default new vuex.Store({
    actions,
    getters,
    state: loadStorage(STORAGE_KEY),
    mutations,
    // true 严格模式下任何错误都会被开发者工具捕捉到
    strict: envString,
    plugins: [localStoragePlugin]
});
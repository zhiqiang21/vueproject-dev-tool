/**
 * @file 页面的入口文件
 * @date 2019/03/19
 * @author hpuhouzhiqiang@gmail.com
 */

import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import App from './App.vue';
import {router} from './router';
import '../../lib/flexable';
import * as baseConfig from '../../../base.config';
import * as CustomFilters from '../../common/js/filters';
import initCubeComponent from '../../common/js/cube';
import {urlQuery} from '../../common/js/url';
import pageInit from '../../common/js/pageInit';

// 支持的语言包不支持默认加载英文语言包
const enableLangPackage = [
    'en-US',
    'es-MX'
];

const langString = enableLangPackage.indexOf(urlQuery.lang) > -1 ? urlQuery.lang : 'en-US';

// import VConsole from 'vconsole';
// const vConsole = new VConsole();

Vue.use(VueI18Next);

initCubeComponent();

// 构建全局的fiters
Object.keys(CustomFilters).forEach(item => {
    Vue.filter(item, CustomFilters[item]);
});

import(/* webpackChunkName: "[request]" */  `./lang/${langString}`)
    .then(({default: lang}) => {
        i18next.init({
            lng: langString,
            fallbackLng: langString,
            resources: {[langString]: {translation: lang} }
        });

        const i18n = new VueI18Next(i18next);

        pageInit.init({title: lang.title || 'test'});

        new Vue({
            el: '#app',
            router,
            i18n: i18n,
            render: h => h(App)
        });
    });

/**
 * @file cube ui 组件引入统一配置文件
 * @date 2019/04/02
 * @author hpuhouzhiqiang@gmail.com
 */

/* eslint-disable  */
import Vue from 'vue';
import {
    Style,
    Toast,
    Loading,
    Scroll,
    createAPI
} from 'cube-ui';


export default function initCubeComponent() {
    Vue.use(Loading);
    Vue.use(Scroll);
    createAPI(Vue, Toast, ['timeout'], true);
}

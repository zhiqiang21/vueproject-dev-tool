/**
 * @file cube ui 组件引入统一配置文件 建议这里只引入每个页面使用的基础组件，对于复杂的组件比如scroll datepicer组件
 * 在页面中单独引入，然后在webpack中同过 minChunk 来指定当这些比较大的组件超过 x 引用数时才打进common中否则单独打包进页面的js中
 * @date 2019/04/02
 * @author hpuhouzhiqiang@gmail.com
 */

/* eslint-disable  */
import Vue from 'vue';
import {
    Style,
    Toast,
    Loading,
    // Scroll,
    createAPI
} from 'cube-ui';


export default function initCubeComponent() {
    Vue.use(Loading);
    // Vue.use(Scroll);
    createAPI(Vue, Toast, ['timeout'], true);
}

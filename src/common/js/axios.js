/**
 * @file axios polyfill 写法
 * @date 2019/03/25
 * @author hpuhouzhiqiang@didiglobal.com
 */

import axios from 'axios';
import URLSearchParams from '@ungap/url-search-params';

const params = new URLSearchParams();
const timeString = (new Date()).getTime();

// 重写get 方法给请求添加时间戳房子webview缓存请求结果
axios.get = function (url, getParams) {
    if (getParams) {
        getParams['t'] = timeString;
        return axios.get(url, {params: getParams});
    }
};

// axios post提交数据的方的polyfill写法 以及添加时间戳 支付宝的webview post请求也会缓存
axios.post = function (url, postParams) {
    if (postParams) {
        for (let item in postParams) {
            if (postParams.hasOwnProperty(item)) {
                params.append(item, postParams[item]);
            }
        }
        params.append('t', timeString);

        return  axios.post(url, params);
    }
};

export default axios;
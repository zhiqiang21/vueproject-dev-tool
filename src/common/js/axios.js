/**
 * @file axios 添加时间戳
 * @date 2019/03/25
 * @author hpuhouzhiqiang@gmail.com
 */

import axios from 'axios';
import * as addHttpHeader from './header';

const timeString = (new Date()).getTime();

// 给请求添加公共的header 参数

axios.headers = {common: {'didi-header-hint-content': addHttpHeader.hintContentStr} };


// 重写get 方法给请求添加时间戳房子webview缓存请求结果
export axios.get = function (url, getParams) {
    if (getParams) {
        getParams['t'] = timeString;
        return axios.get(url, {params: getParams});
    }
};

// axios post 添加时间戳 一些webview会缓存post请求
// babel-preset-env 兼容了URLSearchParams
export axios.post = function (url, postParams) {
    // const reqPostUrl = addHttpHeader.addLocationParams(url);
    if (postParams) {
        postParams['t'] = timeString;
        return axios.post(url, postParams);
    }
};

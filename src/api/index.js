/**
 * @file api接口文件目录
 * @date 2019/03/25
 * @author hpuhouzhiqiang@gmail.com
 */

import axios from 'axios';
import qs from 'qs';
import {urlQuery} from '../common/js/url';
import {reqDomainHost} from './host';


// _set(axios, 'defaults.headers.common.didi-header-hint-content', addHttpHeader.hintContentStr);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(function (config) {
    const postData = Object.assign({}, urlQuery, config.data, {vt: (new Date()).getTime()});

    if (config.method.toLowerCase() === 'post') {
        config.data = qs.stringify(postData);
    }

    if (config.method.toLocaleLowerCase() === 'get') {
        config.params = Object.assign({}, config.params, {vt: (new Date()).getTime()});
    }

    // 为请求的url添加公共参数
    config.url = addHttpHeader.addLocationParams(config.url);

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 获取充值码信息
 *
 * @export
 * @param {*} params 获取充值码信息
 */
export function chargeMoney(params) {
    const url = `${reqDomainHost}/test/api`;

    return axios.post(url, params);
}

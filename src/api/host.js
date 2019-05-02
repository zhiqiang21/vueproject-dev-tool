/**
 * @file 根据配置返回访问接口的域名
 * @date 2019/04/26
 * @author hpuhouzhiqiang@gmail.com
 */
import {mockDataIsUse, useOffLineData} from '../../base.config';

// mock数据地址
// 使用在线的mock数据的工具
const mockApiHost = `//di-mock.com/mock/246`;

// 线上接口域名
const onlineDomain = `//pay.didiglobal.com`;

// 与后端联调环境域名
const offLineDomain = `//10.179.88.37:9050`;

export let reqDomainHost = onlineDomain;

if (process.env.NODE_ENV === 'development') {
    if (mockDataIsUse) {
        reqDomainHost = mockApiHost;
    }

    if (useOffLineData) {
        reqDomainHost = offLineDomain;
    }
}

/**
 * @file api接口文件目录
 * @date 2019/03/25
 * @author hpuhouzhiqiang@didiglobal.com
 */

import axios from '../common/js/axios';


/**
 * 充值页面
 *
 * @export
 * @param {*} params 充值的参数
 */
export function chargeMoney(params) {
    return axios.post(`/external/wallet/test`, params);
}

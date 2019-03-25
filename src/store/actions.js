/**
 * @file 业务调用的action
 * @date 2019/03/25
 * @author hpuhouzhiqiang@didiglobal.com
 */

import * as mutaTypes from './mutation-types';

export const addLocalFn = function ({commit}) {
    commit(mutaTypes.ADD_LOCAL);
};
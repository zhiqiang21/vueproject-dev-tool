/**
 * @file 根据动作更新store中的数据
 * @date 2019/03/25
 * @author hpuhouzhiqiang@didiglobal.com
 */

import * as mutaTypes from './mutation-types';

export default {
    [mutaTypes.ADD_LOCAL](state, local) {
        state.local = local;
    }
};
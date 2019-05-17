/**
 * @file 页面加载的语言包
 * @date 2019/05/07
 * @author hpuhouzhiqiang@gmail.com
 */

import {urlQuery} from './url';

// 支持的语言包不支持默认加载英文语言包 value为在页面内import的语言包的变量的名字
const enableLangPackage = {
    'en-US': 'enUS',
    'es-MX': 'esMX'
};


export function retlangAndString(langObj = {}) {
    let langString = 'en-US';

    if (enableLangPackage.hasOwnProperty(urlQuery.lang)) {
        langString = urlQuery.lang;
    }

    const lang = langObj[enableLangPackage[langString]];

    return {
        lang,
        langString
    };

}
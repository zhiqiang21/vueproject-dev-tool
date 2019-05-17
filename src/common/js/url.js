function parse(url = location.search) {
    const obj = {};
    const arr = url.match(new RegExp('[?&][^?&]+=[^?&]+', 'g')) || [];

    if (arr.length) {
        arr.forEach(item => {
            const pairs = item.substring(1).split('=');
            const key = decodeURIComponent(pairs[0]);
            const val = decodeURIComponent(pairs[1]);
            obj[key] = val;
        });
    }

    // 如果hash 后也有以为好开头的字符串
    // http://127.0.0.1:8081/pay_account/pay_account.html?token=x#/phone?token=x&opename=Telcel&opeclass=telcel-icon
    const hashString = location.hash || '';


    if (hashString) {
        const queryStringArr = hashString.substring(hashString.indexOf('?') + 1).split('&');

        queryStringArr.forEach(item => {
            const itemArr = item.split('=');

            if (!obj[itemArr[0]]) {
                obj[itemArr[0]] = itemArr[1];
            }
        });
    }

    return obj;
}
export const parseUrl = parse;
export const urlQuery = {...parse()};

export const commonParam = {};
['lang', 'biz_type', 'utc_offset', 'origin_id', 'maptype'].forEach(key => {
    commonParam[key] = urlQuery[key] || '';
});


function addJointUrlParams() {
    /* eslint-disable */
  const { appversion = '', location_country = '', location_cityid = '', trip_country = '', trip_cityid = '', cityid = '' } = urlQuery
  return `appversion=${appversion}&location_country=${location_country}&location_cityid=${location_cityid}&trip_country=${trip_country}&trip_cityid=${trip_cityid}&cityid=${cityid}`
}
export const jointUrlParams = addJointUrlParams()

export const CreateUrl = function CreateUrl({
  url = '',
  queryObj = {},
  hash = ''
} = {}) {
  if (!url) { return false }
  const queryTag = url.indexOf('?')
  const hashTag = url.indexOf('#')
  const queryObjKeys = Object.keys(queryObj)
  const arr = url.split('#')
  let result = ''
  let appendQueryString = ''
  let posTag = '?'
  let hashName = hashTag === -1 ? '' : `#${arr[1]}`
  if (queryObjKeys.length) {
    queryObjKeys.forEach((i) => {
      if (queryObj[i] != null) {
        appendQueryString += `${i}=${queryObj[i]}&`
      }
    })
    appendQueryString = appendQueryString.replace(/&$/, '')
  }
  if (queryTag > -1) {
    posTag = '&'
  }
  if (queryTag === -1 && queryObjKeys.length === 0) {
    posTag = ''
  }
  if (hash) {
    hashName = `#${hash}`
  }
  result = `${arr[0]}${posTag}${appendQueryString}${hashName}`
  return result
}

export default {
  parse,
  parseUrl,
  commonParam,
  CreateUrl
}

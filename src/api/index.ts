/*
 * @Author: dyr
 * @Description: api 接口调用
 * @Date: 2019-06-10 14:52:23
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 13:49:55
 */

import uniRequest from '@/common/request';

const isMock = false;
const API_URL = {
  MOCK_URL: 'http://localhost:3000/',
};

/**
 * @description: 获取用户openId
 * @param {string} jsCode 通过wx.login接口返回的code码
 * @param {boolean} needupdate，如果是true，则会自动把该用户在系统内创建或者更新
 * @return: Promise
 */
export function fetchOpenId(jsCode: string) {
  return uniRequest({
    url: `${isMock ? API_URL.MOCK_URL : API_URL.MOCK_URL}wp-json/qiyi-wp-api/v1/weixin/getopenid?js_code=${jsCode}`,
  });
}

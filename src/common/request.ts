/*
 * @Author: dyr
 * @Description: 接口请求封装 TODO:还不完善 需后续根据实际情况优化
 * @Date: 2019-06-10 13:14:46
 * @LastEditors: dyr
 * @LastEditTime: 2019-06-13 16:30:26
 */

interface Options {
  header?: any;
  method?: string;
  dataType?: string;
  responseType?: string;
  success?: Function;
  fail?: Function;
  complete?: Function;
  isBuildUrl?: boolean; // 是否需要拼接参数到请求的url上
}
// 设置接口请求参数字段
interface RequestParam {
  url: string;
  urlParams?: object;
  method?: string;
  data?: object;
  options?: Options;
}
/**
 *
 * @param url : 接口路径
 * @param method : 请求方法
 * @param data : 传递的数据
 * @param options : 可以覆盖header
 * @param prefix : 接口额外的前缀
 */
export default async function({ url, method, data, options }: RequestParam) {
  // 默认值
  const defaultOtions: Options = {
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
    isBuildUrl: true,
  };

  // 新的请求url
  const newUrl: string = options && options.isBuildUrl ? url : url;
  // deviceId请求时默认加上
  const deviceId = uni.getStorageSync('visitorId');
  const requestObject: any = {
    url: newUrl,
    ...defaultOtions,
    ...options,
    method,
    data: { ...data, deviceId },
  };
  return new Promise((resolve, reject) => {
    uni.request({
      ...requestObject,
      success: (res: any) => {
        if (res.statusCode === 200) resolve(res.data);
        reject(res);
      },
      fail: (error: any) => {
        reject(error);
      },
    });
  });
}

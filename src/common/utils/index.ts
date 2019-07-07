/*
 * @Author: dyr
 * @Description: 公用方法
 * @Date: 2019-06-10 13:17:21
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 13:53:06
 */
import { Md5 } from '@/common/md5';
import uniStorage from '@/common/storage';
import { fetchOpenId } from '@/api/index';
/**
 * @description: 利用Proxy链式取值
 * let c = {a: {b: [1, ,2 ,3]}}
 * pointer(c).a();  // {b: [1,2,3]}
 * pointer(c).a.b(); // [1,2,3]
 * pointer(d).a.b.d('default value');  // default value
 */

export function pointer(obj: any, path = []): any {
  return new Proxy(() => {}, {
    get(_target, property: any) {
      return pointer(obj, path.concat(property));
    },
    apply(_target, _self, args) {
      let val = obj;
      for (let i = 0; i < path.length; i++) {
        if (val === null || val === undefined) break;
        val = val[path[i]];
      }
      if (val === null || val === undefined) {
        val = args[0];
      }
      return val;
    },
  });
}
/**
 * @description:获取节点的相关信息
 * @param {string} id 节点id
 * @param {object} fields 节点字段
 * @return {Promise} Promise
 */
export function getElementFields(
  id: string,
  fields: object = { dataset: true, size: true, scrollOffset: true, rect: true, id: true },
) {
  return new Promise(resolve => {
    uni
      .createSelectorQuery()
      .select(id)
      .fields(fields, (res: object) => {
        if (res) {
          resolve(res);
        } else {
          resolve({});
        }
      })
      .exec();
  });
}
/**
 * openid不存在，随机生成一个游客id，随机生成一个存到localstorage 也可以作为deviceId
 */
export function getVisitorId() {
  const globalData = JSON.parse(uniStorage.get('globalData') || '{}');
  let systemInfo: any = {};
  if (!globalData.systemInfo) {
    systemInfo = uni.getSystemInfoSync();
  } else {
    systemInfo = globalData.systemInfo;
  }
  const { system, version, platform } = systemInfo;
  try {
    let visitorId = uniStorage.get('visitorId');
    if (!visitorId) {
      visitorId = Md5.hashStr((Date.now() + Math.random() + system + version + platform).toString());
      try {
        uniStorage.set('visitorId', visitorId);
      } catch (e) {}
    }
    return visitorId;
  } catch (error) {
    let visitorId: any = Md5.hashStr((Date.now() + Math.random() + system + version + platform).toString());
    try {
      uniStorage.set('visitorId', visitorId);
      return visitorId;
    } catch (e) {}
  }
}
// 获取用户唯一openId
export async function getOpenId() {
  const openId = uniStorage.get('openId');
  if (openId) {
    return openId;
  }
  const res: any = await uni.login();
  if (res && res[1] && res[1].code) {
    const data: any = await fetchOpenId(res[1].code);
    if (data && data.code === 'success' && data.openid) {
      uniStorage.set('openId', data.openid);
      return data.openId;
    }
    return '';
  }
}
/**
 * @description: 获取设备类型
 * @param {string}
 * @return: {Object}
 */
export const getPhoneType = (systemInfo: any) => {
  const system = systemInfo.system;
  const isAndroid = system && system.toLocaleLowerCase().includes('android');
  const isIOS = system && system.toLocaleLowerCase().includes('ios');
  const isIPX = systemInfo && systemInfo.model.toLocaleLowerCase().includes('iphone x');
  return {
    isAndroid,
    isIOS,
    isIPX,
  };
};
// 获取设备系统信息
export function getSystemInfo() {
  try {
    return uni.getSystemInfoSync();
  } catch (error) {
    return {};
  }
}
/**
 * @description: 转换驼峰拼写的字符串为特定格式
 * example:
 * fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
 * fromCamelCase('someLabelThatNeedsToBeCamelized', '-'); // 'some-label-that-needs-to-be-camelized'
 * fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
 * @param {string} str
 * @param {string} separator 分隔符
 * @return: string
 */
export const fromCamelCase = (str: string = '', separator = '_') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

/**
 * @description: 字符串的下划线格式转驼峰格式
 * eg：underlineToCamelCase('hello_world') => helloWorld
 * @param {string} str
 * @return: string
 */
export const underlineToCamelCase = (str: string = '') =>
  str.replace(/_(\w)/g, function(_all, letter) {
    return letter.toUpperCase();
  });

/**
 * @description: JSON对象的key值转换为驼峰式
 * @param {object} obj
 * @return: object
 */
export const jsonToCamelCase = (obj: any) => {
  // 数组
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    obj.forEach((v: any) => {
      jsonToCamelCase(v);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(function(key: string) {
      const newKey = underlineToCamelCase(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      jsonToCamelCase(obj[newKey]);
    });
  }
  return obj;
};

/**
 * @description: JSON对象的key值转换为下划线格式
 * @param {object} obj
 * @return: object
 */
export const jsonToUnderline = (obj: any) => {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    obj.forEach(function(v: any) {
      jsonToUnderline(v);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    Object.keys(obj).forEach(function(key) {
      const newKey = fromCamelCase(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      jsonToUnderline(obj[newKey]);
    });
  }
  return obj;
};
/**
 * 保留小数点后N位
 * @export roundFun
 * @param {*} number 数字
 * @param {*} n 位数
 * @returns number
 */
export function roundFun(number: number, n: number) {
  return Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
}
// localstorage  获取openid
export const getStorageOpenId = (): string => uniStorage.get('openId') || '';

/**
 * @description: 获取设备权限
 * @param {string} scope 需要获取权限的 scope
 * @return: Promise<boolean>
 */
export const getAuthSetting = (scope: string): Promise<boolean> => {
  return new Promise(resolve => {
    uni.authorize({
      scope,
      success() {
        resolve(true);
      },
      fail() {
        resolve(false);
      },
    });
  });
};

/**
 * @description: 保存图片到相册
 * @param {string} imgUrl 图片url
 * @return: Promise<boolean>
 */
export const saveImageToPhotosAlbum = (imgUrl: string): Promise<boolean> => {
  return new Promise((resolve, rejecet) => {
    uni.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success() {
        resolve(true);
      },
      fail() {
        rejecet(false);
      },
    });
  });
};

// 获取网络类型
export const getNetworkType = () => {
  return new Promise(resolve => {
    uni.getNetworkType({
      success: function(res) {
        resolve(res.networkType);
      },
      fail: function() {
        resolve('none');
      },
    });
  });
};
/**
 * @description: 获取url问号后的参数，返回一个object
 * @param {type}
 * @return:{Object}
 */
export const getURLParameters = (url: any): any => {
  const urlList = url.match(/([^?=&]+)(=([^&]*))/g);
  return urlList
    ? urlList.reduce(
        (k: any, v: any /*eslint indent: "off"*/) => (
          (k[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), k /*eslint no-sequences: off*/
        ),
        {},
      )
    : {};
};

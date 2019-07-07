/*
 * @Author: dyr
 * @Description: storage基类
 * @Date: 2019-06-11 19:49:35
 * @LastEditors: dyr
 * @LastEditTime: 2019-06-11 19:51:43
 */

class UniStorage {
  set(key: string, value: string) {
    try {
      uni.setStorageSync(key, value);
    } catch (e) {}
  }
  // 获取key值
  get(key: string) {
    if (!key) {
      return this._getAll();
    }
    return this._getSingle(key);
  }
  // 移除key值
  remove(key: string) {
    if (!key) {
      return this._removeAll();
    }
    return this._removeSingle(key);
  }
  // 获取所有key
  _getAll() {
    try {
      return uni.getStorageInfoSync();
    } catch (e) {
      return {};
    }
  }
  // 获取单个key值
  _getSingle(key: string) {
    try {
      return uni.getStorageSync(key);
    } catch (e) {}
  }
  // 移除某个key值
  _removeSingle(key: string) {
    try {
      return uni.removeStorageSync(key);
    } catch (e) {}
  }
  // 清空本地所有缓存
  _removeAll() {
    try {
      return uni.clearStorageSync();
    } catch (e) {}
  }
}
const uniStorage = new UniStorage();
export default uniStorage;

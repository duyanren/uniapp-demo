/*
 * @Author: dyr
 * @Description: 全局数据字段
 * @Date: 2019-06-24 13:24:46
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 14:37:49
 */
import { UPDATE_NETWORK_STATUS } from '@/constants/mutation-types/index';
export default {
  namespaced: true, //注意 模块化管理数据请不要忘了命名空间的开启
  state: {
    // state 类似 data 这里面写入数据
    isConnected: true, // 当前是否有网络连接
    networkType: '', // 网络类型
    // 初始化state
  },
  actions: {
    // actions 类似method  写方法对数据做出更改(异步操作)
  },
  mutations: {
    // mutations 类似methods 写方法对数据做出更改(同步操作)
    [UPDATE_NETWORK_STATUS](state, payload) {
      state.isConnected = payload.isConnected;
      state.networkType = payload.networkType;
    },
  },
  getters: {
    // getters 类似 computed 在这里面写个方法
    // 可以认为是store的计算属性 对state状态进行处理
  },
};

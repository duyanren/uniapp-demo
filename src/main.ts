/*
 * @Author: dyr
 * @Description: Vue初始化入口文件 配置全局属性
 * @Date: 2019-06-08 17:59:53
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 13:39:23
 */

import Vue from 'vue';
import App from './App.vue';
import store from '@/store/index';
import bus from '@/common/bus';

import { Bus } from './typings/global';

declare module 'vue/types/vue' {
  interface Vue {
    $bus: Bus;
  }
}
Vue.config.productionTip = false;

// 挂载事件总线到vue原型上
Vue.prototype.$bus = bus;

// 挂载store
Vue.prototype.$store = store;

new App().$mount();

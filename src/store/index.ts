import Vue from 'vue';
import Vuex from 'vuex';
import globalData from './global/index';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    globalData,
  },
});
export default store;

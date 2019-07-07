<!--
 * @Author: dyr
 * @Description: 应用配置，用来配置App全局样式以及监听
 * @Date: 2019-06-08 17:59:53
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 13:58:55
 -->

<script lang="ts">
import Vue from 'vue';
import { getPhoneType, getVisitorId, getSystemInfo, getOpenId, getNetworkType } from '@/common/utils/index';
import uniStorage from '@/common/storage';

import { UPDATE_NETWORK_STATUS } from '@/constants/mutation-types/index';

export default Vue.extend({
  mpType: 'app',
  async onLaunch() {
    getOpenId();
    // 设置全局globalData字段
    let globalData = {};
    const visitorId = getVisitorId();
    const systemInfo = await getSystemInfo();
    const phoneType = getPhoneType(systemInfo);
    globalData = { systemInfo, ...phoneType, visitorId };
    uniStorage.set('globalData', JSON.stringify(globalData));
  },
  onShow() {
    this.getNetworkType();
    this.onNetworkStatus();
  },
  onHide() {},
  methods: {
    // 监听网络变化
    onNetworkStatus() {
      uni.onNetworkStatusChange((res: any) => {
        this.$store.commit({
          type: `globalData/${UPDATE_NETWORK_STATUS}`,
          isConnected: res.isConnected,
          networkType: res.networkType,
        });
      });
    },
    // 获取网络类型
    getNetworkType() {
      getNetworkType().then((res: any) => {
        this.$store.commit({
          type: `globalData/${UPDATE_NETWORK_STATUS}`,
          isConnected: !['none', 'unknown'].includes(res),
          networkType: res,
        });
      });
    },
  },
});
</script>

<style>
/* 富文本样式 */
@import url('/components/wx-parse/parse.css');
/*每个页面公共css */
@import url('/css/common.css');
</style>

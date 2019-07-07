<!--
 * @Author: dyr
 * @Description: demo
 * @Date: 2019-06-08 17:59:53
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 14:25:48
 -->
<template>
  <view class="index">
    <view class="title">
      <text class="title-text">demo</text>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import uParse from '@/components/wx-parse/parse.vue';

@Component({
  components: {
    uParse,
  },
})
export default class Home extends Vue {
  onLoad() {}
}
</script>

<style lang="less">
.title {
  padding: 46upx 54upx 44upx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title-text {
    font-family: PingFangSC-Semibold;
    font-size: 30upx;
    color: #333333;
    line-height: 50upx;
  }
}
</style>

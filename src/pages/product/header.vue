<template>
  <my-navbar title="商品详情" class="header">
    <i class="iconfont icon-msg" slot="left"></i>
    <i class="iconfont icon-msg" slot="right"></i>
  </my-navbar>
</template>

<script>
import MyNavbar from 'base/navbar'

export default {
  name: 'product-header',
  components: {
    MyNavbar
  }
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .header {
        background-color: $header-bgc-translucent;
        color: $icon-color-default;
      .iconfont {
        font-size: $icon-font-size;
      }
    }
</style>

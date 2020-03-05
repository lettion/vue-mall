<template>
  <me-navbar class="header">
    <my-search slot="center"
               fake
               @click.native="gotoSearch"
    >
    </my-search>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>
<script>
import MeNavbar from 'base/navbar'
import MySearch from 'base/search-box'
export default {
  name: 'CategoryHeader',
  components: {
    MeNavbar,
    MySearch
  },
  methods: {
    gotoSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>

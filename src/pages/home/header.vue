<template>
  <my-navbar class="header" title="" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <my-search slot="center"
               placeholder="请输入搜索内容"
               @query="getQuery"
               fake
               @click.native="gotoSearch"
    >
    </my-search>
    <i class="iconfont icon-msg" slot="right"></i>
  </my-navbar>
</template>

<script>
import mySearch from 'base/search-box'
import MyNavbar from 'base/navbar'
export default {
  name: 'HomeHeader',
  components: {
    MyNavbar,
    mySearch
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    getQuery (query) {
      console.log(query)
    },
    gotoSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .header{
    &.mine-navbar{
      background-color: transparent;
      transition: background-color 0.5s;
    }
    &.header-transition{
      background-color: $header-bgc-translucent;
    }
    .iconfont{
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>

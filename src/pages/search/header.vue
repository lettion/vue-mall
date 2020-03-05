<template>
  <my-navbar>
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <my-search
      slot="center"
      placeholder="开学季有礼，好货五折起"
      @query="query"
    ></my-search>
  </my-navbar>
</template>

<script>
import MyNavbar from 'base/navbar'
import MySearch from 'base/search-box'
export default {
  name: 'SearchHeader',
  components: {
    MyNavbar,
    MySearch
  },
  methods: {
    query (query) {
      this.$emit('query', query)
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    border-bottom: 1px solid $border-color;

    .iconfont{
      color: $icon-color;
      font-size: $icon-font-size;
    }

    .mine-search-box-wrapper {
      background-color: #f7f7f7;
    }
  }
</style>

<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
          <search-header @query="getQuery"/>
      </header>
      <div class="g-content-container">
        <my-scroll ref="scroll">
          <search-hot v-show="!query" @loaded="updateScroll"/>
          <search-history
            @show-confirm="showConfirm"
            ref="history"
            v-show="!query"
            @remove-item="updateScroll"
          />
          <search-result
            v-show="query"
            :query="query"/>
        </my-scroll>
      </div>
      <my-confirm msg="确定要删除全部吗" ref="confirm" @confirm="clearSearchHistory"/>
    </div>
  </transition>
</template>

<script>
import MyConfirm from 'base/confirm'
import MyScroll from 'base/scroll'
import SearchHeader from './header'
import SearchHot from './hot'
import SearchHistory from './history'
import SearchResult from './result'

export default {
  name: 'Search',
  components: {
    MyScroll,
    SearchHeader,
    SearchHot,
    SearchHistory,
    SearchResult,
    MyConfirm
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    updateScroll () {
      this.$refs.scroll.update()
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    clearSearchHistory () {
      this.$refs.history.clear()
      this.$refs.history.update()
    },
    getQuery (query) {
      this.query = query
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .search {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .search-enter-active,
  .search-leave-enter{
    transition: all 0.3s;
  }
  .search-enter,
  .search-leave-to{
    transform: translate3d(100%,0,0);
  }
</style>

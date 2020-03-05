<template>
    <div class="home">
      <header class="g-header-container">
        <home-header :class="{'header-transition': isHeaderTransition}" ref="header"/>
      </header>
      <my-scroll :res="recommends"
                 pullDown
                 @pull-down="pullToRefresh"
                 pullUp
                 @pull-up="pullToLoadMore"
                 @scroll-end="scrollEnd"
                 ref="scroll"
                 @scroll="scroll"
                 @pull-down-transition-end="pullDownTransitionEnd"
      >
        <home-slider ref="slider"/>
        <home-nav/>
        <home-recommend @loaded="getRecommends" ref="recommend"/>
      </my-scroll>
      <div class="g-backtop-container">
        <my-backtop :visible="isBackTopVisible" @backtop="backToTop"/>
      </div>
      <router-view/>
    </div>
</template>

<script>
import HomeRecommend from './recommend'
import HomeHeader from './header'
import HomeSlider from './slider'
import MyScroll from 'base/scroll'
import HomeNav from './nav'
import myBacktop from 'base/backtop'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSlider,
    MyScroll,
    HomeNav,
    HomeRecommend,
    myBacktop
  },
  data () {
    return {
      recommends: [],
      isBackTopVisible: false,
      isHeaderTransition: false
    }
  },
  methods: {
    updataScroll () {

    },
    pullDownTransitionEnd () {
      this.$refs.header.show()
    },
    scroll (translate) {
      this.changeHeaderStatus(translate)
    },
    scrollEnd (translate, swiper, pulling) {
      this.isBackTopVisible = translate < 0 && -translate > swiper.height
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
    },
    getRecommends (recommends) {
      this.recommends = recommends
    },
    // 下拉刷新
    // 这里的end是接收到子组件传过来的数据
    pullToRefresh (end) {
      this.$refs.slider.update().then(end)
    },
    // 上拉加载更多
    pullToLoadMore (end) {
      this.$refs.recommend.update().then(end).catch(err => {
        if (err) {
          console.log(err)
          end()
        }
      })
    },
    backToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    changeHeaderStatus (translate) {
      if (translate > 0) {
        this.$refs.header.hide()
        return
      }
      this.$refs.header.show()
      this.isHeaderTransition = -translate > 100
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins.scss";
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $bgc-theme;
    .g-backtop-container{
      z-index: 999;
    }
  }
</style>

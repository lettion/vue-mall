<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="my-scroll-pullDown" v-if="pullDown">
      <my-loading :text="pullDownText" ref="pullDownLoading" inline/>
    </div>
    <swiper-slide>
      <slot>
      </slot>
    </swiper-slide>
    <div class="my-scroll-pull-up" v-if="pullUp">
      <my-loading :text="pullUpText" inline ref="pullUpLoading"/>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from './config'
import MyLoading from 'base/loading'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    MyLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    },
    res: {
      type: [Array, Object]
    }
  },
  watch: {
    res () {
      this.update()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.pulling = false
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_UP_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical',
        slidesPerView: 'auto', // 设置可以看到slide的数目，这里设置成了自适应
        freeMode: true, // 自由模式，可以任意滚动，
        setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true
        },
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd
        }
      }
    },
    scrollToTop (speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
    },
    // 更新swiper
    update () {
      this.$nextTick(() => {
        this.$refs.swiper && this.$refs.swiper.swiper.update()
      })
    },
    scrollEnd () {
      const swiper = this.$refs.swiper.swiper
      this.$emit('scroll-end', swiper.translate, swiper, this.pulling)
    },
    scroll () {
      const swiper = this.$refs.swiper.swiper
      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper)
      if (this.pulling) { // 判断是否正在下拉，如果不是直接返回
        return
      }
      if (swiper.translate > 0) { // 下拉
        if (!this.pullDown) {
          return
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) { // 上拉
        if (!this.pullUp) {
          return
        }

        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'))

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
        }
      }
    },
    touchEnd () {
      if (this.pulling) {
        return
      }
      const swiper = this.$refs.swiper.swiper
      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return
        }
        this.pulling = true
        swiper.allowTouchMove = false // 禁止触摸
        swiper.setTransition(swiper.params.speed)
        swiper.setTranslate(PULL_DOWN_HEIGHT)
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        this.$emit('pull-down', this.pullDownEnd)
      } else if (swiper.isEnd) { // 底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight

        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return
          }
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed)
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height))
          swiper.params.virtualTranslate = true // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING)
          this.$emit('pull-up', this.pullUpEnd)
        }
      }
    },
    pullDownEnd () {
      this.pulling = false
      const swiper = this.$refs.swiper.swiper
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)
      setTimeout(() => {
        this.$emit('pull-down-transition-end')
      }, swiper.params.speed)
    },
    pullUpEnd () {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
    }
  }
}
</script>

<style scoped lang="scss">
  .swiper-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .swiper-slide {
    height: auto;
  }
  .my-scroll-pull-up,
  .my-scroll-pullDown{
    position: absolute;
    left: 0;
    width: 100%;
  }
  .my-scroll-pullDown{
    bottom: 100%;
    height: 80px;
  }
  .my-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>

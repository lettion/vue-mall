<template>
  <swiper :options="swiperOption" :key="keyId">
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {swiper} from 'vue-awesome-swiper'
export default {
  name: 'MySlider',
  components: {
    swiper
  },
  props: {
    // 控制方向
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return ['horizontal', 'vertical'].indexOf(value) > -1
      }
    },
    // 控制轮播时长
    interval: {
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      keyId: Math.random()
    }
  },
  watch: {
    data (newData) {
      if (newData.length === 0) {
        return
      }
      this.swiperOption.loop = newData.length === 1 ? false : this.loop
      this.keyId = Math.random()
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 本来swiperOption是可以放在data(){}里面的，但是因为data里面的数据每次刷新都会重新渲染，为了避免浪费
    // 这些参数都是固定的，所有可以拿出来放到method
    init () {
      this.swiperOption = {
        watchOverflow: true, //  当只有一个图片的时候，就没有轮播效果
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval,
          disableOnInteraction: true // 如果和轮播图发生交互，则停止轮播
        } : false,
        slidersPerView: 1, // 容器同时显示几张图片
        loop: this.data.length <= 1 ? false : this.loop,
        pagination: {
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .swiper-container{
    width: 100%;
    height: 100%;
  }
</style>

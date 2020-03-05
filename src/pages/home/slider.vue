<template>
  <div class="slider-wrapper">
    <my-loading v-if="!sliders.length"></my-loading>
    <my-slide
      :data="sliders"
      :direction="direction"
      :interval="interval"
      :loop="loop"
      :pagination="pagination"
      v-else
    >
      <swiper-slide
        v-for="(item,index) of sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </my-slide>
  </div>
</template>

<script>
import MyLoading from 'base/loading'
import MySlide from 'base/slider'
import {getHomeSlider} from '../../api/home'
import {sliderOption} from './config'
import {swiperSlide} from 'vue-awesome-swiper'
export default {
  name: 'slider',
  components: {
    MySlide,
    swiperSlide,
    MyLoading
  },
  data () {
    return {
      direction: sliderOption.direction,
      loop: sliderOption.loop,
      interval: sliderOption.interval,
      pagination: sliderOption.pagination,
      sliders: []
    }
  },
  created () {
    this.getSlider()
  },
  methods: {
    // 这样设置的原因是与调用区分，在内部调用就用getSlider,外部调用就用 update
    update () {
      return this.getSlider()
    },
    getSlider () {
      return getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .slider-wrapper{
    height: 183px;
  }
  .slider-link{
    display: block;
  }
  .slider-link,
  .slider-img{
    width: 100%;
    height: 100%;
  }
</style>

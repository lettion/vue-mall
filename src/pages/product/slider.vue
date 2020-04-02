<template>
  <div class="slider-wrapper">
    {{$route.params.id}}
    {{recommends}}
  </div>
</template>

<script>
import MySlider from 'base/slider'
import MyLoading from 'base/loading'
import {swiperSlide} from 'vue-awesome-swiper'
import {mapState} from 'vuex'
export default {
  name: 'slider',
  data () {
    return {
      recommend: {}
    }
  },
  components: {
    MySlider,
    MyLoading,
    swiperSlide
  },
  computed: {
    ...mapState(['recommends'])
  }
}
</script>

<style scoped>

</style>

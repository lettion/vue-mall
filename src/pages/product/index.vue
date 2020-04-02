<template>
    <div class="product">
      <header class="g-header-container">
        <product-header></product-header>
      </header>
      <my-scroll>
        <product-slider></product-slider>
      </my-scroll>
    </div>
</template>

<script>
import productHeader from './header'
import ProductSlider from './slider'
import MyScroll from 'base/scroll'
export default {
  name: 'Product',
  components: {
    productHeader,
    ProductSlider,
    MyScroll
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .product {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>

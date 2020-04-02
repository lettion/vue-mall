<template>
  <div class="mine-navbar">
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="mine-navbar-title" v-if="title">
      <span class="mine-navbar-text" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'MyNavbar',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .mine-navbar{
    @include flex-between();
    position: relative;
    height: 50px;
    background-color: #fff;
    &-left{
      margin-left: 10px;
      // 这个选择器表示如果在&-left的兄弟或者后代找得到.mine-navbar-right就让它的样式设置成position: static;
      ~ .mine-navbar-right{
        position: static;
      }
    }
    &-center{
      margin: 0 10px;
      flex: 1;
      ~ .mine-navbar-right{
        position: static;
      }
    }
    &-right{
      position: absolute;
      right: 0;
      height: 100%;
      @include flex-center();
      margin-right: 10px;
    }
    &-title{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();
      text-align: center;
    }
    &-text{
      @include ellipsis();
      font-size: 18px;
      line-height: 1.5;
      width: 100%;
    }
  }
</style>

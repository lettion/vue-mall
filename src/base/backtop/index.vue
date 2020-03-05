<template>
  <transition name="my-backtop">
    <a href="javascript:;" class="mine-backtop"
       v-show="visible"
       @click="backToTop"
    >
      <i class="iconfont icon-backtop"></i>
    </a>
  </transition>
</template>

<script>
export default {
  name: 'index',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backToTop () {
      this.$emit('backtop')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/mixins.scss";
.mine-backtop {
  overflow: hidden;
  @include flex-center();
  width: 45px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;

  .iconfont {
    color: #fff;
    font-size: 38px;
  }
}
.my-backtop{
  &-enter-active,
  &-leave-active{
    transition: opacity 0.4s;
  }
  &-enter,
  &-leave-to{
    opacity: 0;
  }
}
</style>

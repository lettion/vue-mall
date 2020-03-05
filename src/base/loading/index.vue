<template>
  <div class="mine-loading" :class="{'mine-loading-inline': inline}">
    <span class="mine-loading-img" v-if="indicator==='on'">
      <slot><img src="./loading.gif" alt=""></slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    indicator: {
      type: String,
      default: 'on',
      validator (value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    text: {
      type: String,
      default: '加载中...'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loadingText: this.text
    }
  },
  watch: {
    text (text) {
      this.loadingText = text
    }
  },
  methods: {
    setText (text) {
      this.loadingText = text
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/mixins.scss";
  .mine-loading{
    width: 100%;
    height: 100%;
    overflow: hidden;
    @include flex-center(column);
    &.mine-loading-inline{
      flex-direction: row;
      .mine-loading-img ~ .mine-loading-text{
        margin-top: 0;
        margin-left: 6px;
      }
    }
  }
  .mine-loading-img ~ .mine-loading-text{
    margin-top: 6px;
  }

</style>

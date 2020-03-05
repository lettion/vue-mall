<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) of navs" :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" alt="" class="nav-pic">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {navItems} from './config'

export default {
  name: 'HomeNav',
  created () {
    this.navs = navItems
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/mixins.scss";
.nav{
  width: 100%;
  background: #fff;
  padding-top: 15px;
  &-list{
    display: flex;
    flex-wrap: wrap;
  }
  &-item{
    width: 20%;
    margin-bottom: 15px;
  }
  &-link{
    @include flex-center(column);
  }
  &-pic{
    width: 60%;
    margin-bottom: 8px;
  }
}
</style>

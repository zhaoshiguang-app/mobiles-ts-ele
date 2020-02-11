<template>
  <div>
    <header>
      <router-link tag="span" to="/">ele.me</router-link>
      <router-link to="/about">登录 | 注册</router-link>
    </header>
    <nav>
      <div class="city_tip">
        <span cl>当前定位城市</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <van-cell value is-link :to="'/city/'+cityId">
        <template slot="title">
          <span class="custom-title">{{city}}</span>
        </template>
      </van-cell>
    </nav>
    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear clearfix">
        <router-link
          tag="li"
          v-for="item in hotCityList"
          :to="'/city/' + item.id"
          :key="item.id"
        >{{item.name}}</router-link>
      </ul>
    </section>
    <van-index-bar :sticky-offset-top="46" :index-list="groupCityKey">
      <template v-for="(val,key) in sortGroupCityList">
        <van-index-anchor :key="`${key}_`" :index="key">{{key}}</van-index-anchor>
        <van-cell class="group_city" :key="`${key}_1`">
          <ul class="groupcity_name_container citylistul clearfix clear">
            <router-link
              class="ellipsis"
              v-for="item in val"
              :key="`${item.id}`"
              :to="'/city/'+item.id"
              tag="li"
            >{{item.name}}</router-link>
          </ul>
        </van-cell>
      </template>
    </van-index-bar>
    <van-icon v-show="btnFlag" class="top" name="upgrade" @click="backTop" size="1rem" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { cityGuess, hotCity, groupCity } from '@/api/getData';
@Component({
  name: 'home',
})
export default class City extends Vue {
  public city: string = '';  // 当前城市
  public cityId: number = 0; // 城市id
  public hotCityList = []; // 热门城市列表
  public groupCityList = []; // 所有城市列表
  public groupCityKey: string[] = []; // 各个城市所在的首字母
  public scrollTop: number = 0; // 回顶部
  public btnFlag: boolean = false; // 回顶部按钮是否显示

  // 计算属性 // 城市按照A-Z排序
  get sortGroupCityList() {
    const newkey = Object.keys(this.groupCityList).sort();
    const newObj = {};
    for (let i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = this.groupCityList[newkey[i]];
    }
    return newObj;
  }

  // 方法
  public backTop() {
    const that = this;
    const timer = setInterval(() => {
      const ispeed = Math.floor(-that.scrollTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop =
        that.scrollTop + ispeed;
      if (that.scrollTop === 0) {
        clearInterval(timer);
      }
    }, 16);
  }
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  public scrollToTop() {
    const that = this;
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    that.scrollTop = scrollTop;
    if (that.scrollTop > 100) {
      that.btnFlag = true;
    } else {
      that.btnFlag = false;
    }
  }

  public mounted() {
    /* 获取当前城市定位 */
    cityGuess('guess').then((res) => {
      this.city = res.data.name;
      this.cityId = res.data.id;
    });
    /* 获取热门城市 */
    hotCity('hot').then((res) => {
      this.hotCityList = res.data;
    });
    groupCity('group').then((res) => {
      this.groupCityList = res.data;
      this.groupCityKey = Object.keys(res.data).sort();
    });
    window.addEventListener('scroll', this.scrollToTop);
  }

  public destroyed() {
    window.removeEventListener('scroll', this.scrollToTop);
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/mixin/mixin.scss";
header {
  background-color: #3190e8;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45.7px;
  span {
    left: 0.4rem;
  }
  a {
    right: 0.4rem;
  }
}
header span,
header a {
  font-weight: 400;
  font-size: 0.5rem;
  color: #fff;
  height: 0.7rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
nav {
  padding-top: 45.7px;
  margin-bottom: 10px;
  .city_tip {
    padding: 0 0.45rem;
    display: flex;
    justify-content: space-between;
    line-height: 1rem;
    border-bottom: 1px solid #e4e4e4;
  }
  span:first-of-type {
    font-size: 14px;
  }
  span:nth-of-type(2) {
    font-size: 12px;
    font-weight: bold;
    color: #9f9f9f;
  }
  .custom-title {
    color: #3190e8;
  }
}

/* 热门城市 */
#hot_city_container {
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.city_title {
  color: #666;
  font-weight: 400;
  text-indent: 0.45rem;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc;
  @include font(0.2rem, 1rem, "Helvetica Neue");
}
.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 0.025rem solid $bc;
    border-right: 0.025rem solid $bc;
    @include wh(25%, 1rem);
    @include font(14px, 1rem);
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}
.group_city {
  padding: 0 !important;
}
</style>
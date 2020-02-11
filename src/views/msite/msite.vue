<template>
  <div class='city_content'>
    <header>
      <nav>
        <router-link to="">
          <van-icon name="search" size="22" />
        </router-link>
          <router-link to="/about">登录 | 注册</router-link>
      </nav>
      <router-link tag='span' to='/' class="city_name">{{msiteTitle}}</router-link>
    </header>
    <button @click='aa'>123132412412</button>
    <aa :list=list></aa>
  </div>
</template>
<script lang='ts'>
import {cityGuess, msiteAddress} from '@/api/getData'
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation} from 'vuex-class'
import aa from './aa.vue'
@Component({
  components: {
    aa,
  },
})
export default class Msite extends Vue {
  @Mutation('SAVE_GEOHASH') public saveGeohash;
  public msiteTitle = '请选择地址...';
  public geohash: any = '';  // 地理位置
  public  list = [1, 2]

  public beforeMount() {
    if (this.$route.query.geohash) {
      this.geohash = this.$route.query.geohash
    } else {
         cityGuess('guess')
          .then((res) => {
              this.geohash = res.data.latitude + ',' + res.data.longitude;
          })
      }
      // 保存 geohash 到 vuex
    this.saveGeohash(this.geohash)
    // 获取位置信息
    msiteAddress(this.geohash)
    .then((res) => {
      this.msiteTitle = res.data.name
      console.log(res)
    })
  }

  public aa() {
    this.list.push(3)
  }
}
</script>
<style lang='scss' scoped>
  @import 'src/assets/mixin/mixin.scss';
  .city_content{
  padding-top: 56px;
}
header {
  background-color: #3190e8;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45.7px;
  padding: 0 10px;
  color: $fc;
  a{
    color:$fc
  }
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.city_name{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  font-size: 20px;
  width:50%;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>
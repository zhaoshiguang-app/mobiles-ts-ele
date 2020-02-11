<template>
  <div class='city_content'>
    <header>
      <nav>
        <router-link to='/'><van-icon name="arrow-left" size="25" /></router-link>
        <router-link to='/'>选择城市</router-link>
      </nav>
      <section class='city_name'>{{cityName}}</section>
    </header>
    <div class='city_form'>
      <van-cell-group >
        <van-field v-model="value" placeholder="输入学校、商务楼、地址" />
      </van-cell-group>
      <van-button  color="#3190e8" block class='city_btn' @click='submit'>提交</van-button>
    </div>
    <div class='pois_search_history'>
      <h2 v-show='searchHistory'>搜索历史</h2>
      <ul 
      v-for='item in placeList'
      :key='item.id'>
        <pois-item 
        @on-enter='onEnter'
        :item='item'
      ></pois-item>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {currentCity, searchPlace} from '@/api/getData'
import { Component, Vue } from 'vue-property-decorator';
import PoisItem from './components/pois-item';
@Component({
  name: 'city',
  components: {
      PoisItem,
  },
})

export default class City extends Vue {
  public cityName: string = ''; // 城市name
  public cityId: string = ''; // 城市 id
  public value: string = ''; // 用户输入的地址
  public placeList: object[] = []; // 用户输入的地址
  public searchHistory: boolean = true; // 用户输入的地址

   /**
    * @description 发送信息
    */
  public submit() {
      // 输入值不为空时才发送信息
      if (this.value) {
           searchPlace(this.cityId, this.value)
           .then((res) => {
             this.placeList = res.data
             this.searchHistory = false
           })
      }
  }
  /**
   * @description 选中地址进入 msite 商铺列表页面
   */
  public onEnter(item) {
    this.$router.push({name: 'Msite', query: {geohash: item.geohash} })
  }


  public mounted() {
    this.cityId = this.$route.params.cityId
    currentCity(this.cityId)
    .then((res) => {
      this.cityName = res.data.name
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/mixin/mixin.scss";
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
}
.city_form{
  background:$fc;
  padding:10px 20px ;
}
.city_btn{
  margin-top: 10px;
}
.pois_search_history{
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    font: 14px/.8rem Microsoft YaHei;
    h2{
      padding-left:12px;
    }
}


</style>
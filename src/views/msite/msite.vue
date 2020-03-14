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
    <div>
      <div v-for=' (item,i) in list' :key='i' style='border-bottom:1px solid #e3e3e3'>
          <p>{{item.name}}</p>
          <p>{{item.site}}</p>
          <p>
            <van-button size='small' @click='sellView(item)' plain type="default">销售订单</van-button>
            <van-button size='small' plain type="primary">车销单</van-button>
            <van-button size='small' plain type="info">退货单</van-button>
          </p>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import {cityGuess, msiteAddress} from '@/api/getData'
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation} from 'vuex-class'
@Component({
  components: {
  },
})
export default class Msite extends Vue {
  @Mutation('SAVE_GEOHASH') public saveGeohash;
  @Mutation('SAVE_ORDER') public handelOrder; //罗根
  public msiteTitle = '请选择地址...';
  public geohash: any = '';  // 地理位置
  public list =[
    {id:1,name:'丽英超市',site:'南京路一号'},
    {id:2,name:'龙铺超市',site:'青岛路一号'},
    {id:3,name:'焕欢超市',site:'上海路一号'},
    ]

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
  // 罗根
  public sellView(item) {
      this.handelOrder(item)
      this.$router.push({name:'Test',query:{id:item.id}})
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
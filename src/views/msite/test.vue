<template>
    <div>
     <van-button size='small' @click='add'  plain type="default">添加销售订单</van-button>
     <ul>
         <li v-for ="(item,i) in filterList"  :key ='i'>
             {{item}}
         </li>
     </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation} from 'vuex-class'
@Component({})
export default class Test extends Vue {
  @Mutation('SAVE_ORDER_LIST') public saveOrderList;
  @State('orderList') public orderlist;
    public add() {
        let obj = {id: this.$route.query.id,name:'那个超市就不说了'}
        this.saveOrderList(obj)
    }
    // 罗根
    get filterList(){
        return  this.orderlist.filter(item=>item.id == this.$route.query.id)
    }
}
</script>
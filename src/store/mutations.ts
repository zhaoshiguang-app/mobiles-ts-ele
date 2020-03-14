export default{
  // 保存geohash
  SAVE_GEOHASH(state, geohash) {
    state.geohash = geohash;
  },

  // 罗根 进商店临时保存对象
  SAVE_ORDER(state,order) {
  let bol =state.orderList.findIndex(item=> item.id  == order.id)
  if(bol == -1) state.orderList.push({id:order.id,list:[]})
  },
  // 罗根
  SAVE_ORDER_LIST(state,list){
      state.orderList.forEach(item=>{
          if(item.id == list.id){
            item.list.push(list)
          } 
      })
  }
}

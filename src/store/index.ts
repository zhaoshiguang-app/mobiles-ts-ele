import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);

const state = {
  geohash: '39.90783,116.55921', // 地址geohash
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
});

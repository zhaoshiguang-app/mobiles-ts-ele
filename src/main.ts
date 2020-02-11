import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'Vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import './assets/rest.css'
Vue.use(Vant);

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

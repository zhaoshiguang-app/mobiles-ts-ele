<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Test from '@/components/test.tsx';

@Component({
  components: {
    HelloWorld,
    Test,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
#app{
  width:100%;
  height:100%;
  font-size: 14px;
}
</style>

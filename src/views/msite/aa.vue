<template>
    <ul>
      <li v-for='item in list'>{{item}}</li>
    </ul>
</template>
<script>
  export default {
    name: '',
    props: [ 'list'],
  }
</script>

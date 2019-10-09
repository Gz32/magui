<template>
  <div class="grid-container">
    <div class="grid-item" v-for="(item,index) in 9" :key="index">
      <flv-player></flv-player>
    </div>
  </div>
</template>

<script>
  import flvPlayer from './flvplayer'

  export default {
    name: '',
    components: {
      flvPlayer
    },
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .grid-container{
    position: relative;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
  .grid-item{
    width: 33%;
    height: 33%;
    border: 1px solid #fff;
  }
</style>


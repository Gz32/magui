<template>
  <div class="gridbar-container">
    <a class="grid-button" @click="layout('1x1')">
      <img src="../../icons/video/grid-1x1.png"/>
    </a>
    <a class="grid-button" @click="layout('2x2')">
      <img src="../../icons/video/grid-2x2.png"/>
    </a>
    <a class="grid-button" @click="layout('2x3')">
      <img src="../../icons/video/grid-2x3.png"/>
    </a>
    <a class="grid-button" @click="layout('2x4')">
      <img src="../../icons/video/grid-2x4.png"/>
    </a>
    <a class="grid-button" @click="layout('3x3')">
      <img src="../../icons/video/grid-3x3.png"/>
    </a>
    <a class="grid-button" @click="layout('flv')">
      <img src="../../icons/video/flv.png">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'vGridbar',
    data () {
      return {
      }
    },
    methods: {
      layout(val) {
        this.$emit('selectGridEvent',val);
      }
    }
  }
</script>

<style scoped>
  .gridbar-container{
    display: -webkit-flex; /* Safari */
    display: flex;
  }
  .grid-button{
    display: inline-flex;
    margin: 5px 0px 0px 5px; /* 上右下左 */
  }
  .grid-button:hover{
    cursor: pointer;
  }
  .grid-button:active{
	  position: relative;
	  top: 1px;
  }
  .grid-button img{
    width: 40px;
    height: 40px;
  }
</style>

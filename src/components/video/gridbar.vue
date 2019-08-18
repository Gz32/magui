<template>
  <div class="gridbar-container">
    <a class="grid-button" @click="selectGrid">
        <img class="grid-button-img" src="../../icons/video/grid.png"/>
      </a>
      <a class="grid-button" @click="selectGrid2">
        <img class="grid-button-img" src="../../icons/video/grid2.png"/>
      </a>
  </div>
</template>

<script>
  export default {
    name: 'vGridbar',
    methods: {
      selectGrid() {
        this.$emit('selectGridEvent','1x1');
      },
      selectGrid2() {
        this.$emit('selectGridEvent','2x2');
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
  .grid-button:active{
	  position: relative;
	  top: 1px;
  }
  .grid-button-img{
    width: 40px;
    height: 40px;
  }
</style>

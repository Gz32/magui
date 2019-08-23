<template>
  <div class="zoompanel-container">
    <!--<a class='slice-one' @click="handleTop">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-two' @click="handleTopRight">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-three' @click="handleRight">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-four' @click="handleBottomRight">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-five' @click="handleBottom">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-six' @click="handleBottomLeft">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-seven' @click="handleLeft">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
    <a class='slice-eight' @click="handleTopLeft">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>-->
    <a v-for="(item,index) in classes" :key="index" 
       :class="['slice-' + item.cls]" 
       @click="handleZoom(item.type)">
      <img src="../../icons/video/zoom-rotate.png" />
    </a>
  </div>
</template>

<script>
  export default {
    name: 'vZoompanel', // 云台面板组件
    data() {
      return {
        classes: [
          {cls: 'one', type: 'lt'},
          {cls: 'two', type: 'tc'},
          {cls: 'three', type: 'tr'},
          {cls: 'four', type: 'rc'},
          {cls: 'five', type: 'rb'},
          {cls: 'six', type: 'bc'},
          {cls: 'seven', type: 'bl'},
          {cls: 'eight', type: 'lc'}
        ]
      }
    },
    methods: {
      handleZoom(val){
        this.$emit('zoomEvent', val);
      }
      /*
      handleTopLeft() {
        this.$emit('zoomEvent', 'lt'); // 左上
      },
      handleTop() {
        this.$emit('zoomEvent', 'tc'); // 上
      },
      handleTopRight() {
        this.$emit('zoomEvent', 'tr'); // 右上
      },
      handleRight() {
        this.$emit('zoomEvent', 'rc'); // 右
      },
      handleBottomRight() {
        this.$emit('zoomEvent', 'rb'); // 右下
      },
      handleBottom() {
        this.$emit('zoomEvent', 'bc'); // 下
      },
      handleBottomLeft() {
        this.$emit('zoomEvent', 'bl'); // 左下
      },
      handleLeft() {
        this.$emit('zoomEvent', 'lc'); // 左
      }*/
    }
  }
</script>

<style scoped>
  .zoompanel-container {
    position: relative;
	  margin: 10px auto;
    padding: 0px;
	  width: 180px;
    height: 180px;
	  list-style: none;
    overflow: hidden;
    background:url('../../icons/video/zoom-bg.png') no-repeat center center / 100% 100%;
  }
  .zoompanel-container a{
    overflow: hidden;
	  position: absolute;
	  top: 0;
    right: 0;
	  width: 50%;
    height: 50%;
	  transform-origin: 0% 100%;
  }
  .zoompanel-container a :hover{
    cursor: pointer;
  }
  .zoompanel-container a img{
    margin-top: 34px;
    margin-left: -2px;
  }

  .slice-one {
    transform: rotate(-22.5deg) skewY(-45deg);
  }
  .slice-one img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-two {
    transform: rotate(22.5deg) skewY(-45deg);
  }
  .slice-two img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-three {
    transform: rotate(67.5deg) skewY(-45deg);
  }
  .slice-three img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-four {
    transform: rotate(112.5deg) skewY(-45deg);
  }
  .slice-four img{
    transform: skewY(45deg) rotate(22.5deg);
  }
 
  .slice-five {
    transform: rotate(157.5deg) skewY(-45deg);
  }
  .slice-five img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-six {
    transform: rotate(202.5deg) skewY(-45deg); 
  }
  .slice-six img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-seven {
    transform: rotate(247.5deg) skewY(-45deg);
  }
  .slice-seven img{
    transform: skewY(45deg) rotate(22.5deg);
  }

  .slice-eight {
    transform: rotate(292.5deg) skewY(-45deg);
  }
  .slice-eight img{
    transform: skewY(45deg) rotate(22.5deg);
  }
</style>

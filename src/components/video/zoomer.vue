<template>
  <div class="zoomer-container">
    <div class="zoomer-rotate">        
    </div>
    <div class="zoomer-list">
      <div class="zoomer-zoom">
        <span>缩放</span>
        <a class="zoomer-zoom-button" @click="handleZoomIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a class="zoomer-zoom-button" @click="handleZoomOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-zoom">
        <span>聚焦</span>
        <a class="zoomer-zoom-button" @click="handleFocusIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a class="zoomer-zoom-button" @click="handleFocusOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-zoom">
        <span>光圈</span>
        <a class="zoomer-zoom-button" @click="handleApertureIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a class="zoomer-zoom-button" @click="handleApertureOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-step">
        <v-slider :minvalue="1" :maxValue="8" :step="1"></v-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import vSlider from './slider'

  export default {
    name: 'vZoomer',
    components: {
      vSlider
    },
    props: { 
    },
    data() {
      return {
      }
    },
    methods: {
      handleZoomIn() {          
      },
      handleZoomOut() {          
      },
      handleFocusIn() {          
      },
      handleFocusOut() {          
      },
      handleApertureIn() {          
      },
      handleApertureOut() {          
      }
    }
  }
</script>

<style scoped>
  .zoomer-container{
    position: relative;
  }
  .zoomer-list{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .zoomer-zoom{
    text-align: left;
  }
  .zoomer-zoom-button{
    line-height: 30px;    
  }
  .zoomer-zoom-button img{
    width: 27px;
    height: 27px;
  }
</style>
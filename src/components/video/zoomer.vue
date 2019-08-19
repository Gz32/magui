<template>
  <div class="zoomer-container">
    <div class="zoomer-panel">
      <v-zoompanel @zoomEvent="handleZoomEvent"></v-zoompanel>     
    </div>

    <div class="zoomer-list">
      <div class="zoomer-zoom">
        <span>缩放</span>
        <a @click="handleZoomIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a @click="handleZoomOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-zoom">
        <span>聚焦</span>
        <a @click="handleFocusIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a @click="handleFocusOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-zoom">
        <span>光圈</span>
        <a @click="handleApertureIn">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a @click="handleApertureOut">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>
      <div class="zoomer-step">
        <span>步长</span>
        <v-slider class="slider" 
                  :minvalue="1"
                  :maxValue="8" 
                  :step="1"></v-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import vZoompanel from './zoompanel'
  import vSlider from './slider'

  export default {
    name: 'vZoomer',
    components: {
      vZoompanel,
      vSlider
    },
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
      handleZoomEvent(type) {
        alert(type);
      },
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
    padding-left: 15px;
  }
  .zoomer-zoom{
    display: inline-flex;
  }
  .zoomer-zoom span{
    margin: 8px 5px 0px 5px;
  }
  .zoomer-zoom a{    
    margin: 5px 45px 0 5px; /* 上右下左 */
  }
  .zoomer-zoom a :hover{    
    cursor: pointer;
  }
  .zoomer-zoom a img{
    width: 27px;
    height: 27px;
  }

  .slider{
    width: 100px;
  }
  .zoomer-step{
    display: inline-flex;
    margin-top: 10px;
  }
  .zoomer-step span{
    margin: 0px 5px 0px 5px;
  }
  
</style>
<template>
  <div class="zoomer-container">
    <div class="zoomer-panel">
      <v-zoompanel @zoomEvent="handleZoomEvent"></v-zoompanel>     
    </div>

    <div class="zoomer-list">
      <!--<div class="zoomer-zoom">
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
      </div>-->

      <div class="zoomer-zoom" v-for="(item,index) in list" :key="index">
        <span>{{item.title}}</span>
        <a @click="handleZoomEvent(item.typeOut)">
          <img src="../../icons/video/zoom-minus.png" />
        </a>
        <a @click="handleZoomEvent(item.typeIn)">
          <img src="../../icons/video/zoom-plus.png" />
        </a>
      </div>

      <div class="zoomer-step">
        <span>步长</span>
        <v-slider showInput :min="1" :max="8" :step="1" :sliderValue="1"
                  @valueChanged="sliderValueChanged"></v-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import vZoompanel from './zoompanel'
  import vSlider from './slider'

  export default {
    name: 'vZoomer', // 云台控制组件
    components: {
      vZoompanel,
      vSlider
    },
    props: {
    },
    data() {
      return {
        stepLength: 1,
        list: [
          {title: '缩放', typeIn: 'in', typeOut: 'out'},
          {title: '聚焦', typeIn: 'fi', typeOut: 'fo'},
          {title: '光圈', typeIn: 'ai', typeOut: 'ao'}
        ]
      }
    },
    methods: {
      handleZoomEvent(val) {        
        this.$emit('zoomerEvent', val);
      },
      sliderValueChanged(val) {
        this.stepLength = val;  
      }
      /*
      handleZoomIn() {
        this.handleZoomEvent('in');  
      },
      handleZoomOut() {
        this.handleZoomEvent('out');    
      },
      handleFocusIn() {
        this.handleZoomEvent('fi');  
      },
      handleFocusOut() {
        this.handleZoomEvent('fo');
      },
      handleApertureIn() {
        this.handleZoomEvent('ai');
      },
      handleApertureOut() {
        this.handleZoomEvent('ao');
      }*/
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
    margin: 5px 40px 0 5px; /* 上右下左 */
  }
  .zoomer-zoom a :hover{    
    cursor: pointer;
  }
  .zoomer-zoom a img{
    width: 30px;
    height: 30px;
  }

  .zoomer-step{
    display: inline-flex;
    margin-top: 10px;
  }
  .zoomer-step span{
    margin: 4px 5px;
  }
  
</style>
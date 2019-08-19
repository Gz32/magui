<template>
  <div class="videobar-container" v-show="showControls">
    <div class="main-content">
      <a class="play-button" @click="handleRew">
        <img class="play-button-img" src="../../icons/video/video-rew.png"/>
      </a>
      <a class="play-button" @click="handlePrev">
        <img class="play-button-img" src="../../icons/video/video-prev.png"/>
      </a>
      <a class="play-button" @click="handlePlay">
        <div v-if="isPause">
          <img class="play-button-img play" src="../../icons/video/video-play.png"/>
        </div>
        <div v-else>
          <img class="play-button-img play" src="../../icons/video/video-pause.png"/>
        </div>
      </a>
      <a class="play-button" @click="handleNext">
        <img class="play-button-img" src="../../icons/video/video-next.png"/>
      </a>
      <a class="play-button" @click="handleFF">
        <img class="play-button-img" src="../../icons/video/video-ff.png"/>
      </a>
      <a class="play-button" @click="handleStop">
        <img class="play-button-img" src="../../icons/video/video-stop.png"/>
      </a>
    </div>
    
    <div class="volume-content">
      <a class="volume-button" @click="handleMut">
        <div v-if="isMut">
          <img class="volume-button-img" src="../../icons/video/video-mut.png"/>
        </div>
        <div v-else>
          <img class="volume-button-img" src="../../icons/video/video-voc.png"/>
        </div>
      </a>
      <div class="volume-slider">
        <range-slider class="slider" :min="minValue" :max="maxValue" step="1" v-model="sliderValue"></range-slider>
      </div>

      <a class="screen-button" @click="handleFullscreen">
        <div v-if="isFullscreen">
          <img class="screen-button-img" src="../../icons/video/video-fse.png" />
        </div>
        <div v-else>
          <img class="screen-button-img" src="../../icons/video/video-fs.png" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import RangeSlider from 'vue-range-slider'
  import '@/assets/css/vue-range-slider.css'
  
  export default {
    name: 'vPlaybar',
    components: {
      RangeSlider
    },
    props: { // 接收父组件传递过来的参数
      showControls: Boolean // 是否显示控件
    },
    data() {
      return {
        isMut: true,         // 是否静音
        isPause: false,      // 是否暂停 
        isFullscreen: false, // 是否全屏

        minValue: 0,
        maxValue: 99,
        sliderValue: 0
      }
    },
    methods: {
      // 播放/暂停
      handlePlay() {
        this.isPause = !this.isPause;
        if (this.isPause) {
          this.$emit('pauseEvent','');
        } else {
          this.$emit('playEvent','');
        }
      },
      // 停止
      handleStop() {
      },
      // 前一帧
      handlePrev() {
      },
      // 后一帧
      handleNext() {
      },
      // 快退
      handleRew(times) {
      },
      // 快进
      handleFF(times) {
      },
      // 静音
      handleMut() {
        this.isMut = !this.isMut;
        if (this.isMut) {
          this.sliderValue = this.minValue;
        } else {
          this.sliderValue = this.maxValue;
        }
      },
      // 全屏
      handleFullscreen() {
        this.isFullscreen = !this.isFullscreen; 
      }
    }
  }
</script>

<style scoped>
  .videobar-container{
    display: -webkit-flex; /* Safari */
    display: flex;
    width: 99%;
    justify-content: space-between;
  }
  .play-button{
    display: inline-flex;
    margin: 5px 0px 0px 5px; /* 上右下左 */
  }
  .play-button:active{
	  position: relative;
	  top: 1px;
  }

  .play-button-img{
    width: 40px;
    height: 40px;
  }
  .play-button-img .play{
    width: 42px;
    height: 42px;
  }

  .volume-content{
    display: inline-flex;
  }
  .volume-button{
    margin: 17px 0 0 0;
  }
  .volume-button-img{
    width: 24px;
    height: 20px;    
  }

  .volume-slider{
    margin: 15px 10px 0 0;
  }
 
  .screen-button:active{
	  position: relative;
	  top: 1px;
  }
  .screen-button-img{
    width: 30px;
    height: 30px;
    margin: 10px 0;
  }
</style>

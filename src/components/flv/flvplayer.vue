<template>
  <div class="flv-container">
    <video id="videoElement" class="flv-content" ref="flvPlayer" autoplay>您的浏览器不支持HTML5播放器</video>
  </div>
</template>

<script>
  import flvjs from 'flv.js'

  export default {
    name: 'flvPlayer',
    props: {
      src: {
        type: String,
        //default: 'http://192.168.1.176:80/live?port=1935&app=live&stream=FEA667A4-C541-4DCA-B4E5-1D3C7943AEB7'
        default: 'http://192.168.10.12:8084/live?port=1935&app=live&stream=9D1AB34D-0382-4FE4-BB06-2D245E7D582A'
      }
    },
    data() {
      return {
      }
    },
    mounted () {
      let flvSrc = this.src;
      console.log('flvSrc:', flvSrc);

      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var player = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            cors: true,
            hasAudio: false,
            hasVideo: true,
            enableStashBuffer: true,
            url: flvSrc
        });
        player.attachMediaElement(videoElement);
        player.load();
        player.play();
      }
    },
    methods: {
    },
    computed: {
      player() {
        return this.$refs.flvPlayer;
      }
    }
  }
</script>

<style scoped>
  .flv-container{
    position: relative;
    height: 100% !important;
    background: #000;
  }
  .flv-content{
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

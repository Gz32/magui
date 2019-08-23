<template>
  <div class="player-container">
    <video-player class="vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @ready="onPlayerReady"
                  @loadeddata="onLoadedData($event)"
                  @canplay="onCanplay($event)"
                  @canplaythrough="onCanplayThrough($event)"
                  @statechanged="onStateChanged($event)"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)">
     </video-player>
  </div>
</template>

<script>
  import videojs from 'video.js'
  //引入video样式
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import 'videojs-flash'
  import { videoPlayer } from 'vue-video-player'  

  import SWF_URL from 'videojs-swf/dist/video-js.swf'
  videojs.options.flash.swf = SWF_URL; // 设置flash路径

  export default {
    name: 'vPlayer', // 播放器组件 注意name不能重复, 否则可能引发 'RangeError: Maximum call stack size exceeded' 异常
    components: {
      videoPlayer
    },
    props: {  // 接收父组件传递过来的参数
      playState: String,   // 播放状态 play-播放 pause-暂停 stop-停止 ff-快进 rew-快退 next-下一帧 prev-上一帧
      volumeState: String, // 声音状态 mut-静音 vol-声音 plus-加大音量 minu-减小音量

      showControls: Boolean, // 是否显示自带控件
      aspectRatio: String,   // 宽高比    
      rtmpUrl: String,  // rtmp流
      videoUrl: String  // rtsp流      
    },
    data () {
      return {
        isPlaying: true, // 是否正在播放

        playerOptions: {
          live: true,
          autoplay: true, // 自动播放
          muted: false,   // 默认情况下将会消除任何音频
          loop: false,    // 是否视频一结束就重新开始
          language: 'zh-CN',
          preload: 'auto',     // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。
          aspectRatio: this.aspectRatio, // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true,         // 将按比例缩放以适应其容器。
          techOrder: ['flash', 'html5'], // 兼容顺序
          flash: {
            hls: { withCredentials: false },            
            swf: SWF_URL // 引入swf播放器
          },
          sources: [{
            type: 'rtmp/flv',
            src: this.rtmpUrl // 视频地址-改变它的值播放的视频会改变 
          },{
            type: 'video/mp4',
            src: this.videoUrl        
          }],
          notSupportedMessage: '此视频暂无法播放',
          controls: this.showControls, // 是否显示控件
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            currentTimeDisplay: true, // 当前时间
            volumeControl: true,      // 声音控制键
            playToggle: true,         // 暂停和播放键
            progressControl: true,  // 进度条
            fullscreenToggle: false // 全屏按钮
          }
        }
      }
    },
    beforeDestroy() {
      this.$refs.videoPlayer.player.dispose();
    },
    methods: {
      // listen event
      onPlayerReady(player) {
        if ((this.rtmpUrl === null || this.rtmpUrl === '' ) && 
            (this.videoUrl === null || this.videoUrl === '')) {
          return;
        }
        
        // console.log('this player is readied', player)
        //this.$refs.videoPlayer.player.width_ = 640;
      },
      onLoadedData(player) {
        const _this = this;
        player.on('loadedmetadata', function () {
          //加载到元数据后开始播放视频
          _this.isPlaying = true;
        });
      },
      onCanplay(player) {
        // console.log('player Canplay!', player)
      },
      //canplaythrough表示可是流畅播放了
      onCanplayThrough(player) {
        // console.log('player Canplaythrough!', player) 
      },
      // listen state event
      onStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)            
      },
      
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },

      //--截图
      clipImg(){
        var domdiv = this.$refs.videoPlayer;
        html2canvas(document.getElementById("vjs_video_3_Flash_api")).then(function(canvas) {
          document.body.appendChild(canvas);
          var dataUrl = canvas.toDataURL();
          console.log(dataUrl);
        });
      }
    },
    watch: {
      /* 更改视频源 */
      // rtmp
      rtmpUrl: function (val) {
        if (val !== null && val !== '') {
          this.$refs.videoPlayer.player.src(val);
        }
      },
      // video
      videoUrl: function (val) {
        if (val !== null && val !== '') {
          this.$refs.videoPlayer.player.src(val);
        }
      },
      /* 播放操作 */      
      // 改变播放状态
      playState: function(val) {
        if (val === null || val === '')
          return;
        
        switch (val) {
          case 'play': {
            if (!this.isPlaying) {
              this.$refs.videoPlayer.player.play();
              this.isPlaying = true;
            }
          }
          break;
          case 'pause': {
            if (this.isPlaying) {
              this.$refs.videoPlayer.player.pause();
              this.isPlaying = false;
            }
          } 
          break;
          default: break;
        }
      },
      volumeState: function(val) {      
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      }
    }
  }
</script>

<!--<style lang="scss">-->
<style scoped>
  .player-container{
    position: relative;    
    height: 100% !important;
    background: #000;   
  }
  
  .player-content{
    position: relative;
    /* 水平居中 */
    margin: 0 auto;
    /* 垂直居中 */
    top: 50%;       
    transform: translateY(-50%);
  }
  
  /* 播放器播放按钮样式 scoped属性下不起作用 */
  .video-js .vjs-big-play-button{
	  height: 2em;
	  width: 2em;
	  line-height: 2em;
	  border-radius: 1em;
    border: 0;
  }
  .vjs-custom-skin > .video-js .vjs-big-play-button{
	  margin-left: -1em;
  }
  .video-js .vjs-big-play-button:hover, .vjs-custom-skin .video-js:hover .vjs-big-play-button{
	  background-color: #0000FF;
	  transition: all 0.3s;
  }
</style>

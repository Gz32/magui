<template>
  <div class="video-container" :style="{width:videoWidth,height:videoHeight}">
    <div v-if="isPause">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer" 
                    :options="playerOptions"
                    @ready="onPlayerReady"
                    @play="onPlay($event)"
                    @pause="onPause($event)"
                    @loadeddata="onLoadedData($event)"
                    @waiting="onWaiting($event)"
                    @playing="onPlaying($event)"
                    @timeupdate="onTimeupdate($event)"
                    @canplay="onCanplay($event)"
                    @canplaythrough="onCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)">        
      </video-player>
    </div>
    <div v-else>
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    @ready="onPlayerReady">
      </video-player>
    </div>

    <div class="video-tip" v-show="showTip">
        <span class="video-tip-text">视频播放异常，请查看相机状态</span>
    </div>
    <div class="loading" v-if="showLoading"></div>
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
    name: 'videoBox',
    props: {
      playUrl: String,
      
      videoWidth: String,
      videoHeight: String,
      isPause: Boolean
    },
    data () {
      return {
          showTip: false,
          showLoading: false,  //显示加载中
          playerOptions: {
            live: true,
            autoplay: true, //自动播放
            muted: false,   // 默认情况下将会消除任何音频
            loop: false,    // 是否视频一结束就重新开始
            preload: 'auto',
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式
            fluid: true,         // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            LoadingSpinner: true,
            notSupportedMessage: '此视频暂无法播放，请查看是否安装flash',
            techOrder: ['flash', 'html5'], // 兼容顺序
            flash: {
              swf: SWF_URL
            },
            sources: [{
              type: 'rtmp/flv',
              src: sessionStorage.getItem('videoUrl')
            },{
              type: 'video/mp4',
              src: ''
            }],
            controls: false // 不显示控件
          }
      }
    },
    mounted () { 
      // 检测浏览器是否安装了flash播放器
    },
    components: {
        videoPlayer
    },
    methods: {
      onPlayerReady(player) {
        if (sessionStorage.getItem('videoUrl') == 'null'){
          this.showTip= true;
          return;
        } else {
          this.showTip= false;
        }

        this.$refs.videoPlayer.player.width_ = 640;
      },
      onPlay(event) {  //播放
      },
      onPause(event) { //暂停
      },
      onLoadedData(player) {
        const _this = this;
        player.on('loadedmetadata', function () {
          //加载到元数据后开始播放视频
          this.width = 640;
          this.height = 360;
          _this.showLoading = false;
        });
      },
      onrWaiting(player) {
      },
      onPlaying(player) {
      },
      onTimeupdate(player) {
      },
      onCanplay(player) {
      },

      //canplaythrough表示可是流畅播放了
      onCanplaythrough(player) {
        this.showLoading = true;
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
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
    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      }
    }
  }
</script>

<style scoped>
  .video-container{
    position: relative;
  }
  .video-tip{
    position: absolute;
    width: 640px;
    height: 360px;
    top:0;
    left: 0;
    text-align: center;
    line-height: 120px;
    color: #F56C6C;
    background-position: 50% 42%;
    z-index: 2;
  }
  .video-tip-text{
    position: absolute;
    top:263px;
    left: 200px;
  }
  .loading{
    width: 80px;
    height: 80px;    
    background-repeat: no-repeat;
    position: absolute;
    top:33%;
    left: 44%;
    animation: loadingRun 3s steps(1,end) infinite;
  }
</style>

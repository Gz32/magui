<template>
  <div class="video-container" :id="containerId" >
    <video oncontextmenu="return false;"
           class="video-content"
           preload poster="" src=""
           :muted="muted"
           :autoplay="autoplay"
           @click="handlePlay">
      Your browser doesn't support HTML5 video.
    </video>
    <div class="video-control" v-show="controls">
      <div class="video-control-play" :title="playTitle" @click="playPause">
        <i class="iconvideo " :class="playIconClass"></i>
      </div>
      <div class="video-control-progress-text">00:00:00</div>
      <div class="video-control-progress">
        <div class="video-control-progress-holder" @click="handleProgress"></div>
        <div class="video-control-progress-play"></div>
        <div class="video-control-progress-buffer"></div>
        <div class="video-control-progress-total"></div>
      </div>
      <div class="video-control-hint">
        <div class="video-control-hover-time">00:00:00</div>
      </div>
      <div class="video-control-volume">
        <div class="video-control-volume-icon" @click="handleVolumeIcon">
          <i class="iconvideo " :class="volumeIconClass"></i>
        </div>
        <span class="video-control-volume-box" @click="handleVolume"></span>
        <span class="video-control-volume-total"><span class="video-control-volume-volume"></span></span>
      </div>
      <div class="video-control-fullscreen" :title="fullScreenTitle" @click="handleFullScreen">
        <i class="iconvideo " :class="fullScreenIconClass"></i>
      </div>
      <div class="video-control-tools" title="截图" @click="handleSnapshot">
        <i class="iconvideo icon-snapshot2"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import flvjs from 'flv.js'
  import '@/assets/icon/flv/iconvideo.css'

  export default {
    name: "vPlayer", // FLV/MP4播放器(无外部控制)
    props: {
      // 播放器容器ID
      containerId: {
        type: String,
        default: 'videoContainer'
      },
      // div是否自适应video高度
      selfit: {
        type: Boolean,
        default: false
      },

      // 是否显示控件
      controls: {
        type: Boolean,
        default: false
      },
      // 是否有音频
      audio: {
        type: Boolean,
        default: false
      },
      // 是否直播(直播-自动播放)
      live: {
        type: Boolean,
        default: false
      },

      // 视频类型
      videoType: {
        type: String,
        default: 'mp4' // flv mp4
      },
      // 视频地址
      videoUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        /**** 播放控件变量 ****/
        // 播放控件
        videoContainer: null,
        video: null,
        videoControl: null,

        playIconClass: 'icon-play',
        playTitle: '播放',

        // 播放进度
        progressContainer: null,
        progressHolder: null,
        progressPlay: null,
        progressLine: null,
        progressLineTime: null,
        progressText: null,
        progressBuffer: null,

        playProgressInterval: 0,
        currentLineTime: '00:00:00',

        // 声音
        videoVolume: null,
        videoVolumeVolume: null,
        volumeHolder: null,

        videoVolumeCurr: 0,
        volumeIconClass: 'icon-volume',
        isVideoVolumeOn: true,
        // 全屏
        // Boolean that allows us to "remember" the current size of the video player.
        isVideoFullScreen: false,

        fullScreenIconClass: 'icon-fullscreen-line',
        fullScreenTitle: '全屏',

        /**** flv.js播放器变量 ****/
        player: null,
        // 播放器选项
        playerOptions: {
          type: this.videoType,
          url: this.videoUrl,
          isLive: this.live,
          cors: true, // 开启跨域访问
          enableStashBuffer: false
        },

        /**** 播放属性变量 ****/
        autoplay: this.live, // 是否自动播放(直播)
        muted: !this.audio,  // 是否静音
      }
    },
    watch: {
      // 音频(Boolean)
      audio(val) {
        this.muted = !val;
      },

      // 视频地址
      videoUrl(val) {
        this.playerOptions = {
          type: this.videoType,
          url: val,
          isLive: this.live,
          cors: true,
          enableStashBuffer: false
        };
        // 初始化FLV播放器
        this.initFlvPlayer();
      }
    },
    mounted() {
      // 初始化播放器
      this.initPlayer();

      // 初始化FLV播放器
      this.initFlvPlayer();
    },
    methods: {
      /**** 播放器控件事件处理函数 ****/
      /**
       * 处理播放事件
       */
      handlePlay() {
        if (!this.live) {
          this.playPause();
        }
      },

      /**
       * 处理进度条单击事件
       */
      handleProgress() {
        if (!this.live) {
          this.video.currentTime = this.currentLineTime;
          this.updatePlayProgress();

          this.video.play();
        }
      },

      /**
       * 处理声音单击事件
       * */
      handleVolume(e) {
        this.video.volume = e.offsetX / 100;
        this.videoVolumeVolume.style.width = this.video.volume * 100 + '%';
        this.isVideoVolumeOn = this.video.volume !== 0;

        this.volumnIcon(this.video.volume);
      },

      /**
       * 处理声音图标单击事件
       */
      handleVolumeIcon() {
        if (this.isVideoVolumeOn) {
          this.videoVolumeCurr = this.video.volume;
          this.video.volume = 0;
          this.videoVolumeVolume.style.width = this.video.volume * 100 + '%';

          this.volumnIcon(this.video.volume);
          this.isVideoVolumeOn = false;
        } else {
          this.video.volume = this.videoVolumeCurr;
          this.videoVolumeVolume.style.width = this.video.volume * 100 + '%';

          this.volumnIcon(this.videoVolumeCurr);
          this.isVideoVolumeOn = true;
        }
      },

      /**
       * 全屏单击事件
       */
      handleFullScreen() {
        if (this.isVideoFullScreen) {
          this.fullScreenOff();
        } else {
          this.fullScreenOn();
        }
      },

      /**
       * 截图事件
       */
      handleSnapshot() {
        // 获取图片
        let canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        // 获取图片
        let base64 = canvas.toDataURL('image/png');
        if (base64) {
          let filename = 'screen_' + new Date().getTime() + '.png';
          // 下载
          let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = base64;
          save_link.download = filename;

          let event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        }
      },

      /**** 播放器初始化函数 ****/
      /**
       * 初始化播放器
       */
      initPlayer() {
        this.videoContainer = document.getElementById(this.containerId);
        this.video = this.videoContainer.getElementsByTagName('video')[0];
        // 用class获取
        this.videoControl = this.videoContainer.getElementsByClassName('video-control')[0];

        this.progressText = this.videoControl.getElementsByClassName('video-control-progress-text')[0];
        this.progressContainer = this.videoControl.getElementsByClassName("video-control-progress")[0];
        this.progressHolder = this.progressContainer.getElementsByClassName("video-control-progress-holder")[0];
        this.progressPlay = this.progressContainer.getElementsByClassName("video-control-progress-play")[0];
        this.progressBuffer = this.progressContainer.getElementsByClassName('video-control-progress-buffer')[0];

        this.progressLine = this.videoControl.getElementsByClassName("video-control-hint")[0];
        this.progressLineTime = this.progressLine.getElementsByClassName("video-control-hover-time")[0];

        this.videoVolume = this.videoControl.getElementsByClassName("video-control-volume")[0];
        this.videoVolumeVolume = this.videoVolume.getElementsByClassName("video-control-volume-volume")[0];
        this.volumeHolder = this.videoVolume.getElementsByClassName("video-control-volume-box")[0];

        // Get rid of the default controls, because we'll use our own.
        this.video.removeAttribute('controls');
        // If container is self fit video
        if (this.selfit) {
          this.video.style.position = 'static';
        }
        if (this.audio) {
          this.video.muted = false;
        }

        // When meta data is ready, show the controls
        this.video.addEventListener('loadeddata', this.initializeControls, false);
        // 当浏览器正在下载指定的音频/视频时，会发生 progress 事件。
        this.video.addEventListener('progress',this.handleBufferedProgress, false);

        if (this.live) { // 直播
          this.progressBuffer.style.width = "100%";
          this.progressHolder.style.display = 'none';
          this.progressPlay.style.display = 'none';
        } else { // 点播
          // 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件
          let that = this;
          this.video.addEventListener('canplay', function() {
            if(that.video.readyState === 4) {
              that.progressBuffer.style.width = "100%";
            } else {
              let index = 1;
              let curWidth = Number(that.progressBuffer.style.width.replace('%',''));
              let bufferProgressInterval = 0;
              (function addWidth() {
                that.progressBuffer.style.width = curWidth + (index++) + "%";
                if(that.video.readyState === 4 || Number(that.progressBuffer.style.width.replace('%','')) >= 100) {
                  that.progressBuffer.style.width = "100%";
                  // 清除定时器
                  clearTimeout(bufferProgressInterval);
                } else {
                  bufferProgressInterval = setTimeout(addWidth, 100);
                }
              })(index);
            }
          }, false);
        }

        // 监听播放/暂停事件
        this.handleVideoPlay();
        // 进度条监听事件
        this.handleVideoScrubbing();
        // volume监听事件
        this.handleVideoVolume();
      },

      /**
       * 初始化控件
       */
      initializeControls() {
        // When all meta information has loaded, show controls
        console.log('all meta information has loaded, show controls');
        this.showHideControls();
      },
      showHideControls() {
        let that = this;
        // Shows and hides the video player.
        this.video.addEventListener('mouseover', function() {
          that.videoControl.style.opacity = 1;
        }, false);
        this.videoControl.addEventListener('mouseover', function() {
          that.videoControl.style.opacity = 1;
        }, false);

        this.video.addEventListener('mouseout', function() {
          that.videoControl.style.opacity = 0;
        }, false);
        this.videoControl.addEventListener('mouseout', function() {
          that.videoControl.style.opacity = 0;
        }, false);
      },

      /**
       * 视频缓冲进度
       */
      handleBufferedProgress() {
        console.log('video is downloading:', this.video.buffered);
        if (!this.live && this.video.buffered.length) {
          let bufferPercent = (this.video.buffered.end(0) / this.video.duration) * 100;
          this.progressBuffer.style.width = bufferPercent + '%';
        }
      },

      /**
       * 处理播放/暂停事件
       */
      handleVideoPlay() {
        let that = this;
        // When the play button is pressed, switch to the "Pause" symbol.
        this.video.addEventListener('play', function() {
          that.playTitle = '暂停';
          that.playIconClass = 'icon-pause';
          that.playingStatus = 'play';
          // Begin tracking video's progress.
          that.trackPlayProgress();
        }, false);
        // When the pause button is pressed, switch to the "Play" symbol.
        this.video.addEventListener('pause', function() {
          that.playTitle = '播放';
          that.playIconClass = 'icon-play';
          that.playingStatus = 'pause';
          // stop tracking video's progress.
          that.stopTrackingPlayProgress();
        }, false);

        // When the video has concluded, pause it.
        this.video.addEventListener('ended', function() {
          that.playTitle = '播放';
          that.playIconClass = 'icon-play';
          that.playingStatus = 'pause';

          that.currentTime = 0;
          that.video.pause();
        }, false);
      },

      /**
       * 播放/暂停
       * */
      playPause() {
        if (this.video.paused || this.video.ended ) {
          if (this.video.ended ) {
            this.video.currentTime = 0;
          }
          this.video.play();
        } else {
          this.video.pause();
        }
      },

      /**
       * 追踪播放进度
       * Every 50 milliseconds, update the play progress.
       */
      trackPlayProgress() {
        let that = this;
        (function progressTrack() {
          if (that.video.readyState === 4 && that.progressBuffer.style.width !== "100%") {
            that.progressBuffer.style.width = "100%";
          }
          // 更新播放进度
          that.updatePlayProgress();
          that.playProgressInterval = setTimeout(progressTrack, 100);
        })();
      },
      /**
       * 更新播放进度
       */
      updatePlayProgress() {
        this.progressPlay.style.width = ((this.video.currentTime / this.video.duration) * (this.progressHolder.offsetWidth)) + "px";
        this.progressText.innerHTML = this.formatTime(this.video.currentTime);
      },
      /**
       * 停止追踪播放进度
       * Video was stopped, so stop updating progress.
       */
      stopTrackingPlayProgress() {
        clearTimeout(this.playProgressInterval);
      },

      /**
       * 处理进度条事件
       */
      handleVideoScrubbing() {
        let that = this;
        this.progressHolder.addEventListener('mouseenter', function(){
          that.progressLine.style.display = 'block';
          document.onmousemove = function(e) {
            that.setPlayProgress(e.pageX);
          }
        }, false);

        this.progressHolder.addEventListener('mouseleave', function(e){
          that.progressLine.style.display = 'none';
          document.onmousemove = null;
        }, true);
      },
      setPlayProgress(clickX) {
        this.progressLine.style.left = clickX - this.progressLine.offsetWidth / 2 - this.videoControl.offsetLeft + 'px';

        let newPercent = (this.progressLine.offsetLeft - this.progressContainer.offsetLeft + this.progressLine.offsetWidth / 2) / this.progressContainer.offsetWidth;
        this.currentLineTime = this.video.duration * newPercent;
        this.progressLineTime.innerHTML = this.formatTime(this.currentLineTime);
      },

      /**
       * 处理声音事件
       */
      handleVideoVolume() {
        let that = this;
        this.video.volume = 0.3;
        this.videoVolumeVolume.style.width = '30%';

        this.volumeHolder.addEventListener("mousedown", function(e) {
          that.video.volume = e.offsetX / 100;
          that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';
          that.volumnIcon(that.video.volume);

          that.volumeHolder.onmousemove = function(e) {
            that.video.volume = e.offsetX / 100;
            that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';
            that.volumnIcon(that.video.volume);
          };

          document.onmouseup = function(e) {
            document.onmouseup = null;
            document.onmousemove = null;
            that.volumeHolder.onmousemove = null;
          }
        }, true);

        this.volumeHolder.addEventListener('mouseup', function(e){
          that.volumeHolder.onmousemove = null;
          that.volumeHolder.onmouseup = null;
        }, false);
      },

      /**
       * 声音图标
       * @param vol -音量
       */
      volumnIcon(vol) {
        this.volumeIconClass = vol === 0 ? 'icon-mute' : 'icon-volume';
      },

      /**
       * 全屏
       */
      fullScreenOn() {
        this.isVideoFullScreen = true;
        // 全屏(充满整个屏幕)
        if (this.videoContainer.requestFullScreen) {
          this.videoContainer.requestFullScreen();
        } else if (this.videoContainer.mozRequestFullScreen) {
          this.videoContainer.mozRequestFullScreen();
        } else if (this.videoContainer.webkitRequestFullScreen) {
          this.videoContainer.webkitRequestFullScreen();
        }

        // 设置div样式
        this.videoContainer.style.cssText = 'position: fixed; width:100%; height:100%;';
        this.videoControl.style.cssText = 'position: fixed;';

        this.fullScreenTitle = '退出';
        this.fullScreenIconClass = 'icon-fullscreen-exit-line';

        let that = this;
        window.onresize = function(){
          if (!that.checkFullscreen()){
            that.fullScreenOff(); // 退出全屏
          }
        };

        console.log('fullScreen');
      },

      /**
       * 退出全屏
       */
      fullScreenOff() {
        this.isVideoFullScreen = false;
        // 退出全屏
        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }

        // 还原div样式
        this.videoContainer.style.position = 'relative';
        this.videoControl.style.cssText = '';

        this.fullScreenTitle = '全屏';
        this.fullScreenIconClass = 'icon-fullscreen-line';

        console.log('exit fullScreen');
      },
      checkFullscreen() {
        let isFull =
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.fullscreenElement;
        //to fix : false || undefined == undefined
        if(isFull === undefined)
          isFull = false;

        return isFull;
      },

      /**
       * 格式化时间
       * @param val -时间(s)
       * @return String
       */
      formatTime(val){
        let hs = Math.floor(val / 3600);
        let ms = Math.floor(val % 3600 / 60);
        let ss = Math.floor(val % 60);

        function addZero(num){
          return num < 10 ? '0' + num : num;
        }

        return addZero(hs) + ':' + addZero(ms) + ':' + addZero(ss);
      },

      /**** FLV.js初始化函数 ****/
      /**
       * 初始化flvPlayer
       * */
      initFlvPlayer() {
        if (flvjs.isSupported()) {
          // 先销毁播放器
          this.destroyPlayer();
          // 创建播放器
          this.player = this.createPlayer();
          if (this.autoplay) {
            this.player.play();
          }
        }
      },

      /**
       * 创建播放器
       */
      createPlayer() {
        let element = this.video;
        // 直播，添加Tab页可见性改变事件监听, 解决浏览器tab页切换导致累计延时问题!!!
        if (this.live) {
          document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
              let buffered = element.buffered;
              if (buffered.length > 0) {
                let end = buffered.end(0);
                if (end - element.currentTime > 0.015) {
                  element.currentTime = end - 0.01;
                }
              }
            }
          });
        }

        // 创建播放器
        let flvPlayer = flvjs.createPlayer(this.playerOptions);
        flvPlayer.attachMediaElement(element);
        flvPlayer.load();

        return flvPlayer;
      },

      /**
       * 销毁播放器
       */
      destroyPlayer() {
        if (this.player) {
          this.player.pause();
          this.player.unload();
          this.player.detachMediaElement();

          this.player.destroy();
          this.player = null;
        }
      },

      /**** 外部调用函数 ****/
      /**
       * 截图(base64)
       * @return String
       */
      _snapshot() {
        // 获取图片
        let canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/png');
      }
    },
    beforeDestroy() {
      // 销毁
      this.destroyPlayer();
    }
  }
</script>

<style scoped>
  .video-container {
    position: relative;
    height: 100% !important;
    background: #000;
    overflow: hidden;
    z-index: 0;
  }
  .video-content {
    position: absolute; /* video强制适应div宽高 */
    height: 100%;
    width: 100%;
    background: #000;
  }

  .video-control {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    height: 38px;
    background-color: rgba(40, 44, 52, .8);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all .5s ease-in-out;
    opacity: 0;
    z-index: 1;
  }

  .video-control:after {
    content: " ";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both
  }

  .video-control-play {
    float: left;
    width: 30px;
    height: 30px;
    margin: 5px 15px 5px 10px;
    cursor: pointer
  }
  .video-control-progress-text {
    font-size: 14px;
    line-height: 40px;
    color: #fff;
    float: left;
  }
  .video-control-progress {
    position: absolute;
    left: 125px;
    right: 295px;
    top: 19px;
    padding: 0;
    width: auto;
    height: 4px;
    background-color: rgba(40, 44, 52, .5);
  }
  /* hover/click for mouse handle */
  .video-control-progress-holder {
    position: absolute;
    width: 100%;
    height: 40px;
    top: -19px;
    cursor: pointer;
    z-index: 6;
  }

  /* 当前播放进度 */
  .video-control-progress-play {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #00B3FF;
    z-index: 5;
  }
  .video-control-progress-play:after,
  .video-control-progress-play:before {
    content: " ";
    position: absolute;
    left: 0;
    top: -19px;
    width: 100%;
    height: 19px;
    background-color: rgba(0, 179, 255, .5);
    transition: all .5s ease-in-out;
    -webkit-transform: translateY(19px);
    transform: translateY(19px);
    opacity: 0;
  }
  .video-control-progress-play:after {
    top: 2px;
    -webkit-transform: translateY(-19px);
    transform: translateY(-19px);
  }

  /* 缓冲进度 */
  .video-control-progress-buffer {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .2);
    z-index: 4;
  }
  .video-control-progress-buffer:after,
  .video-control-progress-buffer:before {
    content: " ";
    position: absolute;
    left: 0;
    top: -19px;
    width: 100%;
    height: 19px;
    opacity: 0;
    background-color: hsla(0, 0%, 100%, .2);
    transition: all .5s ease-in-out;
    -webkit-transform: translateY(19px);
    transform: translateY(19px);
  }
  .video-control-progress-buffer:after {
    top: 0;
    -webkit-transform: translateY(-19px);
    transform: translateY(-19px);
  }

  .video-control-progress:hover>.video-control-progress-buffer:after,
  .video-control-progress:hover>.video-control-progress-buffer:before,
  .video-control-progress:hover>.video-control-progress-play:after,
  .video-control-progress:hover>.video-control-progress-play:before {
    opacity: 1;
    -webkit-transform: translate(0);
    transform: translate(0);
  }

  /* 进度条总长高度 */
  .video-control-progress-total {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .2);
    z-index: 4;
  }

  /* 鼠标移动到进度条上显示当前指针所在的进度和时间 */
  .video-control-hint {
    display: none;
    position: absolute;
    left: 0;
    bottom: 52px;
    font-size: 14px;
    color: #fff;
    background-color: rgba(40, 44, 52, .5);
  }
  .video-control-hint:before {
    content: " ";
    position: absolute;
    width: 2px;
    height: 40px;
    left: 50%;
    top: 100%;
    margin: 12px 0 0 -1px;
    background: #fff;
  }
  .video-control-hint:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(40, 44, 52, .5);
  }

  .video-control-hover-time {
    width: auto;
    line-height: 20px;
    text-align: center;
    padding: 0 8px;
  }

  /* 声音控制 */
  .video-control-volume{
    position: absolute;
    width: 100px;
    right: 150px;
    top: 18px;
    background: #fff;
  }
  .video-control-volume-icon{
    position:absolute;
    top: -13px;
    left: -35px;
    color: #00B3FF;
    cursor: pointer;
  }
  .video-control-volume-box {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: hsla(0, 0%, 100%, .2);
    cursor: pointer;
    z-index: 6;
  }
  .video-control-volume-total{
    position: absolute;
    width: 100%;
    height: 4px;
    background: #fff;
    border-radius:4px;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }
  .video-control-volume-volume {
    position: absolute;
    width: 0;
    height: 4px;
    background: #00B3FF;
  }

  .video-control-fullscreen {
    float: right;
    width: 30px;
    height: 30px;
    margin: 5px 10px;
    cursor: pointer;
  }

  .video-control-tools {
    float: right;
    margin-right: 5px;
    line-height: 40px;
    color: #fff;
    font-size: 24px;
  }
</style>

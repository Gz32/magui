<template>
  <div id="container" class="video-container">
    <video id="videoElement" class="video-content" muted preload
           :autoplay="autoplay">
      Your browser doesn't support HTML5 video.
    </video>
    <div id="control" class="video-control">
      <div id="play" class="video-control-play">
        <i class="iconfont icon-play"></i>
      </div>
      <div id="progressText" class="video-control-progress-text">00:00</div>
      <div id="progress" class="video-control-progress">
        <div id="progressBox" class="video-control-progress-click"></div>
        <div id="progressPlay" class="video-control-progress-play"></div>
        <div id="progressBuffer" class="video-control-progress-buffer"></div>
        <div id="progressTotal" class="video-control-progress-total"></div>
      </div>
      <div id="progressLine" class="video-control-hint">
        <div id="progressLineTime" class="video-control-hover-time">00:00</div>
      </div>
      <div id="volume" class="video-control-volume">
        <div class="video-control-volume-icon">
          <i class="iconfont icon-mute"></i>
        </div>
        <span class="video-control-volume-box"></span>
        <span class="video-control-volume-total"><span class="video-control-volume-volume"></span></span>
      </div>
      <div id="fullScreen" title="全屏" class="video-control-fullscreen">
        <i class="iconfont icon-fullscreen-line"></i>
      </div>
      <a href="javascript:void(0);" class="video-control-logo" target="_blank" style="color:#fff;font-size:24px;">
        <i class="iconfont icon-video"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import flvjs from 'flv.js'
  import '@/assets/icon/player/iconfont.css'

  export default {
    name: "videoPlayer",
    props: {
      // 是否自动播放
      autoplay: {
        type: Boolean,
        default: false
      },
      // 是否有音频
      audio: {
        type: Boolean,
        default: false
      },
      // 是否直播
      live: {
        type: Boolean,
        default: false
      }      
    },
    data () {
      return {
        videoContainer: null,
        video: null,

        controls: null, // 播放器控件
        playToggleButton: null, // 播放/暂停切换按钮
        playIcon: null,

        progressContainer: null,
        progressHolder: null,
        progressPlayBar: null,
        progressLine: null,
        progressLineTime: null,
        progressText: null,
        progressBuffer: null,

        videoVolume: null,
        videoVolumeVolume: null,
        videoVolumeIcon: null,
        volumeHolder: null,
        volumeIcon: null,
        videoVolumeCurr: 0.3,
        isVideoVolumeOn: false,

        fullScreenToggleButton: null,
        fullScreenIcon: null,
        // Boolean that allows us to "remember" the current size of the video player.
        isVideoFullScreen: false,

        playProgressInterval: 0,
        currentLineTime: '00:00',

        stopped: false,
        
        videoType: 'mp4',     
        //videoUrl: 'http://localhost:8080/video/fl4.mp4', // 视频地址
        videoUrl: 'http://192.168.137.176:80/linda.mp4',

        player: null,
        // 播放器选项
        playerOptions: {
          type: this.videoType,
          url: this.videoUrl,
          isLive: this.live,
          hasAudio: this.audio,
          hasVideo: true,
          cors: true, // 开启跨域访问
          enableStashBuffer: false
        },
      }
    },
    mounted() {
      // 初始化播放器
      this.initPlayer();

      if (flvjs.isSupported()) {
        // 先销毁播放器
        this._destroyPlayer();
        // 创建播放器
        this.player = this._createPlayer();
        if (this.autoplay) {
          this.player.play();
        }
      }
    },
    methods: {
      /**** 初始化播放器 ****/
      initPlayer() {
        this.videoContainer = document.getElementById('container');
        this.video = this.videoContainer.getElementsByTagName('video')[0];

        this.controls = document.getElementById('control');
        this.playToggleButton = document.getElementById('play');
        this.playIcon = this.playToggleButton.getElementsByClassName('iconfont')[0];

        this.progressContainer = document.getElementById("progress");
        this.progressHolder = document.getElementById("progressBox");
        this.progressPlayBar = document.getElementById("progressPlay");
        this.progressLine = document.getElementById("progressLine");
        this.progressLineTime = document.getElementById("progressLineTime");
        this.progressText = document.getElementById('progressText');
        this.progressBuffer = document.getElementById('progressBuffer');

        this.videoVolume = document.getElementById("volume");
        this.videoVolumeVolume = this.videoVolume.getElementsByClassName("video-control-volume-volume")[0];
        this.videoVolumeIcon = this.videoVolume.getElementsByClassName("video-control-volume-icon")[0];
        this.volumeHolder = this.videoVolume.getElementsByClassName("video-control-volume-box")[0];
        this.volumeIcon = this.videoVolumeIcon.getElementsByClassName('iconfont')[0];

        this.fullScreenToggleButton = document.getElementById("fullScreen");
        this.fullScreenIcon = this.fullScreenToggleButton.getElementsByClassName('iconfont')[0];

        this.video.src = '';//'http://localhost:8080/video/fl4.mp4';

        let that = this;
        // Get rid of the default controls, because we'll use our own.
        this.video.removeAttribute('controls');

        // When meta data is ready, show the controls
        this.video.addEventListener('loadeddata', this.initializeControls, false);
        // 当浏览器正在下载指定的音频/视频时，会发生 progress 事件。
        this.video.addEventListener('progress',this.videoBufferedProgress, false);

        // 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件
        this.video.addEventListener('canplay', function() {
          if(that.video.readyState === 4) {
            that.progressBuffer.style.width = "100%";
          } else {
            let curWidth = Number(that.progressBuffer.style.width.replace('%',''));
            let allbufferProgressInterval;
            (function addWidth() {
              that.progressBuffer.style.width = (curWidth) + (i++) + "%";
              if(Number(that.progressBuffer.style.width.replace('%','')) >= 100){
                that.progressBuffer.style.width = "100%";

                clearTimeout(allbufferProgressInterval);
              }else{
                allbufferProgressInterval = setTimeout(addWidth, 50);
              }
            })(i = 1);
          }
        }, false);

        // 监听播放/暂停事件
        this.handleVideoPlay();
        // 进度条监听事件
        this.handleVideoScrubbing();
        // volume监听事件
        this.handleVideoVolume();
        // 监听全屏事件
        this.fullScreenToggleButton.addEventListener("click", function () {
          that.isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
        }, true);
      },

      videoBufferedProgress() {
        console.log('video is downloading:', this.video.buffered);
        if(this.video.buffered.length){
          let bufferPercent = this.video.buffered.end(0) / this.video.duration * 100;
          this.progressBuffer.style.width = bufferPercent + '%';
        }
      },

      initializeControls() {
        // When all meta information has loaded, show controls
        console.log('all meta information has loaded, show controls');
        this.showHideControls();
      },
      showHideControls() {
        let that = this;
        // Shows and hides the video player.
        this.video.addEventListener('mouseover', function() {
          that.controls.style.opacity = 1;
        }, false);
        this.controls.addEventListener('mouseover', function() {
          that.controls.style.opacity = 1;
        }, false);

        this.video.addEventListener('mouseout', function() {
          that.controls.style.opacity = 0;
        }, false);
        this.controls.addEventListener('mouseout', function() {
          that.controls.style.opacity = 0;
        }, false);
      },

      /**
       * 处理播放/暂停事件
       */
      handleVideoPlay() {
        let that = this;
        // When the video or play button is clicked, play/pause the video.
        this.video.addEventListener('click', this.playPause, false);
        this.playToggleButton.addEventListener('click', this.playPause, false);

        // When the play button is pressed, switch to the "Pause" symbol.
        this.video.addEventListener('play', function() {
          that.playToggleButton.title = '暂停';

          that.removeClass(that.playIcon, 'icon-play');
          that.addClass(that.playIcon, 'icon-pause');
          // Begin tracking video's progress.
          that.trackPlayProgress();
        }, false);

        // When the pause button is pressed, switch to the "Play" symbol.
        this.video.addEventListener('pause', function() {
          that.playToggleButton.title = '播放';

          that.removeClass(that.playIcon, 'icon-pause');
          that.addClass(that.playIcon, 'icon-play');

          that.stopTrackingPlayProgress();
        }, false);

        // When the video has concluded, pause it.
        this.video.addEventListener('ended', function() {
          that.playIcon.className.replace('icon-pause', 'icon-play');

          that.currentTime = 0;
          that.video.pause();
        }, false);
      },

      playPause: function() {
        if (this.video.paused || this.video.ended ) {
          if (this.video.ended ) {
            this.video.currentTime = 0;
          }
          this.video.play();
        } else {
          this.video.pause();
        }
      },

      // Every 50 milliseconds, update the play progress.
      trackPlayProgress(){
        let that = this;
        (function progressTrack() {
          that.updatePlayProgress();
          that.playProgressInterval = setTimeout(progressTrack, 50);
        })();
      },
      updatePlayProgress : function(){
        this.progressPlayBar.style.width = ( (this.video.currentTime / this.video.duration) * (this.progressHolder.offsetWidth) ) + "px";
        this.progressText.innerHTML = this.formatTime(this.video.currentTime).time2;
      },
      // Video was stopped, so stop updating progress.
      stopTrackingPlayProgress : function(){
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
        },false);

        this.progressHolder.addEventListener('mouseleave', function(e){
          that.progressLine.style.display = 'none';
          document.onmousemove = null;
        },true);

        this.progressHolder.addEventListener('click', function(e){
          that.video.currentTime = that.currentLineTime;
          that.updatePlayProgress();
          that.video.play();
        });
      },
      setPlayProgress(clickX) {
        this.progressLine.style.left = clickX - this.progressLine.offsetWidth/2 - this.controls.offsetLeft + 'px';
        let newPercent = (this.progressLine.offsetLeft - this.progressContainer.offsetLeft + this.progressLine.offsetWidth/2) / this.progressContainer.offsetWidth;
        this.currentLineTime = this.video.duration * newPercent;
        this.progressLineTime.innerHTML = this.formatTime(this.currentLineTime).time2;
      },

      /**
       * 处理声音事件
       */
      handleVideoVolume() {
        let that = this;
        this.video.volume = 0;
        this.videoVolumeVolume.style.width = '0';

        this.volumeHolder.addEventListener("mousedown", function(e){
          that.video.volume = e.offsetX / 100;
          that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';
          //that.volumnIcon(that.video.volume);

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
        });

        this.volumeHolder.addEventListener('click', function(e){
          that.video.volume = e.offsetX / 100;
          that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';
          that.volumnIcon(that.video.volume);
        });

        this.videoVolumeIcon.addEventListener('click', function() {
          console.log(that.isVideoVolumeOn, that.videoVolumeCurr);
          if (that.isVideoVolumeOn) {
            that.videoVolumeCurr = that.video.volume;
            that.video.volume = 0;
            that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';

            that.volumnIcon(0);
            that.isVideoVolumeOn = false;
          } else {
            that.video.volume = that.videoVolumeCurr;
            that.videoVolumeVolume.style.width = that.video.volume * 100 + '%';

            that.volumnIcon(that.videoVolumeCurr);
            that.isVideoVolumeOn = true;
          }
        });
      },

      volumnIcon(vol) {
        if (vol === 0) {
          this.removeClass(this.volumeIcon, 'icon-volume');
          this.addClass(this.volumeIcon, 'icon-mute');
        } else {
          this.removeClass(this.volumeIcon, 'icon-mute');
          this.addClass(this.volumeIcon, 'icon-volume');
        }
      },

      fullScreenOn() {
        this.isVideoFullScreen = true;
        // Set new width according to window width
        //function fullScreen() {
          if (document.requestFullScreen) {
            document.requestFullScreen();
          } else if (document.webkitRequestFullScreen) {
            document.webkitRequestFullScreen();
          } else if (document.mozRequestFullScreen) {
            document.mozRequestFullScreen();
          }
        //}

        this.videoContainer.style.cssText = 'position: fixed; width:100%; height:100%';
        // Apply a classname to the video and controls, if the designer needs it...
        this.controls.style.cssText = 'position: fixed;';
        this.fullScreenToggleButton.title = '退出';

        this.removeClass(this.fullScreenIcon, 'icon-fullscreen-line');
        this.addClass(this.fullScreenIcon, 'icon-fullscreen-exit-line');

        console.log('full');
        // Listen for escape key. If pressed, close fullscreen.
        document.addEventListener('keydown', this.checkKeyCode, false);
      },

      fullScreenOff() {
        debugger;
        this.isVideoFullScreen = false;
        //function exitFullscreen() {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        //}

        this.videoContainer.style.position = 'static';
        this.fullScreenToggleButton.title = '全屏';

        this.removeClass(this.fullScreenIcon, 'icon-fullscreen-exit-line');
        this.addClass(this.fullScreenIcon, 'icon-fullscreen-line');

        console.log('unfull');
        this.controls.style.cssText = '';
      },
      // Determines if the escape key was pressed.
      checkKeyCode(e) {
        e = e || window.event;
        if ((e.keyCode || e.which) === 27)
          this.fullScreenOff();
      },

      formatTime(timeStr){
        timeStr = Math.floor(timeStr*1000);
        let timeObj = {};
        let time = new Date();
        if(typeof timeStr !== "undefined"){
          time = new Date(Number(timeStr));
        }

        function addZero(num){
          return num < 10 ? '0' + num : num;
        }

        let year=time.getFullYear();
        let month=addZero(time.getMonth()+1);
        let day=addZero(time.getDate());
        let week=time.getDay();
        let weekStr="日一二三四五六";
        let hour=addZero(time.getHours());
        let minute=addZero(time.getMinutes());
        let second=addZero(time.getSeconds());

        let standardTime=year+"年"+month+"月"+day+"日 星期"+weekStr.charAt(week)+" "+hour+":"+minute+":"+second;
        let fullDate = year+"-"+month+"-"+day;
        let date=month+"月"+day+"日";
        let HandHMS = hour+":"+minute+':'+second;
        let HandM = hour+":"+minute;
        let MandS = minute+':'+second;
        let originalTime = new Date(0);
        let difTime = (time - originalTime)/1000;

        timeObj.standardTime = standardTime;
        timeObj.fullDate = fullDate;
        timeObj.date = date;
        timeObj.time = HandM;
        timeObj.time1 = HandHMS;
        timeObj.time2 = MandS;
        timeObj.time3 = addZero(Math.floor(difTime-difTime%60)/60)+':'+addZero(difTime%60);

        return timeObj;
      },


      hasClass(elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length === 0)
          return false; // 当cls没有参数时，返回false

        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
      },
      addClass(elem, cls) {
        if (!this.hasClass(elem, cls)) {
          elem.className = elem.className === '' ? cls : elem.className + ' ' + cls;
        }
      },
      removeClass(elem, cls) {
        if (this.hasClass(elem, cls)) {
          let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
          while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
          }
          elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
      },

      /**** ****/
      /**
       * 创建播放器
       */
      _createPlayer() {
        let element = document.getElementById('videoElement');

        // 监听可见性改变事件, 解决浏览器tab页切换导致累计延时问题!!!
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

        // 创建播放器
        let flvPlayer = flvjs.createPlayer(this.playerOptions);
        flvPlayer.attachMediaElement(element);
        flvPlayer.load();

        return flvPlayer;
      },

      /**
       * 销毁播放器
       */
      _destroyPlayer() {
        if (this.player) {
          this.player.pause();
          this.player.unload();
          this.player.detachMediaElement();

          this.player.destroy();
          this.player = null;
        }
      },

      /**
       * 播放
       */
      play() {
        if (this.player) {
          if (this.stopped) {
            this.player = this._createPlayer();

            this.stopped = false;
          }

          this.player.play();
        }
      },

      /**
       * 暂停
       */
      pause() {
        if (this.player && !this.stopped) {
          this.player.pause();
        }
      },

      /**
       * 停止
       */
      stop() {
        // 销毁播放器
        this._destroyPlayer();

        this.stopped = true;
      },
    },
    beforeDestroy() {
      // 销毁
      this._destroyPlayer();
    }
  }
</script>

<style scoped>
  .video-container{
    position: relative;
    height: 100% !important;
    background: #000;
    overflow: hidden;
    font-size:0;
    z-index: 0;
  }
  .video-content{
    position: absolute;
    height: 100%;
    width: 100%;
    background: #000;
  }

  .video-control {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background-color: rgba(48, 40, 44, .7);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 100;
    transition: all .5s ease-in-out;
    opacity: 0.8;
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
    left: 105px;
    right: 295px;
    top: 19px;
    padding: 0;
    width: auto;
    height: 4px;
    background-color: rgba(48, 40, 44, .5)
  }
  /* hover/click for mouse handle */
  .video-control-progress-click {
    z-index: 6;
    position: absolute;
    width: 100%;
    height: 40px;
    top: -19px;
    cursor: pointer
  }

  /* 当前播放进度 */
  .video-control-progress-play {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #00B3FF
  }
  .video-control-progress-play:after,
  .video-control-progress-play:before {
    content: " ";
    position: absolute;
    left: 0;
    top: -19px;
    width: 100%;
    height: 19px;
    background-color: rgba(0,179,255,.5);
    opacity: 0;
    transition: all .5s ease-in-out;
    -webkit-transform: translateY(19px);
    transform: translateY(19px)
  }
  .video-control-progress-play:after {
    top: 2px;
    -webkit-transform: translateY(-19px);
    transform: translateY(-19px)
  }

  /* 缓冲进度 */
  .video-control-progress-buffer {
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .2);
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
    transform: translateY(19px)
  }
  .video-control-progress-buffer:after {
    top: 0;
    -webkit-transform: translateY(-19px);
    transform: translateY(-19px)
  }

  .video-control-progress:hover>.video-control-progress-buffer:after,
  .video-control-progress:hover>.video-control-progress-buffer:before,
  .video-control-progress:hover>.video-control-progress-play:after,
  .video-control-progress:hover>.video-control-progress-play:before {
    opacity: 1;
    -webkit-transform: translate(0);
    transform: translate(0)
  }

  /* 进度条总长高度 */
  .video-control-progress-total {
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .2);
  }

  /* 鼠标移动到进度条上显示当前指针所在的进度和时间 */
  .video-control-hint {
    display: none;
    position: absolute;
    left: 0;
    bottom: 52px;
    font-size: 14px;
    color: #fff;
    background-color: rgba(48,40,44,.5);
  }
  .video-control-hint:before {
    content: " ";
    position: absolute;
    left: 50%;
    top: 100%;
    margin: 12px 0 0 -1px;
    width: 2px;
    height: 40px;
    background: #fff
  }
  .video-control-hint:after {
    content: " ";
    position: absolute;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(48,40,44,.5)
  }

  .video-control-hover-time {
    padding: 0 8px;
    width: auto;
    line-height: 20px;
    text-align: center
  }

  /* 声音控制 */
  .video-control-volume{
    position: absolute;
    right: 150px;
    top: 18px;
    width: 100px;
    background: #fff;
  }
  .video-control-volume-icon{
    position:absolute;
    top: -13px;
    left: -35px;
    color: #00B3FF;
  }
  .video-control-volume-box {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: hsla(0, 0%, 100%, .2);
    z-index:6;
    cursor: pointer;
  }
  .video-control-volume-volume {
    position: absolute;
    height: 4px;
    background: #00B3FF;
    width: 0;
  }

  .video-control-fullscreen {
    float: right;
    width: 30px;
    height: 30px;
    margin: 5px 10px;
    cursor: pointer
  }

  .video-control-logo {    
    float: right;
    margin-right: 10px;
    line-height: 42px;
  }
</style>

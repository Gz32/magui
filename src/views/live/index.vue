<template>
  <div class="live-container">
    <!-- 视频目录树 -->
    <div class="live-left">
      <h4 class="live-title">
        <img src="../../icons/video/icon-category.png">
        <span>设备目录</span>
      </h4>
      <div class="live-left-tree">
        <v-tree :treeData="treeData"></v-tree>
      </div>

      <h4 class="live-title">
        <img src="../../icons/video/icon-task.png">
        <span>轮巡任务</span>
      </h4>
    </div>
    <!-- 视频显示控件 -->
    <div class="live-content">
      <div class="grid-item" v-if="gridNum==='1x1'">
        <!--<v-player ref="playerObj"-->
                <!--:aspectRatio="aspectRatio"-->
                <!--:videoUrl="videoUrl"-->
                <!--:rtmpUrl="rtmpUrl">-->
        <!--</v-player>-->
        <v-flvgrid></v-flvgrid>
      </div>
      <div class="grid-item" v-if="gridNum==='2x2'">
        <v-playergrid :videoList="this.videoList"></v-playergrid>
      </div>
      <div class="grid-item" v-if="gridNum==='2x3'">
        <v-gridplayer :layoutType="gridNum"></v-gridplayer>
      </div>
      <div class="grid-item" v-if="gridNum==='2x4'">
        <v-gridplayer :layoutType="gridNum"></v-gridplayer>
      </div>

      <div class="grid-item" v-if="gridNum==='3x3'">
        <!--<v-gridplayer :layoutType="gridNum"></v-gridplayer>-->
        <v-flvgrid></v-flvgrid>
      </div>
      <div class="grid-item" v-if="gridNum==='flv'">
        <v-flvplayer></v-flvplayer>
      </div>

      <div class="grid-control">
        <v-gridbar @selectGridEvent="handleSelectGrid"></v-gridbar>
      </div>
    </div>

    <div class="live-right">
      <h4 class="live-title">
        <img src="../../icons/video/icon-zoomer.png">
        <span>云台控制</span>
      </h4>
      <v-zoomer class="live-right-zoomer" ref="zoomer" @zoomerEvent="handleZoom"></v-zoomer>

      <h4 class="live-title">
        <img src="../../icons/video/icon-device.png">
        <span>设备控制</span>
      </h4>
    </div>
  </div>
</template>

<script>
import vTree from '@/components/video/videotree'
import vZoomer from '@/components/video/zoomer'
import vGridbar from '@/components/video/gridbar'
import vPlayer from '@/components/video/player'
import vPlayergrid from '@/components/video/playergrid2x2'
import vGridplayer from '@/components/video/gridplayer'
import vFlvplayer from '@/components/flv/flvplayer'
import vFlvgrid from '@/components/flv/flvgrid'

import api from '@/api/api'

export default {
  components: {
    vTree,
    vZoomer,
    vGridbar,
    vPlayer,
    vPlayergrid,
    vGridplayer,
    vFlvplayer,
    vFlvgrid
  },
  data() {
    return {
      gridNum: '1x1',
      aspectRatio: '16:9',
      videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      rtmpUrl: '', // 默认为空, 播放前会有一小段时间黑屏, 且必须再刷新一次才能播放

      treeData: [],

      videoList: [{
          guid: '92D0722D-D4C3-4FCD-8FDF-029342FE4E05',
          caption: '香港财经',
          rtmpUrl: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc',
        },{
          guid: '65D4C246-DB25-49E3-94CA-5FB6FABAA0FF',
          caption: '美国中文电视',
          rtmpUrl: 'rtmp://media3.sinovision.net:1935/live/livestream',
        },{
          guid: '12092F87-9B93-43C1-B597-1A1BCE076E12',
          caption: '湖南卫视',
          rtmpUrl: 'rtmp://58.200.131.2:1935/livetv/hunantv',
        },{
          guid: 'FEA667A4-C541-4DCA-B4E5-1D3C7943AEB7',
          caption: '公司大华球机',
          rtmpUrl: 'rtmp://192.168.1.176:1935/live/FEA667A4-C541-4DCA-B4E5-1D3C7943AEB7',
        }]
    }
  },
  mounted() {
    this.rtmpUrl = 'rtmp://192.168.1.176:1935/live/FEA667A4-C541-4DCA-B4E5-1D3C7943AEB7';
    //this.rtmpUrl = 'rtmp://202.69.69.180:443/webcast/bshdlive-pc';
    //this.rtmpUrl = 'rtmp://58.200.131.2:1935/livetv/hunantv';
  },
  created: function () {
    this.onLoad();
  },
  methods: {
    // 页面加载
    onLoad() {
      var _this = this;
      api.queryVideoTree().then((result) => {
        _this.treeData = result.data;
      }).catch((err) => {
      });
    },

    // 布局选择事件
    handleSelectGrid(val) {
      this.gridNum = val;
    },
    // 云台控制事件
    handleZoom(val) {
      let id = 'FEA667A4-C541-4DCA-B4E5-1D3C7943AEB7';
      let act = val;
      let step = this.$refs.zoomer.stepLength;
      //alert(val + ',step=' + step);

      api.zoomCamera(id, val, step).then((result) => {
        let ret = result.data;
      }).catch((err) => {
      });
    }
  }
}
</script>

<style scoped>
  .live-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .live-content{
    position: relative;
    width: 70%;
    height: 100%;
    border: 1px solid #dedede;
  }
  .grid-item{
    position: relative;
    height: 100%;
  }
  .grid-control{
    position: relative;
    width: 70%;
    height: 20%;
  }

  .live-title{
    display: flex;
    padding: 0 2px;
    margin: 0;
    height: 36px;
    line-height: 36px;
    border: 1px solid #dedede;
    background: linear-gradient(#ffffff,#f1f1f1);
    color: #000;
  }
  .live-title span{
    margin-left: 5px;
  }
  .live-title img{
    height: 32px;
    width: 32px;
    margin-top: 2px;
  }

  .live-left{
    position: relative;
    width: 15%;
    margin-right: 2px;
  }
  .live-left-tree{
    position: relative;
    height: 60%;
    border: 1px solid #dedede;
  }

  .live-right{
    position: relative;
    width: 14.6%;
    margin-left: 2px;
  }
  .live-right-zoomer{
    border-top: 1px solid #dedede;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
  }
</style>

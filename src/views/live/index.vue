<template>
  <div class="live-container">
    <!-- 视频目录树 -->
    <div class="live-left">
      <div class="live-left-tree">
        <v-tree :treeData="treeData"></v-tree>
      </div>
    </div>
    <!-- 视频显示控件 -->
    <div class="live-content">
      <div class="grid-1x1" v-if="gridNum==='1x1'">
        <v-player ref="playerObj"
                :aspectRatio="aspectRatio"
                :videoUrl="videoUrl"
                :rtmpUrl="rtmpUrl">
        </v-player>
      </div>
      <div class="grid-2x2" v-if="gridNum==='2x2'">
        <v-playergrid :videoList="this.videoList"></v-playergrid>
      </div>

      <div class="grid-control">
        <v-gridbar @selectGridEvent="handleSelectGrid"></v-gridbar>  
      </div>
    </div>
    <div class="live-right">
      <v-zoomer></v-zoomer>
    </div>
  </div>
</template>

<script>
import vTree from '@/components/video/videotree'
import vZoomer from '@/components/video/zoomer'
import vGridbar from '@/components/video/gridbar'
import vPlayer from '@/components/video/player'
import vPlayergrid from '@/components/video/playergrid2x2'

import api from '@/api/api'

export default {
  components: {
    vTree,
    vZoomer,
    vGridbar,
    vPlayer,
    vPlayergrid   
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
          rtmpUrl: 'rtmp://192.168.1.76:1935/live/8E8CD150-391C-453B-A485-A1B09D8D53B4',
        }]
    }
  },
  mounted() {
    this.rtmpUrl = 'rtmp://192.168.1.76:1935/live/8E8CD150-391C-453B-A485-A1B09D8D53B4';
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

    handleSelectGrid(val) {
      this.gridNum = val;
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
  }
  .grid-control{
    position: relative;
    width: 70%;
    height: 20%;
  }

  .live-left{
    position: relative;
    width: 15%;
    height: 100%;    
    margin-right: 2px;
  }
  .live-left-tree{
    position: relative;
    height: 60%;
  }

  .live-right{
    position: relative;
    width: 14%;
    height: 100%;
  }
</style>

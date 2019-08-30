<template>
  <div class="playback-container">
    <div class="playback-content">
      <div class="grid-1x1" v-if="gridNum==='1x1'">
        <v-player ref="playerObj"
                :aspectRatio="aspectRatio"
                :videoUrl="videoUrl"
                :playState="playState">
        </v-player>
      </div>
      <div class="grid-2x2" v-if="gridNum==='2x2'">
        <v-playergrid :aspectRatio="aspectRatio" 
                      :videoList="videoList" 
                      :playState="playState">          
        </v-playergrid>
      </div>

      <v-playbar :showControls="true" 
                 @playEvent="handlePlay" 
                 @pauseEvent="handlePause">
      </v-playbar>

      <div class="grid-control">
        <v-gridbar @selectGridEvent="handleSelectGrid"></v-gridbar>        
      </div>
    </div>
    <div class="playback-right">
      <button @click="dialogVisible=true">弹出框</button>
      <el-dialog title="表格示例" :visible.sync="dialogVisible">        
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import vPlaybar from '@/components/video/playbar'
  import vGridbar from '@/components/video/gridbar'
  import vPlayer from '@/components/video/player'
  import vPlayergrid from '@/components/video/playergrid2x2'
    
  export default {
    name: '',
    components: {
      vPlaybar,
      vGridbar,
      vPlayer,
      vPlayergrid
    },
    data() {
      return {
        dialogVisible: false,

        gridNum: '1x1',
        aspectRatio: '7:3',
        playState: 'play',
        videoUrl: 'http://192.168.1.76:8089/video/linda.mp4',

        videoList: [{
          guid: '92D0722D-D4C3-4FCD-8FDF-029342FE4E05',
          caption: 'linda',
          videoUrl: 'http://192.168.1.76:8089/video/linda.mp4',
        },{
          guid: '65D4C246-DB25-49E3-94CA-5FB6FABAA0FF',
          caption: 'big_buck_bunny',
          videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        },{
          guid: '12092F87-9B93-43C1-B597-1A1BCE076E12',
          caption: 'toy',
          videoUrl: 'http://192.168.1.76:8089/video/toy.mp4',
        },{
          guid: '4366EC3D-B7A6-4F42-BF64-82CDF547498B',
          caption: '复联4',
          videoUrl: 'http://192.168.1.76:8089/video/fl4.mp4',
        }],

        columnList: [
          {title: '机构编号', key: 'number', width: 85, textAlign: 'left'},
          {title: '机构名称',key: 'name',width: 292,textAlign: 'left',textLine: 2,selectText: true},
          {title: '类型',key: 'type',width: 180,textAlign: 'center'},
          {title: '状态',key: 'brand',width: 82,textAlign: 'center'}
        ],
        tableData: []
      }
    },    
    created: function() {
    },
    methods: {
      handleSelectGrid(val) {
        this.gridNum = val;
      },
      handlePlay() {
        this.playState = 'play';
      },
      handlePause() {
        this.playState = 'pause';
      }
    }
  }
</script>

<style scoped>
  .playback-container{
    width: 100%;    
    display: flex;
    flex-wrap: wrap;    
    justify-content: space-between;    
  }
  .playback-content{
    position: relative;
    width: 80%;
    height: 100%;
  }
  .grid-control{
    position: relative;
    width: 80%;
    height: 20%;
  }
</style>

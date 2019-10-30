<template>
  <div class="grid-container">
    <div class="grid-item" :class="currSelect==item.guid?'selected':''"
         v-for="(item,index) in videoList" :key="index" 
         @click="select(index)">
      <v-player ref="playerObj"
                :aspectRatio="aspectRatio"
                :playState="playState"
                :videoUrl="item.videoUrl"
                :rtmpUrl="item.rtmpUrl">
      </v-player>
    </div>
  </div>
</template>

<script>
  import vPlayer from './player'

  export default {
    name: 'vPlayergrid2x2', // 2x2播放组件 
    components: {
      vPlayer
    },
    props: {
      // 宽高比
      aspectRatio: {
        type: String,
        default: '16:9'
      },
      // 播放状态
      playState: {
        type: String,
        default: 'play'
      },

      // 视频列表
      videoList: {
        type: Array,
        // default: function () { return [] }
        default: () => []
      }
    },
    data() {
      return {
        currSelect: '',
      }
    },
    methods: {
      select(index) {
        this.currSelect = this.videoList[index].guid;
      }
    }
  }
</script>

<style scoped>
  .grid-container{
    position: relative;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
  .grid-item{
    width: 49.8%;
    height: 49.8%;
    background-color: #000;
    border: 1px solid #dedede;
  }
  .selected{
    border: 1px solid rgb(145, 14, 80);
  }
</style>

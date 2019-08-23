<template>
  <div class="playergrid2x2-container">
    <div class="playergrid2x2-item" :class="currSelect==item.guid?'selected':''"
         v-for="(item,index) in videoList" :key="index" 
         @click="select(index)">
      <v-player ref="playerObj"
                :showControls="false"
                :aspectRatio="aspectRatio"
                :playState="playState"
                :id="item.guid"
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
  .playergrid2x2-container{
    position: relative;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
  .playergrid2x2-item{
    width: 50%;
    height: 50%;
    background-color: #000;     
  }
  .selected{
    border: 1px solid rgb(145, 14, 80);
  }
</style>

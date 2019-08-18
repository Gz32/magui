<template>
  <div class="recorder4-container">
    <div class="recorder4-item" :class="currSelect==item.guid?'selected':''"
         v-for="(item,index) in videos" 
         :key="index" @click="select(index)">
      <v-player ref="playerObj"
                :id="item.guid"
                :aspectRatio="aspectRatio"
                :playState="playState"
                :videoUrl="item.url">
      </v-player>
    </div>
  </div>
</template>

<script>
  import vPlayer from './player'

  export default {
    name: 'vRecorder4',
    components: {
      vPlayer
    },
    props: {
      videos: {
        type: Array,
        // default: function () { return [] }
        default: () => []
      }
    },
    data() {
      return {
        aspectRatio: '2:1',
        playState: 'play',
        currSelect: '',        
      }
    },
    methods: {
      select(index) {
        this.currSelect = this.videos[index].guid;
      }
    }
  }
</script>

<style scoped>
  .recorder4-container{
    position: relative;
    height: 100%;        
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
  .recorder4-item{
    width: 49%;
    height: 49.6%;
    margin: 2px;    
    background-color: #000;
    border: 1px solid #282C34; 
  }
  .selected{
    border: 1px solid rgb(145, 14, 80);
  }
</style>

<template>
  <div class="recorder-container">
    <div class="recorder-content">
      <v-player ref="playerObj"
              :aspectRatio="aspectRatio"
              :videoUrl="videoUrl"
              :playState="playState">
      </v-player>
      <v-playbar :showControls="true" 
               @playEvent="handlePlay" 
               @pauseEvent="handlePause">
      </v-playbar>
    </div>
  </div>
</template>

<script>
  import vPlayer from './player'
  import vPlaybar from './playbar'

  export default {
    name: 'vRecorder',    
    components: {
      vPlayer,
      vPlaybar
    },
    props: {
      videoUrl: String
    },
    data() {
      return {
        aspectRatio: '7:3',
        playState: 'play'
      }
    },
    mounted() {
    },
    methods: {
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
  .recorder-container{
    position: relative;    
    display: -webkit-flex;
    display: flex;    
    flex-wrap: wrap;
  }
  .recorder-content{
    width: 100%;
  }
</style>
<template>
  <div class="playback-container">
    <div class="playback-content">
      <v-recorder></v-recorder>
    </div>    
  </div>
</template>

<script>
  import vRecorder from '@/components/player/recorder'
    
  export default {
    name: '',
    components: {
      vRecorder
    },
    data() {
      return {
      }
    },    
    created: function() {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .playback-container{
    position: relative;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;  
  }
  .playback-content{
    width: 75%;
    height: 80%;
  }
</style>
